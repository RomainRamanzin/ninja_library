const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation.controller');

/**
 * @swagger
 * /api/v1/recommendations/jutsu-of-the-month:
 *   get:
 *     summary: Obtenir le jutsu du mois
 *     tags: [Recommandations]
 *     description: Récupère le jutsu le plus emprunté du mois en cours avec ses statistiques d'emprunt
 *     responses:
 *       200:
 *         description: Jutsu du mois récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     rank:
 *                       type: string
 *                     category:
 *                       type: string
 *                     creator:
 *                       type: string
 *                     popularity:
 *                       type: integer
 *       404:
 *         description: Aucun jutsu du mois trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/jutsu-of-the-month', recommendationController.getJutsuOfTheMonth);


/**
 * @swagger
 * /api/v1/recommendations/{ninjaId}:
 *   get:
 *     summary: Obtenir des recommandations de jutsu pour un ninja
 *     tags: [Recommandations]
 *     parameters:
 *       - in: path
 *         name: ninjaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ninja
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Nombre de recommandations à retourner (par défaut: 5)"
 *     responses:
 *       200:
 *         description: Recommandations de jutsu récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       rank:
 *                         type: string
 *                       category:
 *                         type: string
 *                       popularity:
 *                         type: integer
 *       500:
 *         description: Erreur serveur
 */
router.get('/:ninjaId', recommendationController.getJutsuRecommendations);

module.exports = router;
