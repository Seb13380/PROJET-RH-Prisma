const express = require("express");
const twig = require('twig');
const dotenv = require('dotenv');
const session = require("express-session");
const employeRoutes = require('./src/routes/employeRoutes');


const result = dotenv.config();
if (result.error) {
  console.error("Erreur de chargement du fichier .env");
  process.exit(1);
}

const RHRoutes = require("./src/routes/RHRoutes");
const mainRoutes = require("./src/routes/mainRoutes");
const authguard = require("./src/services/authguard");
const ordinateurRoutes = require('./src/routes/ordinateurRoutes');
const homeRoutes = require('./src/routes/homeRoutes');
const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use('/', homeRoutes);

app.set('view engine', 'twig');
app.set('views', './src/views');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  next();
});

app.use(mainRoutes);
app.use(RHRoutes);
app.use('/ordinateurs', ordinateurRoutes);
app.use('/employes', employeRoutes);


app.get('/', (req, res) => {
  res.render('index', { title: 'Accueil' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'À propos' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
 
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

