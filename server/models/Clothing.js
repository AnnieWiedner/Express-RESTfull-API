var mongoose = require('mongoose');

var ClothingSchema = new mongoose.Schema({
  type: String,
  brand: String,
  size: String,
  color: String,
  image: String,
  available: Boolean,
  owner: String
});




var clothingModel = mongoose.model('Clothing', ClothingSchema);
module.exports = clothingModel;
