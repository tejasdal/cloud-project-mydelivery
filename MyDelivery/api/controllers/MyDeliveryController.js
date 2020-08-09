/**
 * MyDeliveryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


function sendError(res, message) {
  res.view('pages/error', {
    message: message
  });
}

module.exports = {

  list: function (req, res) {
    MyDelivery.find({}).exec(function (err, Users) {
      if (err) {
        // res127.send(500, {error: 'Database Error'});
        sendError(res, "Error while listing orders: ", err);
      }
      res.view('viewData', {MyDelivery: Users});
    });
  },

  createOrder: function (req, res) {
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
        sendError(res, "Error while creating new order: ", err);
      }
      res.status(200).send(order);
    });
  },

  editOrder: function (req, res) {

    MyDelivery.findOne({order_id: req.query.order_id}).exec(function (err, result) {
      if (err) {
        sendError(res, "Error while editing order: ", err);
      }
      res.view('pages/editOrder', {order: result});
    });
  },

  editStatus: function (req, res) {

    orderId = req.body.order_id;
    status = req.body.status;

    MyDelivery.update({order_id: orderId}, {status: status}).exec(function (err) {
      if (err) {
        sendError(res, "Error while editing order: ", err);
      }
      res.redirect('/list');
    });
  },

};

