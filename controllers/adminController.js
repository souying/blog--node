// 专门争对admin控制器
// 加载对应的模型
var cateModel = require('../models/cateModel');
// 加载对应的网站管理模型
var webModel = require('../models/webModel');
// 加载对应的网站用户模型
var userModel = require('../models/userModel');
// 加载对应的网站友情链接模型
var kindModel = require('../models/kindModel');
// 加载加密模块
var crypto = require('../middlewares/crypto');
// 加载邮箱配置
var sendMail = require('../config/mail');
// 加载eventProxy
var eventproxy = require('eventproxy');
var ep = new eventproxy();
// 定义admin对象
var admin ={};
// 定义方法

// 首页
admin.index = function(req,res){
	// 响应首页模板
	res.render('admin/index');
};
// 后台播放器页
admin.plyr = function(req,res){
	// 响应播放器模板
	res.render('admin/plyr');
};
// 后台音乐页
admin.music = function(req,res){
	// 响应音乐模板
	res.render('admin/music');
};
// 后台邮件发布页
admin.email = function(req,res){
	// 响应邮件发布页模板
	res.render('admin/email');
};
//后台邮箱数据处理
admin.doEmail = function(req,res){
	// 获取数据
	var port = req.body.email_port;
	var title = req.body.email_title;
	var content = req.body.email_content;
	//console.log(port);
	// 邮箱发送
	sendMail(port,title,content);
	req.flash('errMsg','发送成功了,请到邮箱收件箱或垃圾箱激活登录');
	//发送成功了 返回邮件页
	res.redirect('back');
	
};
// 后台个人资料页
admin.personal = function(req,res){
	// 响应文章发布页模板
	ep.all('userData',function(userData){
		// 关联查询 -- 以设置user(存储是用户的_id)
		// console.log(111);
		// console.log(topicData[0].user.uname);

		// 分配数据
		var data = {
			userData:userData
		}

		// 响应数据// 响应网站管理页模板
		res.render('admin/personal',data);
	});
	// 查询条件
	var con = {
		userMa:'gujianwen@aliyun.com'
	};
	//console.log(con)
	// 查询分类
	userModel.findOne(con,function(err,userData){
		//console.log(webData);
		ep.emit('userData',userData);
	});

};
//后台个人资料数据处理；
admin.userEd = function(req,res){
	// 获取表单数据 查询条件
	var con = req.body.userMa;
	//console.log(con);
	var newData = {
		uname: req.body.uname,
  		userName: req.body.userName,
  		email: req.body.email,
  		qq: req.body.qq,
  		des: req.body.des
	};
	//console.log(newData);
	// 后台网站信息更新
	userModel.update(con,{$set:newData},function(err){
		if(err){
			req.flash('errMsg','操作错误,请稍后重试');
			res.redirect('back');
			return;
		}else{
			req.flash('errMsg','修改成功');
			res.redirect('back');
		}
	});
};
// 后台密码修改页
admin.mi = function(req,res){
	// 响应密码模板
	res.render('admin/mi');

};
// 后台修改密码数据处理
admin.miEd = function(req,res){
	// 设置更新条件
	var con = {
		userMa:'gujianwen@aliyun.com'
	};
	// 获取表单提交的数据
	// 验证两次密码输入一样不一样
	if(req.body.upwd!=req.body.reupwd){
		req.flash('errMsg','两次密码输入不一致');
		res.redirect('back');
		return;
	}else{
		// 获取密码
		var newData = {
			upwd:crypto(req.body.upwd)
		};
		// 更新密码数据
		userModel.update(con,{$set:newData},function(err){
			if(err){
				req.flash('errMsg','操作错误,请稍后重试');
				res.redirect('back');
				return;
			}else{
				// session设置为null
				req.session.user==null;
				req.flash('errMsg','修改成功请退出重新登录');
				res.redirect('back');
			}
		});
	}

};
// 后台网站管理页
admin.web = function(req,res){
	// 监听数据
	ep.all('webData',function(webData){
		// 关联查询 -- 以设置user(存储是用户的_id)
		// console.log(111);
		// console.log(topicData[0].user.uname);

		// 分配数据
		var data = {
			webData:webData
		}

		// 响应数据// 响应网站管理页模板
		res.render('admin/web',data);
	});
	// 查询条件
	var con = {
		webMa:'gujianwenboke'
	};
	// console.log(con)
	// 查询分类
	webModel.findOne(con,function(err,webData){
		// console.log(webData);
		ep.emit('webData',webData);
	});

};
// 后台修改网站信息数据处理
admin.webEd = function(req,res){
	// 获取查询信息
	var webma = req.body.webma;
	// console.log(webma);
	// 更新的数据
	var newData = {
		webName:req.body.webName,
		webKey:req.body.webKey,
		webDes:req.body.webDes,
		webUrl:req.body.webUrl,
		webLogo:req.body.webLogo,
		webEmail:req.body.webEmail,
		webBeian:req.body.webBeian
	};
	// 后台网站信息更新
	webModel.update(webma,{$set:newData},function(err){
		if(err){
			req.flash('errMsg','操作错误,请稍后重试');
			res.redirect('back');
			return;
		}else{
			req.flash('errMsg','修改成功');
			res.redirect('back');
		}
	});

};
// 后台修改网站高级权限数据处理
admin.isWeb = function(req,res){
	// 获取查询信息
	var webma = req.body.webMa;
	//console.log(webma);
	// 更新的数据
	var newData = {
		isWeb:req.body.isWeb,
		isReg:req.body.isReg
	};
	// 后台网站信息更新
	webModel.update(webma,{$set:newData},function(err){
		if(err){
			req.flash('errMsg','操作错误,请稍后重试');
			res.redirect('back');
			return;
		}else{
			req.flash('errMsg','修改成功');
			res.redirect('back');
		}
	});
};
// 后台用户管理页
admin.user = function(req,res){
	// 响应用户管理页模板
	res.render('admin/user');
};
// 后台添加文章分类页
admin.addCate = function(req,res){
	// 响应添加文章分类模板
	res.render('admin/addCate');
};
// 后台添加文章分类数据---处理
admin.doAddCate = function(req,res){
	// 获取表单提交的数据

	var con = req.body;
	//console.log(con);
	//添加数据
	cateModel.create(con,function(err){
		if(err){
			console.log(err);
			return;
		}else{
			//注册成功了 返回注册页
			req.flash('errMsg','操作成功了骚年...');
			res.redirect('back');
		};

	});
};
// 后台编辑文章分类页
admin.cateEditor = function(req,res){
	// 获取id
	var cate = {
		_id:req.query._id
	}
	// 查询话题
	cateModel.findOne(cate,function(err,cateData){
		res.render('admin/cateEditor',{cateData:cateData});
	});
};
//后台编辑文章分类数据处理
admin.docateEditor = function(req,res){
	//获取条件
	var id = {
		_id:req.body._id
	};
	//console.log(id);
	var newData ={
		cateName:req.body.cateName,
		cate_top:req.body.cate_top
	};
	cateModel.update(id,{$set:newData},function(err){
		if(err){
			req.flash('errMsg','操作错误,请稍后重试');
			res.redirect('back');
			return;
		}else{
			req.flash('errMsg','修改成功');
			res.redirect('back');
		}
	});
};

// 后台添加文章分类查看页
admin.cate = function(req,res){
	// 响应添加文章分类查看模板
	cateModel.find(function(err,cateData){
		//console.log(cateData)
		var data = {
			cateData:cateData
		}
		res.render('admin/cate',data);
	});

};
// 后台操作成功页面
admin.success = function(req,res){
	// 响应添加文章分类模板
	res.render('admin/success');
};
// 后台添加友情链接页面
admin.addKied = function(req,res){
	// 响应添加友情链接模板
	res.render('admin/addkied');
};
// 后台添加友情链接数据处理
admin.doAddkied = function(req,res){
	var data = req.body;
	//console.log(data);
	kindModel.create(data,function(err){
		if(err){
			return;
		}else{
			//添加成功了 返回添加页
			req.flash('errMsg','添加成功了骚年...');
			res.redirect('back');
		};
	});
};
//后台友情链接管理页
admin.showKied = function(req,res){
	// 监听数据
	ep.all('kindData',function(kindData){
		// console.log(111);
		//console.log(kindData)
		if(kindData==undefined){
			// 分配数据
			var data = {
				kindData:kindData,
				isshow:1
			};
		}else{
			// 分配数据
			var data = {
				kindData:kindData,
				isshow:0
			};
		};

		// 响应友情链接列表模板
		res.render('admin/showkied',data);
	});
	// 查询所有友情链接
	kindModel.find().sort({web_top:-1}).exec(function(err,kindData){
		//console.log(kindData);
		ep.emit('kindData',kindData);
	});
	
};

// 后台编辑友情链接处理数据
admin.kindEd = function(req,res){
	// 获取地址栏中的id
	var con = {
		_id:req.query._id
	};
	//console.log(con);
	// 监听数据
	ep.all('kindData',function(kindData){
		// console.log(111);
		//console.log(kindData)
			// 分配数据
			var data = {
				kindData:kindData
			};
		

		// 响应友情链接列表模板
		res.render('admin/kinded',data);
	});
	// 查询所有友情链接
	kindModel.findOne(con).exec(function(err,kindData){
		//console.log(kindData);
		ep.emit('kindData',kindData);
	});
};

// 后台编辑友情链接数据处理
admin.doKinded = function(req,res){
	// 获取数据
	var con ={
		_id:req.body._id
	};
	//console.log(con)
	//console.log(req.body)
	var newData = {
		webName: req.body.webName,
		webUrl: req.body.webUrl,
		email: req.body.email,
		webContent: req.body.webContent,
		web_top: req.body.web_top,
		webpic: req.body.webpic 
	};
	// 更新数据
	kindModel.update(con,{$set:newData},function(err){
		if(err){
			req.flash('errMsg','操作错误,请稍后重试');
			res.redirect('back');
			return;
		}else{
			req.flash('errMsg','修改成功');
			res.redirect('back');
		}
	});

};

admin.removeKind = function(req,res){
	// 获取地址栏的id
	var con = {
		_id:req.query._id
	};
	//console.log(con);
	// 删除数据
	kindModel.remove(con,function(err){
		if(err){
			return;
		}else{
			// 删除完跳回列表页
			res.redirect('/admin/showkied');
		};
	});

};

// 将对象暴露
module.exports = admin;