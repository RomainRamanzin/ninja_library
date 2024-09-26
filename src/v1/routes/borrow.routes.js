const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrow.controller');

/**
 * @swagger
 * /api/v1/borrows:
 *   post:
 *     summary: Créer un nouvel emprunt
 *     tags: [Borrows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ninjaId
 *               - jutsuScrollId
 *               - borrowDate
 *               - returnDueDate
 *             properties:
 *               ninjaId:
 *                 type: string
 *               jutsuScrollId:
 *                 type: string
 *               borrowDate:
 *                 type: string
 *                 format: date
 *               returnDueDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: ['borrowed', 'returned', 'overdue']
 *                 default: 'borrowed'
 *     responses:
 *       201:
 *         description: Emprunt créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', borrowController.createBorrow);

/**
 * @swagger
 * /api/v1/borrows:
 *   get:
 *     summary: Récupérer tous les emprunts
 *     tags: [Borrows]
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
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtrer par statut de l'emprunt
 *       - in: query
 *         name: ninjaId
 *         schema:
 *           type: string
 *         description: Filtrer par ID du ninja
 *       - in: query
 *         name: jutsuScrollId
 *         schema:
 *           type: string
 *         description: Filtrer par ID du rouleau de jutsu
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: 'Champ et ordre de tri (ex: borrowDate:desc)'
 *     responses:
 *       200:
 *         description: Liste des emprunts récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', borrowController.getAllBorrows);

/**
 * @swagger
 * /api/v1/borrows/{id}:
 *   get:
 *     summary: Récupérer un emprunt par son ID
 *     tags: [Borrows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'emprunt
 *     responses:
 *       200:
 *         description: Emprunt récupéré avec succès
 *       404:
 *         description: Emprunt non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', borrowController.getBorrowById);

/**
 * @swagger
 * /api/v1/borrows/{id}:
 *   put:
 *     summary: Mettre à jour un emprunt
 *     tags: [Borrows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'emprunt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               returnDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: ['borrowed', 'returned', 'overdue']
 *     responses:
 *       200:
 *         description: Emprunt mis à jour avec succès
 *       404:
 *         description: Emprunt non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', borrowController.updateBorrow);

/**
 * @swagger
 * /api/v1/borrows/{id}:
 *   delete:
 *     summary: Supprimer un emprunt
 *     tags: [Borrows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'emprunt
 *     responses:
 *       200:
 *         description: Emprunt supprimé avec succès
 *       404:
 *         description: Emprunt non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', borrowController.deleteBorrow);

module.exports = router;