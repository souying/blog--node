// 专门争对user控制器
// 加载对应的模型
var userModel = require('../models/userModel');
// 加载加密模块
var crypto = require('../middlewares/crypto');
// 定义user对象
var user ={};
// 定义方法
// 注册
user.reg = function(req,res){
	// 响应注册模板
	res.render('home/reg');
};

// 处理注册数据
user.doReg = function(req,res){
	userModel.find(function(err,data){
		if(err){
			return;
		}else{
			console.log(data.length);
			if(data.length==0){
				// 接收数据  --加入到数据库
				// 获取表单提交的数据
				var email = req.body.email.trim();
				var upwd = req.body.upwd.trim();
				var reupwd = req.body.reupwd.trim();
				//console.log(crypto(upwd));
				if(upwd!=reupwd){
					//提示错误信息
					req.flash('errMsg','两次密码输入不一致...');
					//跳转当前页面  注册页
					res.redirect('/user/reg');
					//终止程序
					return;
				};
				// 邮箱查询条件
				var em ={
					email:email
				};
				// 以email为条件查询数据库验证邮箱是否注册
				userModel.findOne(em,function(err,data){
					if(err){
						console.log(err);
						return;
					};
					if(data){
						// 如果data存在提示错误  终止程序
						req.flash('errMsg','此邮箱已被注册.....')
						res.redirect('/user/reg');
						return;
					}else{
						var newData = {
								uname:'请设置用户名',
								upwd:crypto(upwd),
								//约定  最后一次登录就是注册的时间
								lastLogin : new Date(),
								email:email,
							};
							//添加数据
							userModel.create(newData,function(err){
								if(err){
									//有错误
									console.log(err);
									req.flash('errMsg','数据异常,请重新尝试');
									res.redirect('/user/reg');
									return;
								}else{
									//注册成功了 返回注册页
									req.flash('errMsg','注册成功了骚年...');
									res.redirect('back');
								}
							});
					}

				});

			}else{
				//提示错误信息
				req.flash('errMsg','管理员关闭了注册功能...');
				//跳转当前页面  注册页
				res.redirect('/user/reg');
				//终止程序
				return;
			}
		}
	});
	
};

// 登录
user.login = function(req,res){
	// 响应登录模板
	res.render('home/login');
};
// 处理登录的数据
user.dologin = function(req,res){
	// 获取表单提交的数据
	var email = req.body.email.trim();
	var upwd = req.body.upwd.trim();
	// 定义查询数据的用户
	var con = {
		email:email,
		upwd:crypto(upwd)
	};
	console.log(con);
	userModel.findOne(con,function(err,data){
		if(err){
			console.log(err);
			return;
		};
		if(!data){
			//错误信息
			req.flash('errMsg','帐号或密码错误请重新登录');
			// 跳转登录页面
			res.redirect('/user/login');
			// 终止程序
			return;
		}else{
			// 将data存在session中
			req.session.user = data;
			//console.log(req.session.user)
			// data存在跳转首页
			res.redirect('/admin');
		}
	});
};
// 登出操作
user.doLogout = function(req,res){
	//设置session为null
	req.session.user = null;
	// 跳转首页
	res.redirect('/');
};

// 将对象暴露
module.exports = user;
