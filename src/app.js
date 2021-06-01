'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();

// Conecta ao Banco
//TODO: Alterar os dados para variáveis de ambiente protegidas por senha
mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Carrega as Models do Mongoose
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Carrega as Rotas
const indexRoute = require('./routes/index.js');
const productRoute = require('./routes/product');
const CustomerRoute = require('./routes/customer');
const OrderRoute = require('./routes/order');

app.use(
  bodyParser.json({
    limit: '5mb',
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', CustomerRoute);
app.use('/orders', OrderRoute);

module.exports = app;
