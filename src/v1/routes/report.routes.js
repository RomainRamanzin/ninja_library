const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');

/**
 * @swagger
 * /api/v1/reports/jutsu-popularity:
 *   get:
 *     summary: Obtenir la popularité des jutsu par rang ninja
 *     tags: [Rapports]
 *     description: Cette route renvoie un rapport sur la popularité des jutsu en fonction du rang des ninjas. Le rapport inclut les 3 jutsu les plus populaires pour chaque rang de ninja.
 *     responses:
 *       200:
 *         description: Rapport de popularité des jutsu récupéré avec succès
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
 *                       ninjaRank:
 *                         type: string
 *                       topJutsus:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             jutsuName:
 *                               type: string
 *                             jutsuRank:
 *                               type: string
 *                             jutsuCategory:
 *                               type: string
 *                             count:
 *                               type: integer
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la génération du rapport"
 *                 error:
 *                   type: string
 */
router.get('/jutsu-popularity', reportController.getJutsuPopularityByNinjaRank);

module.exports = router;
