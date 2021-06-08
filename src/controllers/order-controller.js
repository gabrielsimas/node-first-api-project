'use strict';
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth');
//TODO: Implementar os outros métodos

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send();
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar sua requisição: ${error}`,
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    //TODO: Refatorar esse trecho criando função genérica
    //TODO: Calcular o preço x quantidade antes de gravar
    // Recupera o token
    const token =
      req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const id = guid.raw().substring(0, 6);
    await repository.create({
      customer: data.id,
      number: id,
      items: req.body.items,
    });
    res.status(201).send({
      message: `Pedido ${id} cadastrado com sucesso`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Falha ao processar sua requisição: ${error}`,
    });
  }
};
