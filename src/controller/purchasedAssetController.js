

const PurchasedAsset = require('../models/purchasedAsset');

exports.searchPurchasedAsset = async (req, res) => {
    const userId = req.params.userId;
    const assetName = req.query.assetName || ''; // Get the value of assetName from query params
    const highestPrice = req.query.highestPrice || null; // Get the value of highestPrice from query params

 

    try {
        const purchasedAsset = await PurchasedAsset.searchPurchasedAsset(userId, assetName, highestPrice);
        res.json(purchasedAsset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

