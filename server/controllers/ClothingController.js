var express = require('express');
var router = express.Router();
var Clothing = require('../models/Clothing');
var User = require('../models/User');
var bodyParser = require('body-parser');
var session = require('express-session');


router.use(bodyParser.urlencoded({extended: true}));

// if there is a request to /clothes/view
router.get('/view', function(request, response){
  Clothing.find(function(error, clothes){
    if(request.session.loggedIn === true){
      var myClothes = {allClothes: clothes, loggedIn: true, userId: request.session.userId};
      response.render('clothes', myClothes)
    }
    else {
      // goto the User controller to this full GET request
      response.redirect('/users/login')
    }
  })
})


router.get('/', function(request, response){
  Clothing.find(function(error, clothes){
    response.json(clothes);
  });
})


router.post('/', function(request, response){
  var clothingType = request.body.type;
  var clothingBrand = request.body.brand;
  var clothingSize = request.body.size;
  var clothingColor = request.body.color;
  var clothingImage = request.body.image;
  var clothingOwner = request.body.userId;
  var clothing = new Clothing({type: clothingType,
                              brand: clothingBrand,
                              size: clothingSize,
                              color: clothingColor,
                              image: clothingImage,
                              owner: clothingOwner
                            });
  clothing.save();
  User.findById(request.body.userId, function(error, user){
    var clothingId = clothing.id;
    user.clothes.push(clothingId);
    user.save();
    response.redirect(request.get('referer'));
  })
})


router.delete('/:id', function(request, response){
  var id = request.params.id;
  Clothing.findById(id, function(error, clothing){
    clothing.remove();
    response.json("success");
  })
})



module.exports = router;
