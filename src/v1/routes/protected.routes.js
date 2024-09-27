const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/v1/protected:
 *   get:
 *     tags: [Protected]
 *     summary: Accéder à une route protégée
 *     description: Cette route nécessite un token JWT valide.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *       401:
 *         description: Accès refusé, token manquant ou invalide
 */
router.get('/', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Vous avez accès à cette route protégée', user: req.user });
});

module.exports = router;
