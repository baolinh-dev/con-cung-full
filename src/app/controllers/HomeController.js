const Product = require('../models/Product') 
const { mutipleMongooseToObject } = require('../../util/mogoose') 
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken') 
const Account = require('../models/Account')
class HomeController { 
    // [GET] /
    index(req, res, next) { 
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')    
            var name = req.cookies.name   
            var avatar = req.cookies.avatar    
            var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            } 
            if(ketqua) {           
                Account.findById(ketqua._id)  
                    .then((accounts) => {  
                        if(accounts.role == 'user' || accounts.role == 'admin') {   
                            Promise.all([Product.find({ category: 'Áo quần bé trai' }).limit(8), 
                        Product.find({ category: 'Áo quần bé gái' }).limit(8),  
                        Product.find({ category: 'Sữa, đồ ăn dặm' }).limit(8),  
                        Product.find({ category: 'Phụ kiện' }).limit(8)])
                                .then(([productsA, productsB, productsC, productsD]) => { 
                                    res.render('sites/home', {   
                                        avatar, name, quantityCart,
                                        productsA: mutipleMongooseToObject(productsA), 
                                        productsB: mutipleMongooseToObject(productsB), 
                                        productsC: mutipleMongooseToObject(productsC), 
                                        productsD: mutipleMongooseToObject(productsD)
                                    });
                                })
                            .catch(next);
                        } 
                    }) 
            }  
        } catch (error) {
            res.redirect('/account/login')
        }
    } 
    // [GET] /ca-phe
    caphe(req, res, next) { 
        var name = req.cookies.name  
        var avatar = req.cookies.avatar   
        var quantityCart
        if(typeof req.session.cart == "undefined") { 
            quantityCart = 0
        } else { 
            quantityCart = req.session.cart.length
        }
        Product.find({ category: 'Cà phê' }) 
            .limit(4)
            .then((products) => {
                res.render('sites/home', {   
                    quantityCart, avatar, name,
                    products: mutipleMongooseToObject(products),
                });
            })
            .catch(next);
    } 
    // [GET] /smoothies
    smoothies(req, res, next) { 
        var name = req.cookies.name 
        var avatar = req.cookies.avatar  
        var quantityCart
        if(typeof req.session.cart == "undefined") { 
            quantityCart = 0
        } else { 
            quantityCart = req.session.cart.length
        }
        Product.find({ category: 'Smoothies' }) 
            .limit(4)
            .then((products) => {
                res.render('sites/home', {  
                    avatar, quantityCart, name,
                    products: mutipleMongooseToObject(products),
                });
            })
            .catch(next);
    } 
    // [GET] /banh-ngot
    banhngot(req, res, next) { 
        var name = req.cookies.name 
        var avatar = req.cookies.avatar  
        var quantityCart
        if(typeof req.session.cart == "undefined") { 
            quantityCart = 0
        } else { 
            quantityCart = req.session.cart.length
        }
        Product.find({ category: 'Bánh ngọt' }) 
            .limit(4)
            .then((products) => {
                res.render('sites/home', {   
                    avatar,  quantityCart, name,
                    products: mutipleMongooseToObject(products),
                });
            })
            .catch(next);
    } 
} 
module.exports = new HomeController;