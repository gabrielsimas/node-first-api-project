'use strict'; // Força o js a ser mais restrito no que tange as regras
const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();

//TODO: Utilizar node env
const port = 3000;
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

// Rota Padrão
const route = router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'Node Store API',
    version: '0.0.1',
  });
});

app.use('/', route);

server.listen(port);
console.log(`API rodando na porta ${port}`);
