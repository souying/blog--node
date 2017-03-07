//只负责路由中转

var express = require('express');
var router = express.Router();

// 加载topiccontroller控制器
var topic = require('../controllers/topicController');
/* 后台首页路由 --匿名函数交给 adminController.js处理 */
// 后台文章列表页
router.get('/blog',topic.blog);
// 后台文章文章详情页
router.get('/article',topic.article);
// 后台文章发布页
router.get('/markdown',topic.markdown);
// 后台文章发布数据处理
router.post('/addTopic',topic.addTopic);
// 后台文章编辑页面
router.get('/topicEd',topic.topicEd);
//后台文章编辑数据处理
router.post('/doTopiced',topic.doTopicEd);
// 后台删除文章数据处理
router.get('/removeTopic',topic.removeTopic);
module.exports = router;