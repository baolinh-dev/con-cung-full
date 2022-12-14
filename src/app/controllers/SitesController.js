
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken') 
const { mongooseToObject } = require('../../util/mogoose')
const Account = require('../models/Account')
const Feedback = require('../models/Feedback') 
class HomeController { 
    // [GET] sites/contact
    contact(req, res) {    
        try {   
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')    
            var quantityCart
                if(typeof req.session.cart == "undefined") { 
                    quantityCart = 0
                } else { 
                    quantityCart = req.session.cart.length
                }
            if(ketqua) {   
                var name = req.cookies.name 
                var avatar = req.cookies.avatar   
                Account.findOne({ name}) 
                    .then(accounts => {  
                        res.render('sites/contact',  
                            { avatar, name , quantityCart, 
                            accounts: mongooseToObject(accounts)})
                    })
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    } 
    // [GET] sites/news
    news(req, res) {    
        try {            
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')   
            var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            }
            if(ketqua) {  
                var name = req.cookies.name 
                var avatar = req.cookies.avatar 
                res.render('sites/news', { avatar, name , quantityCart})
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    } 
    // [GET] sites/introduce
    introduce(req, res) {    
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')   
            var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            }
            if(ketqua) {  
                var name = req.cookies.name 
                var avatar = req.cookies.avatar 
                res.render('sites/introduce', { avatar, name , quantityCart})
            }
        } catch (error) {
            res.redirect('/account/login')
        }
    }  
    // [POST] sites/postFeedback
    postFeedback(req, res) {  
        const feedback = new Feedback(req.body);
        feedback
            .save()  
            .then(() => res.redirect('/sites/contact'))
            .catch((error) => {});   
    }     
} 
module.exports = new HomeController;