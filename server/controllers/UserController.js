var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Clothing = require('../models/Clothing');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');


router.use(bodyParser.urlencoded({extended: true}));

// if someone makes a GET request to users/register, render register.hbs
router.get('/register', function(request, response){
  response.render('register');
});

// GET request to users/ responds with a json of all the users
router.get('/', function(request, response){
  User.find(function(error, users){
    response.json(users);
  });











});




router.post('/', function(request, response){
  bcrypt.hash(request.body.password, 10, function(error, hash){
    // create a new user using the User constructor and the info from the form
    var user = new User({email: request.body.email,
                        password: hash,
                        name: request.body.name,
                        image: request.body.image,
                      });
    user.save();
    request.session.loggedIn = true;
    // redirect user to the homepage which displays all the clothes, for full GET request goto Clothing controller
    response.redirect('/clothes/view');
  });
});



// if someone makes a GET request to users/login, render login.hbs
router.get('/login', function(request, response){
  response.render('login');
});


// if someone makes a POST request to users/login (aka clicks the submit button on the login page)
router.post('/login', function(request, response){
  User.findOne({email: request.body.email}, function(err, user){
    // if the users email is in the database
    if(user){
      //check to see if password is correct
      bcrypt.compare(request.body.password, user.password, function(error, match){
        if(match === true){
          // if the password is correct set session loggedIn to true and redirect to the page which displays all clothes
          request.session.loggedIn = true;
          request.session.userId = user.id;
          response.redirect('/clothes/view');
        }
        else {
          //if the password isnt correct, redirect to the login page again
          response.redirect('/users/login');
        }
    });
  }
    // if the user is not in the database
    else {
      // redirect the user back to the login page
      response.redirect('/users/login');
    }
  });
});


// someone makes a GET request to users/logout, from logout button
router.get('/logout', function(request, response){
  request.session.loggedIn = false;
  response.redirect('/users/login');
});


// a GET request to /users/:id, aka a specific user
router.get('/view/:id', function(request, response){
  var id = request.params.id;
  User.findById(id).populate('clothes').exec(function(error, user){
    console.log(user)
    response.render('profile', user);
  })
})





router.get('/:id', function(request, response) {
  var id = request.params.id;
  User.findById(id, function(error, user){
    response.json(user);
  })
})



module.exports = router;
