const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestion des Ninjas et Jutsu',
            version: '1.0.0',
            description: 'Une API pour gérer les ninjas, les rouleaux de jutsu et les emprunts',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur de développement',
            },
        ],
    },
    apis: ['./src/v1/routes/*.js'], // Chemin vers vos fichiers de routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
