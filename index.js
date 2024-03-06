const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const fs = require('fs');

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello cloud ");
})

// Read all joueurs
app.get('/joueurs', (req, res) => {
  console.log("get all");
  const joueurs = JSON.parse(fs.readFileSync('joueurs.json', 'utf-8'));
  res.json(joueurs);
});

//[tested]
// Read a specific joueur by ID
app.get('/joueurs/:id', (req, res) => {
  const joueurs = JSON.parse(fs.readFileSync('joueurs.json', 'utf-8'));
  const joueur = joueurs.find(j => j.id === req.params.id);
  res.json(joueur);
});

//
app.get('/equipes/:id/joueurs', (req, res) => {
    const joueurs = JSON.parse(fs.readFileSync('joueurs.json', 'utf-8'));
    const joueursEquipe = joueurs.filter(j => j.idEquipe === req.params.id);
    res.json(joueursEquipe);
});
  

app.get('/joueurs/:id/equipe', (req, res) => {
    const joueurs = JSON.parse(fs.readFileSync('joueurs.json', 'utf-8'));
    const joueur = joueurs.find(j => j.id === req.params.id);
    const equipeId = joueur ? joueur.idEquipe : null;
    res.json({ equipeId });
});

app.post('/joueurs/search', (req, res) => {
    const joueurs = JSON.parse(fs.readFileSync('joueurs.json', 'utf-8'));
    const searchName = req.query.nom.toLowerCase();
    const result = joueurs.filter(j => j.nom.toLowerCase().includes(searchName))
    res.json(result);
});

app.post('/joueurs', (req, res) => {
  const joueurs = JSON.parse(fs.readFileSync('joueurs.json', 'utf-8'));
  const newJoueur = {
    'id': req.body.id ?req.body.id :0,
    'idEquipe': req.body.idEquipe? req.body.idEquipe : 0,
    'nom': req.body.nom ? req.body.nom : '',
    'numero': req.body.numero ? req.body.numero : 0,
    'poste': req.body.poste ? req.body.poste : ''
  };
  joueurs.push(newJoueur);
  fs.writeFileSync('joueurs.json', JSON.stringify(joueurs, null, 2));
  console.log(req)
  res.json(newJoueur);
});

app.put('/joueurs/:id', (req, res) => {
  const joueurs = JSON.parse(fs.readFileSync('joueurs.json', 'utf-8'));
  const updatedJoueur = req.body;
  const index = joueurs.findIndex(j => j.id === req.params.id);
  joueurs[index] = updatedJoueur;
  fs.writeFileSync('joueurs.json', JSON.stringify(joueurs, null, 2));
  res.json(updatedJoueur);
});

app.delete('/joueurs/:id', (req, res) => {
  const joueurs = JSON.parse(fs.readFileSync('joueurs.json', 'utf-8'));
  const index = joueurs.findIndex(j => j.id === req.params.id);
  if (index === -1) {
    res.status(404).send('Joueur not found');
    return;
  }
  
  const deletedJoueur = joueurs.splice(index, 1);
  fs.writeFileSync('joueurs.json', JSON.stringify(joueurs, null, 2));
  res.json(deletedJoueur[0]);
});

app.listen(3000, () => {
  console.log('server url : http://localhost:3000');
});