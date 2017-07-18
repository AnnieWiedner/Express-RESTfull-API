// pull in mongoose
var mongoose = require('mongoose');

// define a path to the database and name database
var connectionString = 'mongodb://localhost/borrowclothing';

// tells mongoose the path to the database
mongoose.connect(connectionString);

// debugging below
mongoose.connection.on('connected', function(){
  console.log('connected to' + connectionString);
});
mongoose.connection.on('error', function(error){
  console.log('mongodb error ' + error );
});
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected from' + connectionString);
});
