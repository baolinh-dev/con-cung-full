const Account = require('../src/app/models/Account')    
const Product = require('../src/app/models/Product')   
const Comment = require('../src/app/models/Comment') 
const Feedback = require('../src/app/models/Feedback') 
const { mongooseToObject } = require('../src/util/mogoose');
const { mutipleMongooseToObject } = require('../src/util/mogoose'); 
const { engine } = require('express-handlebars'); 
const express = require('express')  
const morgan = require('morgan')  
const methodOverride = require('method-override');   
const cookieParser = require('cookie-parser')  
const session = require('express-session') 
const jwt = require('jsonwebtoken') 
const path = require('path');
const app = express()
const port = 3000     
// Session
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true,
})) 
// Cookies 
app.use(cookieParser())
// file co ten index thi khong can nap vao
const route = require('./routes') 
// Connect to DB 
const db = require('./config/db'); 
const { time } = require('console');
const Order = require('./app/models/Order');
db.connect() 
// Fix body POST method 
app.use(express.urlencoded({ 
  extended: true
})); 
app.use(express.json());  
// Method Override 
app.use(methodOverride('_method'))
// Static file localhost:3000 -> public  
// public -> Domain name -> public/img/logo.png === Domain name/img/logo.png
app.use(express.static(path.join(__dirname, 'public')))
// HTTP logger resquest
app.use(morgan('combined')) 
// HandleBars 
app.engine('handlebars', engine()); 
app.engine('.hbs', engine( 
  { 
    extname: '.hbs', 
    helpers: {
      sum(a, b) { return a + b },  
      times: function(n, block) { 
        var accum = '';
        for(var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
      }
  } 
  }
));  
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'resources', 'views'));   
// Route Init  
route(app)       
// Test Session
app.get('/set_session', (req, res) => {
    //set a object to session
    if(req.session.orderId) { 
      res.json(req.session.orderId)
    }
})
// 
app.get('*', (req, res, next) => { 
  res.locals.cart = req.session.cart
  next()
})  
// Test My Order
 app.get('/my-order', (req, res, next) => {   
  var name = req.cookies.name
  var avatar = req.cookies.avatar  
  var quantityCart
    if(typeof req.session.cart == "undefined") { 
        quantityCart = 0
    } else { 
        quantityCart = req.session.cart.length
    } 
  Order.find({name}) 
    .then(orders => {  
      res.render('cart/myOrder', { 
        orders: mutipleMongooseToObject(orders), 
        name, avatar, quantityCart
      })
    })
 })
// 404 Not Found 
app.use((req, res) => { 
  return res.render('sites/404', { 
    layout: false
  })
})


// Nhận vào cổng PORT và chạy app    
app.listen(port, () => {
  console.log(`Example app listening on port ${port} http://localhost:${port}`)
})  

