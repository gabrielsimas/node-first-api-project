'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

//TODO: Implementar as outras rotas para a controller. Só foi adicionado o Post como exemplo
router.post('/', controller.post);

module.exports = router;
