const { mssql } = require('../db');

async function getRevenueReport(startDate, endDate) {
    try {
        const query = `
            SELECT 
                SUM(CAST(a.highest_price AS DECIMAL(18, 2)) - CAST(af.amount AS DECIMAL(18, 2))) AS totalRevenue,
                asset.asset_name,
                acc.fullname
            FROM 
                Auction a
                INNER JOIN Asset asset ON a.asset_id = asset.asset_id
                INNER JOIN Account acc ON a.winner_id = acc.account_id
                INNER JOIN AuctionFee af ON a.auction_id = af.auction_id
            WHERE 
                a.end_date BETWEEN @startDate AND @endDate
                AND a.auction_status = 'complete'
            GROUP BY
                asset.asset_name, acc.fullname
        `;

        const pool = await mssql.connect();
        const result = await pool.request()
            .input('startDate', mssql.Date, startDate)
            .input('endDate', mssql.Date, endDate)
            .query(query);

        return result.recordset; 
    } catch (err) {
        throw new Error(`Error generating revenue report: ${err.message}`);
    }
}

module.exports = {
    getRevenueReport
};
