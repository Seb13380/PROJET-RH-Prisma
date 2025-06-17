const express = require("express");
const twig = require('twig');
const RHRoutes = require("./src/routes/RHRoutes");
const mainRoutes = require("./src/routes/mainRoutes");
const session = require("express-session");
require('dotenv').config()

const app = express();
app.set('view engine', 'twig');
app.set('views', './src/views')
app.use(express.static("./public"))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: process.env.BCRYPT_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(RHRoutes)
app.use(mainRoutes)

app.get('/', (req, res) => {
  res.render('pages/home.twig', { user: req.session.RH });
});

app.listen(process.env.PORT, ()=>{
    console.log("Écoute sur le port " + process.env.PORT);
})