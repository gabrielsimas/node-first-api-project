'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: Substituir a validação do Mongoose pelos objetos de Validação
const schema = new Schema({
  title: {
    type: String,
    required: [true, 'The title is required!'],
    trim: true,
  },
  slug: {
    type: String,
    required: [, 'The slug is required!'],
    trim: true,
    index: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'The description is required!'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'The price is required!'],
  },
  active: {
    type: Boolean,
    required: [true, 'The active status is required!'],
    default: true,
  },
  tags: [
    {
      type: String,
      required: [true, 'The tags are required'],
    },
  ],
  image: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Product', schema);
