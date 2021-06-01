'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () =>
  await Product.find(
    {
      active: true,
    },
    'title price slug tags',
  );

exports.getBySlug = async (slug) =>
  await Product.findOne(
    {
      slug: slug,
      active: true,
    },
    'title description price slug tags',
  );

exports.getById = async (id) => await Product.findById(id);
exports.getByTag = async (tag) =>
  await Product.find(
    {
      tags: tag,
      active: true,
    },
    'title description price slug tags',
  );
exports.create = async (data) => {
  var product = new Product(data);
  return await product.save();
};

exports.update = async (id, data) =>
  await Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      tags: data.tags,
      image: data.image,
    },
  });

exports.delete = async (id) => await Product.findByIdAndRemove(id);
