/**
 * MyDeliveryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

async function xa_start(XAID) {
  console.log("Starting XA");
  let sql = "xa start '" + XAID + "';";
  await sails.getDatastore().sendNativeQuery(sql);
}

async function xa_end(XAID) {
  console.log("Endind XA");
  let sql = "xa end '" + XAID + "';";
  await sails.getDatastore().sendNativeQuery(sql);
}

async function xa_rollback(XAID) {
  console.log("Rollinng back XA");
  let sql = "xa rollback '" + XAID + "';";
  let error = await sails.getDatastore().sendNativeQuery(sql);
  console.log("Errrrror while");
  console.log(error);
}

async function xa_prepare(XAID) {
  console.log("preparing XA");
  let sql = "xa prepare '" + XAID + "';";
  let err = await sails.getDatastore().sendNativeQuery(sql);
  console.log("Error while preparing XA.");
  console.log(err);
}

async function xa_commit(XAID) {
  console.log("comit XA");
  let sql = "xa commit '" + XAID + "';";
  await sails.getDatastore().sendNativeQuery(sql);
}

function sendError(res, message) {
  res.view('pages/error', {
    message: message
  });
}

async function placeOrder(req, res){

  // start XD with Unique ID  
  console.log(req.query);
  let XA_ID = req.query.tranId;

  console.log(XA_ID + " is recived XA ID");

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

  await xa_start(XA_ID);
  MyDelivery.create(order).exec(async function (err) {
    if (err) {
      console.log("Error while creating new order for transaction: "+ XA_ID + ", error: "+ err);
      // sendError(res, "Error while creating new order: ", err);
      res.status(500).send("Error processing order.");
    }
    console.log("New order is placed successfully.");
    // res.status(200).send(order);
      await xa_end(XA_ID);
      await xa_prepare(XA_ID);
      // await xa_commit(XA_ID);
      res.status(200).send("Processing order.");
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

  createOrder: async function (req, res) {
    
     placeOrder(req, res);
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

  commitOrRollBack: function (req, res) {

    console.log(req.query);

    if (req.query.perform === 'true') {
      //perform commit with given id;
      console.log("Transaction: "+ req.query.tranId + " is commited.");
      xa_commit(req.query.tranId);
  } else {
      //rollback with given id;
      console.log("Transaction: "+ req.query.tranId + " is rollbacked.");
     xa_rollback(req.query.tranId);
  }
  console.log("Transaction: " + req.query.tranId + " completed successfully!");
  res.status(200).send("Transaction: " + req.query.tranId + " completed successfully!");
  },

};

