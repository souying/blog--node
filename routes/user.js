//只负责路由中转

var express = require('express');
var router = express.Router();

// 加载usercontroller控制器
var user = require('../controllers/userController');
/* 注册路由 --匿名函数交给 userController.js处理 */ 
router.get('/reg',user.reg);
// 处理注册的数据
router.post('/doReg',user.doReg);
// 登录路由
router.get('/login',user.login);
// 处理登录的数据
router.post('/dologin',user.dologin);
// 处理退出用户的数据
router.post('/dologout',user.doLogout);
module.exports = router;
