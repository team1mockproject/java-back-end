// models/PurchasedProduct.js

const { mssql } = require('../db');

async function searchPurchasedAsset(userId, assetName, highestPrice) {
    try {
        // Input validation
       
        if (assetName && typeof assetName !== 'string') {
            return { error: "Invalid assetName format. It must be a string." };
        }
        if (highestPrice && isNaN(highestPrice)) {
            return { error: "Invalid highestPrice format. It must be a number." };
        }

        let query = `
            SELECT 
                a.asset_Id,
                ast.asset_name,
                a.highest_Price,
                ac.account_Id,
                ac.fullname
            FROM 
                Auction a
            JOIN
                Asset ast ON a.asset_Id = ast.asset_Id
            JOIN
                Account ac ON a.winner_id = ac.account_Id
            WHERE 
                ac.account_Id = @userId
        `;

        const pool = await mssql.connect();
        const request = pool.request()
            .input('userId', mssql.Int, userId);

        if (assetName) {
            query += ` AND ast.asset_name LIKE @asset_name`;
            request.input('asset_name', mssql.VarChar, `%${assetName}%`);
        }
        if (highestPrice) {
            query += ` AND a.highest_Price <= @highestPrice`;
            request.input('highestPrice', mssql.Decimal, highestPrice);
        }
    
        const result = await request.query(query);

        if (result.recordset.length === 0) {
            return { message: "No purchased assets found." };
        }

        return result.recordset;
    } catch (err) {
        throw new Error(`Error searching purchased products: ${err.message}`);
    }
}

module.exports = {
    searchPurchasedAsset
};
