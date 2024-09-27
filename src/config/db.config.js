const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

let mongoServer;
let isConnected = false; // État de la connexion

const connectDB = async () => {
    if (!isConnected) {
        if (process.env.NODE_ENV === 'test') {
            // Utiliser MongoDB en mémoire pour les tests
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log('MongoDB en mémoire connecté');
        } else {
            // Utiliser la base de données de production
            await mongoose.connect(process.env.MONGO_URI);
            console.log('MongoDB connecté');
        }
        isConnected = true; // Marquer comme connecté
    }
};

const disconnectDB = async () => {
    if (isConnected) {
        await mongoose.disconnect();
        if (mongoServer) {
            await mongoServer.stop(); // Arrêter le serveur en mémoire
        }
        isConnected = false; // Réinitialiser l'état de connexion
        console.log('MongoDB déconnecté');
    }
};

module.exports = { connectDB, disconnectDB };