//对应blog_topics集合

// 加载数据库配置文件

var mongoose = require('../config/db_config');

// 创建骨架
var topicSchema = new mongoose.Schema({
	// 标题
	tName : {
		type : String
	},
	// 内容
	tContent : {
		type : String
	},
	// 作者  关联数据库
	user:{
		type:'objectId',
		// ref 表示关联，
		ref : 'bbs_user'
	},
	//分类  关联数据库
	cid:{
		type:'ObjectId',
		ref : 'bbs_cate'
	},
	//浏览次数
	visitNum:{
		type:Number,
		default:0
	},
	// 是否显示轮播图
	isshow : {
		type : Number,
		default : 0
	},
	// 是否置顶
	top : {
		type : Number,
		default : 0
	},
	// 发布系统时间
	createTime : {
		type : Date,
		default : Date.now
	},
	//发布时间
	time : {
		type : String,
	},
	// 文章简介
	tj : {
		type : String
	},
	// 文章标签
	tag : {
		type : String
	},
	// 图片
	img : {
		type : String,
		default : 'null'
	},
	// 音乐
	mp3 : {
		type : String
	}


});

//生成对应集合的模型

var topicModel = mongoose.model('bbs_topic',topicSchema);

// 向外暴漏
module.exports = topicModel;
