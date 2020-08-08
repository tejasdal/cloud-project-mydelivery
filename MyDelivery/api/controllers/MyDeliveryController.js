/**
 * MyDeliveryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

function sendError(res, message) {
  res.view('pages/error', {
      message: message
  });
}

module.exports = {

  list: function (req127, res127) {
    console.log("Into List method");
    MyDelivery.find({}).exec(function (err, Users) {
      if (err) {
        // res127.send(500, {error: 'Database Error'});
        sendError(res127, "Error while listing orders: ", err);
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
      status: 'ORDER RECEIVED'
    };

    MyDelivery.create(order).exec(function (err) {
      if (err) {
        console.log(err);
        // res.send(500, { error: 'Database Error' });
        sendError(res127, "Error while creating new order: ", err);
      }
      res.status(200).send(order);
    });
  },

  editOrder: function (req, res) {

    console.log("Redirect to edit order page.");
    console.log(req.query);
    MyDelivery.findOne({ order_id: req.query.order_id }).exec(function (err, result) {
      if (err) {
        // res.send(500, { error: 'Error while editing the order: '+ req.query.order_id });
        sendError(res127, "Error while editing order: ", err);
      }
      res.view('pages/editOrder', { order: result });
    });
  },
  
  editStatus:  function (req, res) {

    console.log("Edit status of order in database.");

    orderId = req.body.order_id;
    status = req.body.status;
    console.log(req.body);

    MyDelivery.update({ order_id: orderId }, { status: status }).exec(function (err) {
      if (err) {
        console.log(err);
        // res.send(500, { error: 'Database Error' });
        sendError(res127, "Error while editing order: ", err);
      }
      res.redirect('/list');
    });
  }, 

};

