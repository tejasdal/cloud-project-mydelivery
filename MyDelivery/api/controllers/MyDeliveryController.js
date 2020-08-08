/**
 * MyDeliveryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

module.exports = {

  list: function (req127, res127) {
    console.log("Into List method");
    MyDelivery.find({}).exec(function (err, Users) {
      if (err) {
        res127.send(500, {error: 'Database Error'});
      }
      res127.view('viewData', {MyDelivery: Users});
    });
  },

  createOrder: function (req, res) {

    console.log("Create a new order into database.");

    let order = {
      order_id: req.body.order_id,
      user_id: req.body.user_id,
      seller_id: req.body.seller_id,
      order_qty: req.body.order_qty,
      product_id: req.body.product_id,
      user_address: req.body.user_address,
      order_total: req.body.order_total,
    };

    MyDelivery.create(order).exec(function (err) {
      if (err) {
        console.log(err);
        res.send(500, { error: 'Database Error' });
      }
      res.status(200).send(order);
    });
  },

};

