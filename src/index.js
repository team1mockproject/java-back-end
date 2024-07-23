

const express = require('express');
const db = require('./db'); 
const dotenv = require('dotenv');
const purchasedAssetRoutes = require('./router');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
app.use('/api', purchasedAssetRoutes);
// Start the server after database connection
db.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Error starting server:', err);
    process.exit(1); // Exit the process if unable to start server
});
