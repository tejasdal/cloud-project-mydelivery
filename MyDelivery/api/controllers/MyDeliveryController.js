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

};

