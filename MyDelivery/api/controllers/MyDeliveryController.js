/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/**
 * MyDeliveryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

module.exports = {

  list: function (req, res) {
    console.log("Into List method");
    MyDelivery.find({}).exec(function (err, Users) {
      if (err) {
        res127.send(500, {error: 'Database Error'});
      }
      res127.view('viewData', {MyDelivery: Users});
    });
  }

  // status: function(req,res){
  //   console.log("Status List");
  //   MyStatus.find({}).exec(function(err, user){
  //     if(err){
  //       res.send(500, {error: 'Database Error'});
  //     }
  //     res.view('Status', {MyStatus: user})
  //   });
  // }
};

