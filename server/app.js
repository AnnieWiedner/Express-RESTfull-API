var express = require('express')
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var session = require('express-session');
var Clothing = require('./models/Clothing.js');
var User = require('./models/User.js')
require('./db/db.js');

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

var ClothingController = require('./controllers/ClothingController.js');
var UserController = require('./controllers/UserController.js');

app.use('/clothes', ClothingController);
app.use('/users', UserController);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, function() {
  console.log("listening on port 3000");
});
