// 专门争对index控制器
// 加载对应的网站管理模型
var webModel = require('../models/webModel');
// 加载对应的文章分类模型
var cateModel = require('../models/cateModel');
// 加载对应的文章模型
var topicModel = require('../models/topicModel');
// 加载对应的用户模型
var userModel = require('../models/userModel');
// 加载对应的友情链接模型
var kindModel = require('../models/kindModel');
// 加载eventProxy
var eventproxy = require('eventproxy');
var ep = new eventproxy();
// 定义index对象
var index ={};

// 前台首页控制
index.index = function(req,res){
	// // 查询web集合里有没有数据
	webModel.find(function(err,data){
		//console.log(data);
		if(err){
			return;
		}else{
			if(data.length==0){
				// 跳转网站设置信息页
				res.redirect('/install');
			}else{

				// 查询条件
				var web = {
					webMa:'gujianwenboke'
				};
				// 进来的时候就应该更新该网站的访问数量 -- 在原有的访问数量上+1
				webModel.update(web,{$inc:{webNumber:1}},function(err){
					// console.log(err);
				});
				// 监听数据
				ep.all('webData','cateData','topicData','topiclunData','topicnewData','userData','total','kindData',function(webData,cateData,topicData,topiclunData,topicnewData,userData,total,kindData){
					// 关联查询 -- 以设置user(存储是用户的_id)
					// console.log(111);
					// console.log(topicData[0].user.uname);
					// 判断有没有设置轮播的文章
					if(topiclunData.length==0){
						// 分配数据
						var data = {
							isshow:0,
							kind:0,
							webData:webData,
							cateData:cateData,
							topicData:topicData,
							topiclunData:topiclunData,
							topicnewData:topicnewData,
							userData:userData,
							total:total,
							kindData:kindData
						}
					}else{
						// 分配数据
						var data = {
							isshow:1,
							kind:1,
							webData:webData,
							cateData:cateData,
							topicData:topicData,
							topiclunData:topiclunData,
							topicnewData:topicnewData,
							userData:userData,
							total:total,
							kindData:kindData
						}
					}

					// 响应首页模板
					res.render('home/index',data);
				});
				// 查询条件
				var con = {
					webMa:'gujianwenboke'
				};
				// console.log(con)
				// 查询分类
				webModel.findOne(con,function(err,webData){
					//console.log(webData);
					ep.emit('webData',webData);
				});

				// end
				// 开始查询所有文章分类
				cateModel.find(function(err,cateData){
					//console.log(cateData);
					ep.emit('cateData',cateData);
				});
				// end
				// 查询所有的文章
				topicModel.find().limit(8).sort({createTime:-1}).populate('user','uname').populate('cid','cateName').exec(function(err,topicData){
					//console.log(topicData)
					ep.emit('topicData',topicData);
				});
				// end
				// 查询所有的轮播图文章
				var lun = {
					isshow:1
				}
				topicModel.find(lun).limit(5).sort({createTime:-1}).populate('user','uname').exec(function(err,topiclunData){
					//console.log(topiclunData)
					ep.emit('topiclunData',topiclunData);
				});
				// end
				// 查询最新的6条新文章
				topicModel.find().limit(6).sort({createTime:-1}).populate('user','name des').exec(function(err,topicnewData){
					//console.log(topicnewData)
					ep.emit('topicnewData',topicnewData);
				});
				// end
				// 查询用户信息
				userModel.findOne().exec(function(err,userData){
					//console.log(userData)
					ep.emit('userData',userData);
				});
				// end
				// 查询一共有几篇文章
				topicModel.find().count(function(err,total){
					ep.emit('total',total);
				});
				//end
				// end
				// 查询友情链接
				kindModel.find().sort({web_top:-1}).exec(function(err,kindData){
					//console.log(kindData)
					ep.emit('kindData',kindData);
				});

			};
		};
		
	});

};
// 前台网站初始化
index.install = function(req,res){
	// 响应首页模板
	res.render('home/install');
};
// 处理初始化网站信息数据
index.addWeb = function(req,res){
	// // 查询web集合里有没有数据
	webModel.find(function(err,data){
		//console.log(data);
		if(err){
			return;
		}else{
			if(data.length==0){
				// 获取表单数据
				var con = req.body;
				//console.log(con);
				webModel.create(con,function(err,result){
					if(err){
						return;
						// 返回错误信息
						req.flash('errMsg','数据有误，请重新尝试');
						// 跳转返回
						res.redirect('back');
					}else{
						// 跳转首页
						res.redirect('/');
					};
				});
			}else{
				// 跳转首页
				res.redirect('/');
			};
		};
		
	});
};

// 首页留言

index.words = function(req,res){
	// 监听数据
	ep.all('webData','cateData','topicnewData','userData','total','kindData',function(webData,cateData,topicnewData,userData,total,kindData){
		// 关联查询 -- 以设置user(存储是用户的_id)
		// console.log(111);
		// console.log(topicData[0].user.uname);
		// 判断有没有设置轮播的文章
			// 分配数据
			
			// 分配数据
			var data = {
				isshow:0,
				kind:0,
				webData:webData,
				cateData:cateData,
				topicnewData:topicnewData,
				userData:userData,
				total:total,
				kindData:kindData
			}

		// 响应首页模板
		res.render('home/words',data);
	});
	// 查询条件
	var con = {
		webMa:'gujianwenboke'
	};
	// console.log(con)
	// 查询分类
	webModel.findOne(con,function(err,webData){
		//console.log(webData);
		ep.emit('webData',webData);
	});

	// end
	// 开始查询所有文章分类
	cateModel.find(function(err,cateData){
		//console.log(cateData);
		ep.emit('cateData',cateData);
	});
	// end
	// end
	// end
	// 查询最新的6条新文章
	topicModel.find().limit(6).sort({createTime:-1}).populate('user','name des').exec(function(err,topicnewData){
		//console.log(topicnewData)
		ep.emit('topicnewData',topicnewData);
	});
	// end
	// 查询用户信息
	userModel.findOne().exec(function(err,userData){
		//console.log(userData)
		ep.emit('userData',userData);
	});
	// end
	// 查询一共有几篇文章
	topicModel.find().count(function(err,total){
		ep.emit('total',total);
	});
	//end
	// end
	// 查询友情链接
	kindModel.find().sort({web_top:-1}).exec(function(err,kindData){
		//console.log(kindData)
		ep.emit('kindData',kindData);
	});
};


// 将对象暴露
module.exports = index;