// 专门争对details控制器
// 加载对应的网站管理模型
var webModel = require('../models/webModel');
// 加载对应的文章分类模型
var cateModel = require('../models/cateModel');
// 加载对应的文章模型
var topicModel = require('../models/topicModel');
// 加载对应的用户模型
var userModel = require('../models/userModel');
// 加载eventProxy
var eventproxy = require('eventproxy');
var ep = new eventproxy();
// 定义details对象
var details ={};

// 文章详情页
details.details = function(req,res){
	// 条件
	var id = {
		_id : req.params.id
	};
	console.log(id)
	// 进来的时候就应该更新该话题的访问数量 -- 在原有的访问数量上+1
	topicModel.update(id,{$inc:{visitNum:1}},function(err){
		// console.log(err);
	});
	// 监听数据
	ep.all('webData','cateData','topicData','topictopData','topicnewData','userData','total',function(webData,cateData,topicData,topictopData,topicnewData,userData,total){
		// 关联查询 -- 以设置user(存储是用户的_id)
		// console.log(111);
		// console.log(topicData[0].user.uname);
		// 判断有没有推荐文章
		if(topictopData.length==0){
			// 分配数据
			var data = {
				isshow:0,
				kind:0,
				webData:webData,
				cateData:cateData,
				topicData:topicData,
				topictopData:topictopData,
				topicnewData:topicnewData,
				userData:userData,
				total:total
			}
		}else{
			// 分配数据
			var data = {
				isshow:1,
				kind:0,
				webData:webData,
				cateData:cateData,
				topicData:topicData,
				topictopData:topictopData,
				topicnewData:topicnewData,
				userData:userData,
				total:total
			}
		}
		// 响应首页模板
		res.render('home/details',data);
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
	// 去topicModel查询对应的话题的详情 -- 关联查询用户的信息/关联查询该话题所属的分类
	topicModel.findOne(id).populate('user','uname des').populate('cid','cateName').exec(function(err,topicData){
		// console.log(topicData);

		// 响应
		ep.emit('topicData',topicData);
	});
	// end
	// 查询所有的推荐的文章
	// 以后有时间换成按访问查的热门文章
	var top = {
		top:1
	}
	topicModel.find(top).limit(3).sort({createTime:-1}).exec(function(err,topictopData){
		//console.log(topiclunData)
		ep.emit('topictopData',topictopData);
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

}

// 将对象暴露
module.exports = details;