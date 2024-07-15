const Report = require('../models/reportModel');

exports.getRevenueReport = async (req, res) => {
    const { startDate, endDate } = req.query;

    // Check if startDate or endDate is invalid
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Please provide valid startDate and endDate.' });
    }

    try {
        const revenueReport = await Report.getRevenueReport(startDate, endDate);

        // Calculate total revenue
        const totalRevenue = revenueReport.reduce((acc, cur) => acc + cur.totalRevenue, 0);

        res.json({ 
            totalRevenue,
            revenueReport 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
