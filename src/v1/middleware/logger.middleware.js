const logger = require('./../../config/logger.config')

const logRequest = (req, res, next) => {
    logger.info(`Requête ${req.method} sur ${req.originalUrl}`);
    res.on('finish', () => {
        if (res.headersSent && res.statusCode >= 400) {
            logger.error(`Erreur sur la requête ${req.method} sur ${req.originalUrl}, code d'erreur: ${res.statusCode}`);
        }
    });
    next();
};

module.exports = logRequest;

