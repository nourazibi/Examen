// server.js ou app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());
app.use(cors());  // Pour gérer les requêtes CORS, surtout utile pour les applications frontend React

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/librairie', { useNewUrlParser: true, useUnifiedTopology: true })
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
// Récupérer un livre spécifique par ID
app.get('/api/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du livre' });
    }
  });
  // Modifier un livre spécifique par ID
app.put('/api/books/:id', async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du livre' });
    }
  });
  
  // Supprimer un livre spécifique par ID
app.delete('/api/books/:id', async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.status(200).json({ message: 'Livre supprimé' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du livre' });
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
