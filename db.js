const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

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
