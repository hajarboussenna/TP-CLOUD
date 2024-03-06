const express = require('express');
const app = express();
const port = 3000;
const joueurs=require('./joueurs.json')

app.use(express.json());

// 1
app.post('/joueurs', (req, res) => {
  joueurs.push(req.body);
  res.status(200).json(joueurs);
});

// 2
app.get('/joueurs', (req, res) => {
  res.status(200).json(joueurs);
});

// 3
app.put('/joueurs/:id', (req, res) => {
  joueurs = joueurs.map(joueur => {
    if (joueur.id === req.params.id) {
      return { ...joueur, ...req.body };
    }
    return joueur;
  });
  res.json({ message: 'Joueur mis à jour avec succès' });
});

// 4
app.delete('/joueurs/:id', (req, res) => {
  const playerId = req.params.id;
  joueurs = joueurs.filter(joueur => joueur.id !== playerId);
  res.json({ message: 'Joueur supprimé avec succès' });
});
// get de joueurs id
app.get('/joueurs/:id', (req, res) => {
  const joueursid = req.params.id;
  const equipeJoueur = joueurs.filter(joueur => joueur.id === joueursid);
  res.json(equipeJoueur);
});
// get de joueurs equipe
app.get('/equipe/:id', (req, res) => {
  const equipeId = req.params.id;
  const equipeJoueurs = joueurs.filter(joueur => joueur.idEquipe === equipeId);
  res.json(equipeJoueurs);
});

// 
app.get('/joueur/:id/equipe', (req, res) => {
  const playerId = req.params.id;
  const joueurEquipe = joueurs.find(joueur => joueur.id === playerId);
  res.json({ equipeId: joueurEquipe.idEquipe });
});

// 
app.get('/joueurs/search', (req, res) => {
  const playerName = req.query.nom;
  const foundJoueurs = joueurs.filter(joueur => joueur.nom.includes(playerName));
  res.json(foundJoueurs);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
