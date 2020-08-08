module.exports = {
    attributes : {
    username:{
        type: 'integer',
        required:true,
        unique: true
      },
    password : {
        type: 'string',
        required: true
    }
 },
 datastore: 'mysqlServer',
 tableName: 'User'
};