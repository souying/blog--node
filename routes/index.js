//只负责路由中转

var express = require('express');
var router = express.Router();

// 加载usercontroller控制器
var index = require('../controllers/indexController');

//前台首页
router.get('/',index.index);

//网站初始化
router.get('/install',index.install);

//网站处理初始化数据
router.post('/addweb',index.addWeb);

//网站留言路由 功能用多说的

router.get('/words',index.words);


module.exports = router;