'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async (data) => {
  var customer = new Customer(data);
  return await customer.save();
};

exports.authenticate = async (data) =>
  await Customer.findOne({
    email: data.email,
    password: data.password,
  });
