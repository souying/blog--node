// 专门争对topic控制器
// 加载对应的模型
// 加载分类模型
var cateModel = require('../models/cateModel');
var marked = require('../middlewares/marked');
// 加载话题模型
var topicModel = require('../models/topicModel');
// 加载用户模型
var userModel = require('../models/userModel');
// 加载eventProxy
var eventproxy = require('eventproxy');
var ep = new eventproxy();
// 定义user对象
var topic ={};
// 定义方法

// 后台文章列表页
topic.blog = function(req,res){
	ep.all('topicData','page','pageMax',function(topicData,page,pageMax){
		
		// console.log(111);
		// console.log(topicData[0].user.uname);
		// console.log(topicData);
		if(topicData==undefined){
			// 分配数据
			var data = {
				topicData:topicData,
				page:page,
				pageMax:pageMax,
				isshow:1
			}
		}else{
			// 分配数据
			var data = {
				topicData:topicData,
				page:page,
				pageMax:pageMax,
				isshow:0
			}

		}
		

		// 响应数据
		res.render('admin/topic/blog',data);
	});

	// 如果有条件 --- 第一次进来 req.query.page 是undefined
	// console.log(req.query.page)
	if(req.query.page==undefined){
		/*
			分页处理
		*/ 
		// console.log(1111111111111)
		//  每页显示的条数
		var pageSize = 8;

		// 当前的页数
		var page = req.query.page?req.query.page:1;

		topicModel.find().count(function(err,total){

			// 获取总条数 total
			// console.log(total);
			// console.log(1111111111)
			
			// page的限制
			if(page<=1){
				page=1
			}

			// 最大的页数
			var pageMax = Math.ceil(total/pageSize);

			if(page>=pageMax){
				page=pageMax
			}

			// 当前的偏移量
			var pageOffset = (page-1)*pageSize;
			// 查询所有的文章
			topicModel.find().sort({top:1,createTime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname').populate('cid','cateName').exec(function(err,topicData){
				ep.emit('topicData',topicData);
				ep.emit('page',page);
				ep.emit('pageMax',pageMax);
				// console.log(topicData)
			});
		});

	}else{
		/*
			分页处理
		*/ 
		//  每页显示的条数
		var pageSize = 8;
		// console.log(212222222222)
		// 当前的页数
		var page = req.query.page?req.query.page:1;

		topicModel.find().count(function(err,total){

			// 获取总条数 total
			// console.log(total);
			// console.log(1111111111)
			
			// page的限制
			if(page<=1){
				page=1
			}

			// 最大的页数
			var pageMax = Math.ceil(total/pageSize);

			if(page>=pageMax){
				page=pageMax
			}

			// 当前的偏移量
			var pageOffset = (page-1)*pageSize;
			// 查询所有的文章
			topicModel.find().sort({top:1,createTime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname').populate('cid','cateName').exec(function(err,topicData){
				ep.emit('topicData',topicData);
				ep.emit('page',page);
				ep.emit('pageMax',pageMax);
				// console.log(topicData)
			});
		});
	}
	
};
// 后台文章详情页
topic.article = function(req,res){
	ep.all('topicData',function(topicData){
		// 关联查询 -- 以设置user(存储是用户的_id)
		// console.log(111);
		// console.log(topicData[0].user.uname);

		// 分配数据
		var data = {
			topicData:topicData
		}
		// 响应数据
		res.render('admin/topic/article',data);
	});
	// 查询所有的文章
		// 获取查询的条件
		var con = {
			_id:req.query._id
		}
		//console.log(con)
		topicModel.findOne(con).exec(function(err,topicData){
			ep.emit('topicData',topicData);
			//console.log(topicData);
		});
};
// 后台文章发布页
topic.markdown = function(req,res){
	// 响应文章发布页模板
	ep.all('cateData',function(cateData){
		// 关联查询 -- 以设置user(存储是用户的_id)
		// console.log(111);
		// console.log(topicData[0].user.uname);

		// 分配数据
		var data = {
			cateData:cateData
		}

		// 响应数据
		res.render('admin/topic/markdown',data);
	});
	// 查询分类
	cateModel.find(function(err,cateData){
		//console.log(cateData);
		ep.emit('cateData',cateData);
	});
	
};
// 添加文章数据处理
topic.addTopic = function(req,res){
	// 获取表单提交的数据
	// var con = req.body;
	// console.log(con);
	// 获取发布用户的id
	// req.session.user._id
	
	// 数据
	var data = {
		tName : req.body.tName,
		tContent : req.body.tContent,
		cid : req.body.cid,
		// 作者信息 -- 当前登录的用户的_id
		user : req.session.user._id,
		lastEdit : new Date(),
		tj :req.body.tj,
		tag : req.body.tag,
		img : req.body.img,
		time : req.body.time,
		mp3: req.body.mp3
	};
	//console.log(data);
	// 创建文章
	topicModel.create(data,function(err,result){
		if(err){
			// 返回错误信息
			req.flash('errMsg','数据有误，请重新尝试');

			// 跳转返回
			res.redirect('back');
		}else{
			// 跳转后台文章列表页
			res.redirect('/topic/blog');
		}
	});
};
// 后台文章编辑页面
topic.topicEd = function(req,res){
	ep.all('topicData',function(topicData){
		// 关联查询 -- 以设置user(存储是用户的_id)
		// console.log(111);
		// console.log(topicData[0].user.uname);

		// 分配数据
		var data = {
			topicData:topicData
		}

		// 响应模板数据
		res.render('admin/topic/topicEd',data);
	});
		// 获取编辑文章的条件
		//获取条件
		var id = {
			_id:req.query._id
		};
		//console.log(id);
		// 文章数据
		topicModel.findOne(id).populate('cid','cateName _id').exec(function(err,topicData){
			ep.emit('topicData',topicData);
			//console.log(topicData);
		});
};
// 后台文章更新数据处理
topic.doTopicEd = function(req,res){
	// 获取更新的条件
	var id = {
		_id:req.body._id
	};
	//console.log(id);
	// 更新的数据
	var newData ={
		tName:req.body.tName,
		cid:req.body.cid,
		tContent:req.body.tContent,
		tj:req.body.tj,
		top:req.body.top,
		tag:req.body.tag,
		isshow:req.body.isshow,
		img:req.body.img,
		time:req.body.time
	};
	//console.log(newData);
	// 后台话题更新
	topicModel.update(id,{$set:newData},function(err){
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
//后台删除文章数据处理
topic.removeTopic = function(req,res){
	// 获取id
	var topic = {
		_id:req.query._id
	};
	//console.log(topic)
	topicModel.remove(topic,function(err){
		if(err){
			return;
		}else{
			// 删除完跳回列表页
			res.redirect('/topic/blog');
		};
	});
};

// 将对象暴露
module.exports = topic;