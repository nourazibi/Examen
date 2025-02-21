const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Route pour récupérer tous les livres
router.get('/', bookController.getAllBooks);

// Route pour ajouter un livre
router.post('/', bookController.createBook);

// Route pour récupérer un livre par ID
router.get('/:id', bookController.getBookById);

// Route pour mettre à jour un livre
router.put('/:id', bookController.updateBook);

// Route pour supprimer un livre
router.delete('/:id', bookController.deleteBook);

module.exports = router;
