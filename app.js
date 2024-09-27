const express = require('express');
const connectDB = require('./src/config/db.config');
const ninjaRoutes = require('./src/v1/routes/ninja.routes');
const jutsuScrollRoutes = require('./src/v1/routes/jutsuScroll.routes');
const borrowRoutes = require('./src/v1/routes/borrow.routes');
const reportRoutes = require('./src/v1/routes/report.routes');
const recommendationRoutes = require('./src/v1/routes/recommendation.routes')
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const loggerMiddleware = require('./src/v1/middleware/logger.middleware')
const limiter = require('./src/v1/middleware/rate-limit.middleware')
const authRoutes = require('./src/v1/routes/auth.routes')
const authMiddleware = require('./src/v1/middleware/auth.middleware')
const protectedRoutes = require('./src/v1/routes/protected.routes')

const app = express();
connectDB();

// Autres configurations (routes, middlewares...)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importation du limiter
app.use(limiter);

// Route pour la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Importation des routes V1
app.use('/api/v1/ninjas', ninjaRoutes);
app.use('/api/v1/jutsu-scrolls', jutsuScrollRoutes);
app.use('/api/v1/borrows', borrowRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/recommendations', recommendationRoutes);

// Importation des routes d'Authentification
app.use('/api/v1/auth', authRoutes);

// Création d'une route de test pour l'authentification
app.use('/api/v1/protected', protectedRoutes);

// Importation des middlewares
app.use(loggerMiddleware);

// Importation des routes V2
// app.use('/api/v2/ninjas', ninjaRoutesV2);
// app.use('/api/v2/jutsu-scrolls', jutsuScrollRoutesV2);
// app.use('/api/v2/borrows', borrowRoutesV2);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;