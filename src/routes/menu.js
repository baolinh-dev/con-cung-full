const express = require('express');
const router = express.Router();
const menuController = require('../app/controllers/MenuController');

router.get('/', menuController.index); 
router.get('/continue', menuController.continue); 
router.get('/tra-hoa-qua', menuController.trahoaqua);  
router.get('/smoothies', menuController.smoothies); 
router.get('/ca-phe', menuController.caphe); 
router.get('/banh-ngot', menuController.banhngot);  
// Detail products
router.get('/:slug', menuController.jumpsuitHan);   
router.post('/jumpsuit-han', menuController.jumpsuitHanComment);  

module.exports = router;
