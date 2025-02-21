const Book = require('../models/book');
const mongoose = require('mongoose');

// Récupérer tous les livres
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Ajouter un livre
exports.createBook = async (req, res) => {
  const { titre, auteur, ISBN } = req.body;

  if (!titre || !auteur || !ISBN) {
    return res.status(400).json({ error: 'Titre, auteur, et ISBN sont requis' });
  }

  try {
    const newBook = new Book({ titre, auteur, ISBN });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création du livre' });
  }
};

// Récupérer un livre spécifique
exports.getBookById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Mettre à jour un livre
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { titre, auteur, ISBN } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, { titre, auteur, ISBN }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du livre' });
  }
};

// Supprimer un livre
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    res.status(200).json({ message: 'Livre supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du livre' });
  }
};
