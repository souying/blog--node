//只负责路由中转

var express = require('express');
var router = express.Router();

// 加载usercontroller控制器
var details = require('../controllers/detailsController');


// 读取该文章的信息
router.get('/:id',details.details);


module.exports = router;