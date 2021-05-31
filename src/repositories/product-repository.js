'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () =>
  Product.find(
    {
      active: true,
    },
    'title price slug tags',
  );

exports.getBySlug = (slug) =>
  Product.findOne(
    {
      slug: slug,
      active: true,
    },
    'title description price slug tags',
  );

exports.getById = (id) => Product.findById(id);
exports.getByTag = (tag) =>
  Product.find(
    {
      tags: tag,
      active: true,
    },
    'title description price slug tags',
  );
exports.create = (data) => {
  var product = new Product(data);
  product.save();
};

exports.update = (id, data) =>
  Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      tags: data.tags,
      image: data.image,
    },
  });

exports.delete = (id) => Product.findByIdAndRemove(id);
