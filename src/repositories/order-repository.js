'use strict';
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

//TODO: Implementar os outros métodos

exports.get = async (data) =>
  await Order.find({}, 'number status customer items')
    .populate('customer', 'name')
    .populate('items.product', 'title');

exports.create = async (data) => {
  var order = new Order(data);
  await order.save(order);
};
