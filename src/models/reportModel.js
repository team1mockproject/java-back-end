

const { mssql } = require('../db');

async function getRevenueReport(startDate, endDate) {
    try {
        const query = `
            SELECT 
                SUM(CAST(a.highestPrice AS DECIMAL(18, 2))) AS totalRevenue,
                asset.assetName,
                acc.fullname
            FROM 
                Auction a
                INNER JOIN Asset asset ON a.assetId = asset.assetId
                INNER JOIN Account acc ON a.accountId = acc.accountId
            WHERE 
                a.endDate BETWEEN @startDate AND @endDate
                AND a.auctionStatus = 'complete'
            GROUP BY
                asset.assetName, acc.fullname
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
