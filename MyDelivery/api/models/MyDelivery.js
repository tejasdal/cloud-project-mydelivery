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
    order_id: {
      type: 'number',
      required: true,
      unique: true
    },
    user_id: {
      type: 'number',
      required: false
    },
    seller_id: {
      type: 'number',
      required: false,
    },
    order_qty: {
      type: 'number',
      required: false
    },
    product_id: {
      type: 'number',
      required: false
    },
    user_address: {
      type: 'string',
      required: false,
    },
    order_total: {
      type: 'number',
      required: false
    },
    status: {
      type: 'string',
      required: false
    }
  },
  tableName: 'Orders'
};

