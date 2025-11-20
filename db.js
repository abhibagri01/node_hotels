const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;


// Connect to MongoDB (no deprecated options)
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

// Define event listeners for db connection
db.on('connected', () => {
  console.log('✅ Connected to MongoDB server');
});

db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('⚠️ Disconnected from MongoDB server');
});

// Export the db connection
module.exports = db;
