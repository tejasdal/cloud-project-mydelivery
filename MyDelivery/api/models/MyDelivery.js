/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/**
 * MyDelivery.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    CreatedAt: false,
    UpdatedAt: false,
    order_id:{
      type: 'integer',
      required:true,
      unique: true
    },
    user_id:{
      type: 'integer',
      required:false
    },
    seller_id:{
      type: 'integer',
      required:false,
    },
    order_qty:{
      type: 'integer',
      required:false
    },
    product_id:{
      type: 'integer',
      required:false
    },
    user_address:{
      type: 'string',
      required:false,
    },
    order_total:{
      type: 'integer',
      required:false
    },
    status: {
      type: 'string',
      required:false
    }
  },
  datastore: 'mysqlServer',
  tableName: 'Orders'
};

