'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

//TODO: Autenticar todas as rotas com o JWT
const authService = require('../services/auth');

router.get('/', authService.authorize, controller.get);
router.get('/:slug', authService.authorize, controller.getBySlug);
router.get('/admin/:id', authService.authorize, controller.getById);
router.get('/tags/:tag', authService.authorize, controller.getByTag);
router.post('/', authService.authorize, controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
