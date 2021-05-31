'use strict';

const mongoose = require('mongoose');

const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
  Product.find(
    {
      active: true,
    },
    'title price slug',
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send({
        message: `Falha ao cadastrar os produtos`,
        data: error,
      });
    });
};

exports.post = (req, res, next) => {
  var product = new Product(req.body);
  product
    .save()
    .then((x) => {
      res
        .status(201)
        .send({ message: `Produto ${product.title} cadastrado com sucesso` });
    })
    .catch((error) => {
      res.status(400).send({
        message: `Falha ao cadastrar o produto ${product.title}`,
        data: error,
      });
    });
  //Pode usar outra abordagem se quiser
  //útil para validações
  /*
  var product = new Product();
  product.title = req.body.title ? req.body.title : null;
  product.slug = req.body.slug ? req.body.slug : null;*/
};

exports.put = (req, res, next) => {
  let id = req.params.id;
  res.status(200).send({
    id: id,
    item: req.body,
  });
};

exports.delete = (req, res, next) => {
  res.status(201).send(req.body);
};
