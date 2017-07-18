var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  image: String,
  clothes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'}],
});

var userModel = mongoose.model('User', UserSchema);
module.exports = userModel;
