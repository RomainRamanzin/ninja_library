const express = require('express');
const router = express.Router();
const jutsuScrollController = require('../controllers/jutsuScroll.controller');

/**
 * @swagger
 * /api/v1/jutsu-scrolls:
 *   post:
 *     summary: Créer un nouveau rouleau de jutsu
 *     tags: [Jutsu Scrolls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - creator
 *               - rank
 *               - quantity
 *               - description
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               creator:
 *                 type: string
 *               rank:
 *                 type: string
 *                 enum: ['D', 'C', 'B', 'A', 'S']
 *               quantity:
 *                 type: integer
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               associatedTechniques:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Rouleau de jutsu créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', jutsuScrollController.createJutsuScroll);

/**
 * @swagger
 * /api/v1/jutsu-scrolls:
 *   get:
 *     summary: Récupérer tous les rouleaux de jutsu
 *     tags: [Jutsu Scrolls]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 'Numéro de la page (par défaut: 1)'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 'Nombre d''éléments par page (par défaut: 10)'
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrer par nom du rouleau
 *       - in: query
 *         name: creator
 *         schema:
 *           type: string
 *         description: Filtrer par créateur
 *       - in: query
 *         name: rank
 *         schema:
 *           type: string
 *         description: Filtrer par rang
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: 'Champ et ordre de tri (ex: name:asc)'
 *     responses:
 *       200:
 *         description: Liste des rouleaux de jutsu récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', jutsuScrollController.getAllJutsuScrolls);

/**
 * @swagger
 * /api/v1/jutsu-scrolls/{id}:
 *   get:
 *     summary: Récupérer un rouleau de jutsu par son ID
 *     tags: [Jutsu Scrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du rouleau de jutsu
 *     responses:
 *       200:
 *         description: Rouleau de jutsu récupéré avec succès
 *       404:
 *         description: Rouleau de jutsu non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', jutsuScrollController.getJutsuScrollById);

/**
 * @swagger
 * /api/v1/jutsu-scrolls/{id}:
 *   put:
 *     summary: Mettre à jour un rouleau de jutsu
 *     tags: [Jutsu Scrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du rouleau de jutsu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               creator:
 *                 type: string
 *               rank:
 *                 type: string
 *                 enum: ['D', 'C', 'B', 'A', 'S']
 *               quantity:
 *                 type: integer
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               associatedTechniques:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Rouleau de jutsu mis à jour avec succès
 *       404:
 *         description: Rouleau de jutsu non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', jutsuScrollController.updateJutsuScroll);

/**
 * @swagger
 * /api/v1/jutsu-scrolls/{id}:
 *   delete:
 *     summary: Supprimer un rouleau de jutsu
 *     tags: [Jutsu Scrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du rouleau de jutsu
 *     responses:
 *       200:
 *         description: Rouleau de jutsu supprimé avec succès
 *       404:
 *         description: Rouleau de jutsu non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', jutsuScrollController.deleteJutsuScroll);

module.exports = router;