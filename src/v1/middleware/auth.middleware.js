const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Utilisez la même clé secrète que pour signer le token

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Récupérer le token du header Authorization

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé, token manquant' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Ajoutez les informations de l'utilisateur à la requête
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token invalide' });
    }
};

module.exports = authMiddleware;
