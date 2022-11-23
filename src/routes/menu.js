const express = require('express');
const router = express.Router();
const menuController = require('../app/controllers/MenuController');

router.get('/', menuController.index); 
router.get('/continue', menuController.continue); 
router.get('/ao-quan-be-trai', menuController.trahoaqua);  
router.get('/ao-quan-be-gai', menuController.smoothies); 
router.get('/sua', menuController.caphe); 
router.get('/phu-kien', menuController.banhngot);  
// Detail products
router.get('/:slug', menuController.jumpsuitHan);   
router.get('/:slug/cart', menuController.menuAddCart);   
router.post('/comment-detail', menuController.commentDetail);  

module.exports = router;
