'use strict';
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth');

//TODO: Adicionar as outras operações, não foram inseridas para que o tempo do treinamento fosse menor.

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.name,
    3,
    'O nome deve conter pelo menos 3 caracters',
  );

  contract.isEmail(req.body.email, 'E-mail inválido');

  contract.hasMinLen(
    req.body.password,
    6,
    'A senha deve conter pelo menos 6 caracters',
  );

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(`${req.body.password}${global.SALT_KEY}`),
    });

    res.status(201).send({ message: `Cliente cadastrado com sucesso` });
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar a sua requisição: ${error}`,
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: req.body.password,
    });

    if (!customer) {
      res.status(404).send({
        message: 'Usuário ou senha inválidos',
      });
      return;
    }

    const token = await authService.generateToken({
      email: customer.email,
      name: customer.name,
    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar a sua requisição: ${error}`,
    });
  }
};
