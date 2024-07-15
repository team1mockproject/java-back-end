

const mssql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

// Database configuration
const sqlServerConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: false, // for Azure
        enableArithAbort: true
    }
};

// Function to connect to the database
async function connect() {
    try {
        await mssql.connect(sqlServerConfig);
        console.log('Connected to SQL Server');
    } catch (err) {
        console.error('Error connecting to SQL Server:', err);
        throw err; // Throw error to handle it in calling code
    }
}

// Export connect function
module.exports = {
    connect,
    mssql // Optionally export mssql for direct use in other modules
};
