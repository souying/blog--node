// 加载数据库配置文件
var mongoose = require('../config/db_config');

//创建骨架
var webSchema = new mongoose.Schema({
	// 网站名字
	webName:{
		type:String
	},
	// 网站关键字
	webKey:{
		type:String
	},
	// 网站描述
	webDes:{
		type:String
	},
	// 网站url
	webUrl:{
		type:String
	},
	//网站logourl地址
	webLogo:{
		type:String
	},
	// 管理员邮箱
	webEmail:{
		type:String
	},
	// 网站备案信息
	webBeian:{
		type:String
	},
	//刚进网页判断进入初始化页面
	isActive:{
		type:Number,
		default:0
	},
	// 判断是否关闭注册
	isReg:{
		type:Number,
		default:0
	},
	// 网站维护页面
	isWeb:{
		type:Number,
		default:0
	},
	// 网站总访问量
	webNumber:{
		type:Number,
		default:0
	},
	// 网站创建时间
	webTime:{
		type:Date,
		default:Date.now
	},
	// 网站状态码方便查询  不懂程序的切记不要改动
	webMa:{
		type:String,
		default:'gujianwenboke'
	}

});

//创建模型
var webModel = mongoose.model('bbs_web',webSchema);
//向外暴漏
module.exports = webModel;