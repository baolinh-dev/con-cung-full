const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose'); 
const Account = require('../models/Account');
const Order = require('../models/Order')  
const Product = require('../models/Product');  
const { account } = require('./AdminController');
class OrderController {  
    cartList(req, res, next) {   
        var carts = req.session.cart 
        var name = req.cookies.name   
        var avatar = req.cookies.avatar   
        var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            } 
        Account.findOne({"name" : name}) 
            .then((accounts) => {  
                res.render('cart', { 
                    name, avatar, quantityCart, carts,  
                    accounts: mongooseToObject(accounts)
                })   
            }) 
    }
    // [POST] cart/:slug
    addCart(req, res, next) {   
        var slug = req.params.slug 
        Product.findOne({slug : slug}) 
            .then((products) => { 
                if(typeof req.session.cart == "undefined") { 
                    req.session.cart = []; 
                    req.session.cart.push({ 
                        title: slug, 
                        quantity: 1, 
                        name: products.name, 
                        price: products.price, 
                        image: products.image, 
                    })
                } else { 
                    var cart = req.session.cart; 
                    var newItem = true; 

                    for(var i = 0; i < cart.length; i++) { 
                        if(cart[i].title == slug) { 
                            cart[i].quantity++; 
                            newItem = false; 
                            break;
                        }
                    } 
                    if(newItem) { 
                        cart.push({ 
                            title: slug, 
                            quantity: 1, 
                            name: products.name, 
                            price: products.price, 
                            image: products.image, 
                        })
                    }
                }     
                var name = req.cookies.name   
                var avatar = req.cookies.avatar
                var quantityCart = req.session.cart.length 
                Product.find({ category: 'Tra-hoa-qua' }).exec() 
                        .then((products) => {   
                            res.render('menu', {  
                                name,  
                                avatar, 
                                quantityCart,   
                                products: mutipleMongooseToObject(products),
                            })
                        }) 
                        console.log(req.session.cart)
            })  
            .catch(next)
    }   
    // [POST] /cart/list
    saveCartList(req, res, next) { 
        const order = new Order(req.body);
            order
                .save()  
                .then((data) => {  
                    req.session.orderId = data._id
                    res.redirect('/cart/detail')
                })
                .catch(next);
    }
    cartDetail(req, res, next) {   
        Order.findById(req.session.orderId) 
        .then((orders) => { 
            res.render('cart/cartDetail', {   
                layout: false, 
                orders: mongooseToObject(orders)
            }) 
        })
        req.session.destroy();
    }
    
} 
module.exports = new OrderController;