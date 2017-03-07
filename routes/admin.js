//只负责路由中转

var express = require('express');
var router = express.Router();

// 加载usercontroller控制器
var admin = require('../controllers/adminController');
/* 后台首页路由 --匿名函数交给 adminController.js处理 */ 
router.get('/admin',admin.index);
// 后台播放页
router.get('/admin/plyr',admin.plyr);
// 后台音乐页
router.get('/admin/music',admin.music);
// 后台邮箱发布页
router.get('/admin/email',admin.email);
// 后台邮箱数据处理
router.post('/admin/doEmail',admin.doEmail);
// 后台个人资料页
router.get('/admin/personal',admin.personal);
// 后台个人资料页数据处理
router.post('/admin/usered',admin.userEd);
// 后台密码修改页
router.get('/admin/mi',admin.mi);
// 后台密码修改数据处理
router.post('/admin/miEd',admin.miEd);
// 后台站点管理页
router.get('/admin/web',admin.web);
// 后台站点管理页数据处理
router.post('/admin/webEd',admin.webEd);
// 后台站点高级管理数据处理
router.post('/admin/isWeb',admin.isWeb);
// 后台用户管理页
router.get('/admin/user',admin.user);
// 后台添加文章分类页
router.get('/admin/addCate',admin.addCate);
// 后台添加文章分类数据---处理
router.post('/admin/doAddCate',admin.doAddCate);
// 后台编辑文章分类页
router.get('/admin/cateEditor',admin.cateEditor);
//后台编辑文章分类数据处理
router.post('/admin/docateEditor',admin.docateEditor);
// 后台查看文章分类数据页面
router.get('/admin/cate',admin.cate);
//后台操作成功页面
router.get('/admin/success',admin.success);
// 后台添加友情链接管理页面
router.get('/admin/addkied',admin.addKied);
// 后台添加友情链接管理数据处理
router.post('/admin/doaddkied',admin.doAddkied);
// 后台友情链接列表管理页面
router.get('/admin/showkied',admin.showKied);
// 后台友情链接编辑页面
router.get('/admin/kinded',admin.kindEd);
// 后台友情链接编辑数据处理
router.post('/admin/dokinded',admin.doKinded);
// 后台友情链接删除数据处理
router.get('/admin/removekind',admin.removeKind);

module.exports = router;
