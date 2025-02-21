// server.js ou app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());
app.use(cors());  // Pour gérer les requêtes CORS, surtout utile pour les applications frontend React

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/librairie')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));


// Définir le modèle de livre (Book)
const BookSchema = new mongoose.Schema({
  titre: String,
  auteur: String,
  ISBN: String,
});

const Book = mongoose.model('Book', BookSchema);

// Route GET pour récupérer tous les livres
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find(); // Recherche tous les livres dans la base de données
    res.status(200).json(books);  // Retourne la liste des livres en JSON
  } catch (err) {
    res.status(500).json({ message: 'Erreur du serveur' });  // En cas d'erreur
  }
});

// Route POST pour ajouter un livre
app.post('/api/books', async (req, res) => {
  const { titre, auteur, ISBN } = req.body;  // Récupère les données envoyées par le frontend
  try {
    const newBook = new Book({ titre, auteur, ISBN });
    await newBook.save();  // Sauvegarde du livre dans la base de données
    res.status(201).json(newBook);  // Retourne le livre ajouté avec un code 201 (créé)
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout du livre' });  // En cas d'erreur
  }
});

// Démarrer le serveur sur le port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
