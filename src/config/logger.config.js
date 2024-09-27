const winston = require('winston');
require('winston-mongodb');

// Configuration du logger
const logger = winston.createLogger({
    level: 'info', // Niveau de logging par défaut
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // Transport pour les logs dans la console
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        // Transport pour les logs dans MongoDB
        new winston.transports.MongoDB({
            db: process.env.MONGO_URI,
            collection: 'logs',
            level: 'error', // Enregistre uniquement les logs d'erreur dans MongoDB
            format: winston.format.json(),
            // Si vous avez déjà une connexion établie, vous pouvez utiliser `mongoose.connection` ici
            client: require('mongoose').connection.getClient(), // Utilisez le client de Mongoose
        }),
    ],
});

// Exposez le logger pour l'utiliser dans d'autres fichiers
module.exports = logger;
