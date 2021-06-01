'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
//TODO: Criar Erros personalizados para o erro 404
//TODO: No Catch, adicionar o nome do método e o método HTTP do erro além de message

exports.get = async (req, res, next) => {
  //TODO: Adicionar Fluent Validation
  try {
    var data = await repository.get();

    if (data === null) {
      res.status(404).send();
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar a sua requisição: ${error}`,
    });
  }
};

exports.getBySlug = async (req, res, next) => {
  //TODO: Adicionar Fluent Validation
  try {
    const data = await repository.getBySlug(req.params.slug);

    if (data === null) {
      res.status(404).send();
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar a sua requisição: ${error}`,
    });
  }
};

exports.getById = async (req, res, next) => {
  //TODO: Adicionar Fluent Validation
  try {
    const data = await repository.getById(req.params.id);
    if (data === null) {
      res.status(404).send();
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar a sua requisição: ${error}`,
    });
  }
};

exports.getByTag = async (req, res, next) => {
  //TODO: Adicionar Fluent Validation
  try {
    const data = await Product.find(
      {
        tags: req.params.tag,
        active: true,
      },
      'title description price slug tags',
    );

    if (data === null) {
      res.status(404).send();
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar a sua requisição: ${error}`,
    });
  }
};

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    'O título deve conter pelo menos 3 caracters',
  );

  contract.hasMinLen(
    req.body.slug,
    3,
    'O slug deve conter pelo menos 3 caracters',
  );

  contract.hasMinLen(
    req.body.description,
    3,
    'O título deve conter pelo menos 3 caracters',
  );

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create(req.body);

    res
      .status(201)
      .send({ message: `Produto ${product.title} cadastrado com sucesso` });
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar a sua requisição: ${error}`,
    });
  }
};

exports.put = async (req, res, next) => {
  //TODO: Adicionar Fluent Validation
  try {
    const id = req.params.id;

    await repository
      .update(id, req.body)
      .then((x) => {
        if (x === null) res.status(404).send();
        else
          res
            .status(200)
            .send({ message: `Produto ${x.title} atualizado com sucesso!` });
      })
      .catch((error) =>
        res
          .status(400)
          .send({ message: 'Falha ao atualizar o produto', data: error }),
      );
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar a sua requisição: ${error}`,
    });
  }
};

exports.delete = async (req, res, next) => {
  //TODO: Adicionar Fluent Validation
  //TODO: Fazer com que o produto seja desativado (active: false) ao invés de uma deleção Física
  try {
    const id = req.body.id;
    await repository.delete(id);
    if (x === null) res.status(404).send();
    else
      res
        .status(200)
        .send({ message: `Produto ${x.title} atualizado com sucesso!` });
  } catch (error) {
    res.status(500).send({
      message: `Falha ao processar a sua requisição: ${error}`,
    });
  }
};
