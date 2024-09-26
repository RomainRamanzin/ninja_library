const express = require('express');
const router = express.Router();
const ninjaController = require('../controllers/ninja.controller');

/**
 * @swagger
 * /api/v1/ninjas:
 *   post:
 *     summary: Créer un nouveau ninja
 *     tags: [Ninjas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - rank
 *               - jutsus_maitrises
 *               - clan
 *               - specialite
 *             properties:
 *               name:
 *                 type: string
 *               rank:
 *                 type: string
 *                 enum: ['Genin', 'Chunin', 'Jonin', 'Kage']
 *               jutsus_maitrises:
 *                 type: array
 *                 items:
 *                   type: string
 *               clan:
 *                 type: string
 *               specialite:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ninja créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', ninjaController.createNinja);

/**
 * @swagger
 * /api/v1/ninjas:
 *   get:
 *     summary: Récupérer tous les ninjas
 *     tags: [Ninjas]
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
 *         description: Filtrer par nom de ninja
 *       - in: query
 *         name: rank
 *         schema:
 *           type: string
 *         description: Filtrer par rang de ninja
 *       - in: query
 *         name: clan
 *         schema:
 *           type: string
 *         description: Filtrer par clan
 *       - in: query
 *         name: specialite
 *         schema:
 *           type: string
 *         description: Filtrer par spécialité
 *       - in: query
 *         name: jutsu
 *         schema:
 *           type: string
 *         description: Filtrer par jutsu maîtrisé
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: 'Champ et ordre de tri (ex: name:asc)'
 *     responses:
 *       200:
 *         description: Liste des ninjas récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', ninjaController.getAllNinjas);

/**
 * @swagger
 * /api/v1/ninjas/{id}:
 *   get:
 *     summary: Récupérer un ninja par son ID
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ninja
 *     responses:
 *       200:
 *         description: Ninja récupéré avec succès
 *       404:
 *         description: Ninja non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', ninjaController.getNinjaById);

/**
 * @swagger
 * /api/v1/ninjas/{id}:
 *   put:
 *     summary: Mettre à jour un ninja
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ninja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rank:
 *                 type: string
 *                 enum: [Genin, Chunin, Jonin, Kage]
 *               jutsus_maitrises:
 *                 type: array
 *                 items:
 *                   type: string
 *               clan:
 *                 type: string
 *               specialite:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ninja mis à jour avec succès
 *       404:
 *         description: Ninja non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', ninjaController.updateNinja);

/**
 * @swagger
 * /api/v1/ninjas/{id}:
 *   delete:
 *     summary: Supprimer un ninja
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ninja
 *     responses:
 *       200:
 *         description: Ninja supprimé avec succès
 *       404:
 *         description: Ninja non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', ninjaController.deleteNinja);

module.exports = router;