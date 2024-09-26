const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connecté');
    } catch (error) {
        console.error('Erreur de connexion : ', error);
        process.exit(1); // Arrête le processus si la connexion échoue
    }
};

module.exports = connectDB;