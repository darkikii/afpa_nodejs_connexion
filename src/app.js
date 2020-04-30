const express = require('express');
/*const userRouter = require('./routers/user');*/
const bodyParser = require('body-parser');/*pour extraire le json du formulaire envoyé (npm install --save body-parser)*/
require('./db/db');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const userRoutes = require('./routers/user');

/*pour le CORES*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');/*donne l'acces a tout le monde (*)*/
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/', userRoutes);

module.exports = app; /*exporte notre appli*/
