// models/PurchasedProduct.js

const { mssql } = require('../db');

async function searchPurchasedAsset(userId, assetName, highestPrice) {
    try {
        let query = `
            SELECT 
                a.assetId,
                ast.assetName,
                a.highestPrice,
                ac.accountId,
                ac.fullname
            FROM 
                Auction a
            JOIN
                Asset ast ON a.assetId = ast.assetId
            JOIN
                Account ac ON a.accountId = ac.accountId
            WHERE 
                ac.accountId = @userId
        `;

        if (assetName) {
            query += ` AND ast.assetName LIKE @assetName`;
        }
        if (highestPrice) {
            query += ` AND a.highestPrice <= @highestPrice`;
        }

        const pool = await mssql.connect();
        const request = pool.request()
            .input('userId', mssql.Int, userId);

        if (assetName) {
            request.input('assetName', mssql.VarChar, `%${assetName}%`);
        }
        if (highestPrice) {
            request.input('highestPrice', mssql.Decimal, highestPrice);
        }

        const result = await request.query(query);

        return result.recordset;
    } catch (err) {
        throw new Error(`Error searching purchased products: ${err.message}`);
    }
}

module.exports = {
    searchPurchasedAsset
};
