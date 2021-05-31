'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

exports.get = (req, res, next) => {
  Product.find(
    {
      active: true,
    },
    'title price slug tags',
  )
    .then((data) => {
      if (data === null) {
        res.status(404).send();
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => res.status(400).send(error));
};

exports.getBySlug = (req, res, next) => {
  Product.findOne(
    {
      slug: req.params.slug,
      active: true,
    },
    'title description price slug tags',
  )
    .then((data) => {
      if (data === null) {
        res.status(404).send();
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => res.status(400).send(error));
};

exports.getById = (req, res, next) => {
  Product.findById(req.params.id)
    .then((data) => {
      if (data === null) {
        res.status(404).send();
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => res.status(400).send(error));
};

exports.getByTag = (req, res, next) => {
  Product.find(
    {
      tags: req.params.tag,
      active: true,
    },
    'title description price slug tags',
  )
    .then((data) => {
      if (data === null) {
        res.status(404).send();
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => res.status(400).send(error));
};

exports.post = (req, res, next) => {
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

  var product = new Product(req.body);
  //TODO: Converter as tags para minusculas antes de gravar
  product
    .save()
    .then((x) => {
      res
        .status(201)
        .send({ message: `Produto ${product.title} cadastrado com sucesso` });
    })
    .catch((error) =>
      res.status(400).send({
        message: `Falha ao cadastrar o produto ${product.title}`,
        data: error,
      }),
    );
  //Pode usar outra abordagem se quiser
  //útil para validações
  /*
  var product = new Product();
  product.title = req.body.title ? req.body.title : null;
  product.slug = req.body.slug ? req.body.slug : null;*/
};

exports.put = (req, res, next) => {
  const id = req.params.id;

  Product.findByIdAndUpdate(id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      tags: req.body.tags,
      image: req.body.image,
    },
  })
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

  res.status(200).send({
    id: id,
    item: req.body,
  });
};

exports.delete = (req, res, next) => {
  const id = req.body.id;

  //TODO: Fazer com que o produto seja desativado (active: false) ao invés de uma deleção Física
  Product.findByIdAndRemove(id)
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

  res.status(200).send({
    id: id,
    item: req.body,
  });
};
