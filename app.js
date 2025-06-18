const express = require("express");
const twig = require('twig');
const dotenv = require('dotenv');

// Chargement des variables d'environnement
const result = dotenv.config();
if (result.error) {
  console.error("Erreur de chargement du fichier .env");
  process.exit(1);
}

const RHRoutes = require("./src/routes/RHRoutes");
const mainRoutes = require("./src/routes/mainRoutes");
const session = require("express-session");
const authguard = require("./src/services/authguard");
const ordinateurRoutes = require('./src/routes/ordinateurRoutes');

const app = express();

// Configuration de base
app.set('view engine', 'twig');
app.set('views', './src/views');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Configuration de la session
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Routes avec gestion d'erreurs
app.use((req, res, next) => {
  console.log('Session:', req.session);
  next();
});

app.use(mainRoutes);
app.use(RHRoutes);
app.use('/ordinateurs', authguard, ordinateurRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});