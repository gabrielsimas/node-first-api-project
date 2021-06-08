'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

//TODO: Implementar as outras rotas para a controller. Só foi adicionado o Post como exemplo
//TODO: Autenticar todas as rotas com o JWT

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);

module.exports = router;
