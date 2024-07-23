// routes/index.js

const express = require('express');
const router = express.Router();
const purchasedAssetController = require('../controller/purchasedAssetController');
const reportController = require('../controller/reportController');

router.get('/users/:userId/purchased-asset', purchasedAssetController.searchPurchasedAsset);
router.get('/reports/revenue', reportController.getRevenueReport);

module.exports = router;
