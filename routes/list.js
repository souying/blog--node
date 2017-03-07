//只负责路由中转

var express = require('express');
var router = express.Router();

// 加载usercontroller控制器
var list = require('../controllers/listController');

//前台列表页
router.get('/',list.list);

//前台搜索列表页
router.get('/search',list.search);

//前台标签页
router.get('/tag',list.tag);

module.exports = router;