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
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

// Carrega as Models do Mongoose
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Carrega as Rotas
const indexRoute = require('./routes/index.js');
const productRoute = require('./routes/product');
const CustomerRoute = require('./routes/customer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', CustomerRoute);

module.exports = app;
