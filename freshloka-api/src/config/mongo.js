const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const mongoConnect = async () => {
    const mongoURI = process.env.MONGO_URI; // Get URI from .env
    if (!mongoURI) {
        console.error('MONGO_URI is not defined in .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI); // Connect to MongoDB
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = mongoConnect;
