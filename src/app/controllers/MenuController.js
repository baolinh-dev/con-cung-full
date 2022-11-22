const Product = require('../models/Product')  
const Comment = require('../models/Comment')  
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mogoose')  
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken') 
const { create } = require('../models/Account')
const PAGE_SIZE = 8
class MenuController { 
    // [GET] /menu
    index(req, res, next) {     
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
                var page = parseInt(req.query.page); 
                if (page) {  
                    // Get Page bằng pagination 
                    var soLuongBoQua = (page - 1) * PAGE_SIZE  
                    Product.find({}).skip(soLuongBoQua).limit(PAGE_SIZE) 
                    .then((products) => { 
                        Product.countDocuments({}).then((total)=>{  
                            var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                            res.render('menu', {   
                                avatar, name, tongSoPage, 
                                quantityCart,
                                products: mutipleMongooseToObject(products),
                            });
                        })
                    }) 
                    .catch(next);
                } else {  
                    // Get ALL
                    Product.find({}).exec() 
                        .then((products) => {   
                            Product.countDocuments({}).then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('menu', {   
                                    avatar,  
                                    name, 
                                    tongSoPage,  
                                    quantityCart,
                                    products: mutipleMongooseToObject(products),
                                });
                            })
                        })
                        .catch(next);
                }
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    }   
     // [GET] /menu/tra-hoa-qua
    trahoaqua(req, res, next) {    
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
                var page = parseInt(req.query.page); 
                if (page) {  
                    // Get Page bằng pagination 
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                    Product.find({ category: 'Áo quần bé trai' }) 
                        .skip(soLuongBoQua) 
                        .limit(PAGE_SIZE) 
                        .then((productsTraHoaQua) => { 
                            Product.countDocuments({category: 'Áo quần bé trai'}) 
                                .then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE)  
                                res.render('productDetails/trahoaqua', {  
                                    avatar, 
                                    name, 
                                    tongSoPage,  
                                    quantityCart,
                                    productsTraHoaQua: mutipleMongooseToObject(productsTraHoaQua),
                                });
                            })
                        })
                        .catch(next); 
                } else { 
                // Get All 
                Product.find({ category: 'Áo quần bé trai' }).exec()
                    .then((productsTraHoaQua) => {   
                        Product.find({ category: 'Áo quần bé trai' }).countDocuments({}) 
                        .then((total)=>{  
                            var tongSoPage = Math.ceil(total / PAGE_SIZE)  
                            res.render('productDetails/trahoaqua', {   
                                avatar,  
                                name, 
                                tongSoPage,  
                                quantityCart,
                                productsTraHoaQua: mutipleMongooseToObject(productsTraHoaQua),
                            });
                        })
                    })
                    .catch(next);
                }
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    }   
    // [GET] /menu/jumpsuitHan
    jumpsuitHan(req, res, next) {  
        var name = req.cookies.name  
        var avatar = req.cookies.avatar 
        var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            }   
        Promise.all([Product.find({slug: req.params.slug}), Comment.find({})])
            .then(([products, comments]) => {  
                var slug = req.params.slug
                var nameProduct = products[0].name
                var priceProduct = products[0].price
                var imageProduct = products[0].image
                res.render(`detail/detailProduct`, {  
                    name, avatar, quantityCart, slug,
                    nameProduct, priceProduct, imageProduct,
                    comments: mutipleMongooseToObject(comments)
                })
            })
            .catch(next)
    } 
    commentDetail(req, res, next) {    
        var name = req.cookies.name  
        var avatar = req.cookies.avatar   
        var comment = req.body.comment  
        
        Comment.create( 
            { name: name, avatar: avatar, comment: comment},  
        );     
        res.redirect('back')
    }
     // [GET] /menu/smoothies 
    smoothies(req, res, next) {    
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
                var page = parseInt(req.query.page); 
                if (page) {  
                    // Get Page bằng pagination 
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                    Product.find({ category: 'Áo quần bé gái' }) 
                        .skip(soLuongBoQua) 
                        .limit(PAGE_SIZE) 
                        .then((productsSmoothies) => {  
                            Product.countDocuments({category: 'Áo quần bé gái'}).then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/smoothies', {   
                                    avatar, 
                                    name,
                                    tongSoPage, 
                                    quantityCart,
                                    productsSmoothies: mutipleMongooseToObject(productsSmoothies),
                                });
                            })
                        })
                        .catch(next); 
                } else {  
                    // Get All
                    Product.find({ category: 'Áo quần bé gái' }).exec()
                        .then((productsSmoothies) => {   
                            Product.find({ category: 'Áo quần bé gái' }).countDocuments({}) 
                            .then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/smoothies', {   
                                    avatar, 
                                    name,
                                    tongSoPage,  
                                    quantityCart,
                                    productsSmoothies: mutipleMongooseToObject(productsSmoothies),
                                });
                            })
                        })
                        .catch(next);
                } 
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    }
     // [GET] /menu/ca-phe 
    caphe(req, res, next) {  
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
                var page = parseInt(req.query.page); 
                if (page) {  
                    // Get Page bằng pagination 
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                    Product.find({ category: 'Sữa, đồ ăn dặm' }) 
                        .skip(soLuongBoQua) 
                        .limit(PAGE_SIZE) 
                        .then((productsCaphe) => { 
                            Product.countDocuments({category: 'Sữa, đồ ăn dặm'}).then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/caphe', {   
                                    avatar, 
                                    name,
                                    tongSoPage, 
                                    quantityCart,
                                    productsCaphe: mutipleMongooseToObject(productsCaphe),
                                });
                            })
                        })
                        .catch(next); 
                } else { 
                // Get All
                    Product.find({ category: 'Sữa, đồ ăn dặm' }).exec()
                        .then((productsCaphe) => {   
                            Product.find({ category: 'Sữa, đồ ăn dặm' }).countDocuments({}) 
                            .then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/caphe', {   
                                    avatar, 
                                    name,
                                    tongSoPage,  
                                    quantityCart,
                                    productsCaphe: mutipleMongooseToObject(productsCaphe),
                                });
                            })
                        })
                        .catch(next);
                }
            } 
        } catch (error) {
            res.redirect('/account/login')
        }  
    }  
    // [GET] /menu/banh-ngot
    banhngot(req, res, next) {    
        try {            
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')  
            if(ketqua) {  
                var name = req.cookies.name 
                var avatar = req.cookies.avatar 
                var page = parseInt(req.query.page) 
                var quantityCart
                if(typeof req.session.cart == "undefined") { 
                    quantityCart = 0
                } else { 
                    quantityCart = req.session.cart.length
                }
                if (page) {  
                    // Get Page bằng pagination   
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                    Product.find({ category: 'Phụ kiện' }) 
                        .skip(soLuongBoQua) 
                        .limit(PAGE_SIZE) 
                        .then((productsBanhngot) => { 
                            Product.countDocuments({category: 'Phụ kiện'}).then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/banhngot', {   
                                    avatar, 
                                    name,
                                    tongSoPage, quantityCart,
                                    productsBanhngot: mutipleMongooseToObject(productsBanhngot),
                                });
                            })
                        })
                        .catch(next); 
                } else { 
                    // Get All
                    Product.find({ category: 'Phụ kiện' }).exec()
                        .then((productsBanhngot) => {   
                            Product.find({ category: 'Phụ kiện' }).countDocuments({}) 
                            .then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/banhngot', {   
                                    avatar,  
                                    name,
                                    tongSoPage, quantityCart, 
                                    productsBanhngot: mutipleMongooseToObject(productsBanhngot),
                                });
                            })
                        })
                        .catch(next);
                } 
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    }    
     // [GET] /menu/continue
    continue(req, res, next) {      
        req.session.destroy(); 
        res.redirect('/menu')
    }    
    // [GET] /menu/:slug/cart 
    menuAddCart(req, res, next) { 
        var slug = req.params.slug     
        var quantity = req.query.quantity
        var quantityNumber = Number(quantity)
        Product.findOne({slug})  
            .then((products) => { 
                if(typeof req.session.cart == "undefined") { 
                    req.session.cart = []; 
                    req.session.cart.push({ 
                        title: slug, 
                        quantity: quantityNumber, 
                        name: products.name, 
                        price: products.price, 
                        image: products.image, 
                    })
                } else { 
                    var cart = req.session.cart; 
                    var newItem = true; 

                    for(var i = 0; i < cart.length; i++) { 
                        if(cart[i].title == slug) { 
                            cart[i].quantity += quantityNumber; 
                            newItem = false; 
                            break;
                        }
                    } 
                    if(newItem) { 
                        cart.push({ 
                            title: slug, 
                            quantity: quantityNumber, 
                            name: products.name, 
                            price: products.price, 
                            image: products.image, 
                        })
                    }
                }   
                res.redirect('back')   
            })  
            .catch(next)

    }
} 
module.exports = new MenuController;