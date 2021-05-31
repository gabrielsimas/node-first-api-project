'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Conecta ao Banco
//TODO: Alterar os dados para variáveis de ambiente protegidas por senha
mongoose.connect(
  'mongodb+srv://gabrielsimas:J4n3c4554n1@nodeapicluster.bsxoi.gcp.mongodb.net/api-com-node',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// Carrega as Rotas
const indexRoute = require('./routes/index.js');
const productRoute = require('./routes/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;
