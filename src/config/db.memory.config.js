const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let isConnected = false; // État de la connexion

const connectDB = async () => {
    if (!isConnected) {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true; // Marquer comme connecté
        console.log('MongoDB en mémoire connecté');
    }
};

const disconnectDB = async () => {
    if (isConnected) {
        await mongoose.disconnect();
        await mongoServer.stop();
        isConnected = false; // Réinitialiser l'état de connexion
        console.log('MongoDB en mémoire déconnecté');
    }
};

module.exports = { connectDB, disconnectDB };
