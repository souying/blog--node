// 专门争对list控制器
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
// 定义list对象
var list ={};

list.list = function(req,res){
	// 监听数据
	ep.all('webData','cateData','topicData','topicnewData','userData','tab','page','pageMax','total',function(webData,cateData,topicData,topicnewData,userData,tab,page,pageMax,total){
		// 关联查询 -- 以设置user(存储是用户的_id)
		// console.log(111);
		// console.log(topicData[0].user.uname);
			// 分配数据
			var data = {
				isshow:0,
				kind:0,
				webData:webData,
				cateData:cateData,
				topicData:topicData,
				topicnewData:topicnewData,
				userData:userData,
				tab:tab,
				page:page,
				pageMax:pageMax,
				total:total
			}


		// 响应首页模板
		res.render('home/list',data);
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
	// 查询一共有几篇文章
	topicModel.find().count(function(err,total){
		ep.emit('total',total);
	});
	//end
	var id={};
	// 如果有条件 --- 第一次进来 req.query.tab 是undefined
	if(req.query.tab==undefined || req.query.tab=='all'){
		
		ep.emit('tab','all');
		
	}else{
		id.cid = req.query.tab
		ep.emit('tab',id.cid);
	}

	if(req.query.tab==undefined || req.query.tab=='all'){
		// 查询所有的文章
		//  每页显示的条数
		var pageSize = 8;
		// 获取当前页
		var page = req.query.page?req.query.page:1;
		// 查询
		//console.log(page);
		topicModel.find().sort({createTime:-1}).populate('user','uname').count(function(err,total){
			// 获取总条数 total
			// console.log(total);
			
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
			// 查询
			topicModel.find().sort({createTime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname').populate('cid','cateName').exec(function(err,topicData){
				// console.log(topicData)
				//console.log(err)
				ep.emit('topicData',topicData);
				ep.emit('page',page);
				ep.emit('pageMax',pageMax);
				
			});

		});
		
	}else{
		// 查询所有的文章
		//  每页显示的条数
		var pageSize = 8;
		// 获取当前页
		var page = req.query.page?req.query.page:1;
		// 查询
		//console.log(page);
		topicModel.find(id).sort({createTime:-1}).populate('user','uname').count(function(err,total){
			// 获取总条数 total
			// console.log(total);
			
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
			// 获取条件分类
			// var id = {
			// 	cid:req.query.tab
			// };
			// 查询
			topicModel.find(id).sort({createTime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname').populate('cid','cateName').exec(function(err,topicData){
				// console.log(topicData)
				//console.log(err)
				ep.emit('topicData',topicData);
				ep.emit('page',page);
				ep.emit('pageMax',pageMax);
	
			});

		});
	
	}
	
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
	
};
// 搜索
list.search = function(req,res){
	// 监听数据
	ep.all('webData','cateData','topicData','topicnewData','userData','tab','page','pageMax','search','total',function(webData,cateData,topicData,topicnewData,userData,tab,page,pageMax,search,total){
		// 关联查询 -- 以设置user(存储是用户的_id)
		// console.log(111);
		// console.log(topicData[0].user.uname);
			// 分配数据
			var data = {
				isshow:0,
				kind:0,
				webData:webData,
				cateData:cateData,
				topicData:topicData,
				topicnewData:topicnewData,
				userData:userData,
				tab:tab,
				page:page,
				pageMax:pageMax,
				search:search,
				total:total
			}

		// 响应首页模板
		res.render('home/search',data);
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
	// 查询一共有几篇文章
	topicModel.find().count(function(err,total){
		ep.emit('total',total);
	});
	//end

	// 按照分类进行查询
	var con = {};
	//用正则作为条件
	var id ={tName:eval('/'+req.query.search+'/')}
	// console.log(id)
	var demo =req.query.search
	// console.log(demo)
	//console.log(demo)
	// 如果有条件 --- 第一次进来 req.query.tab 是undefined
	if(req.query.tab!='all' && req.query.tab!=undefined){
		con.cid = req.query.tab

		ep.emit('tab',con.cid);
	}else{
		ep.emit('tab','all');
	}
	if(req.query.search!=undefined){
		search=demo
		ep.emit('search',search)
	}else{
		ep.emit('search','')
	}

		
		// 查询所有的文章
		//  每页显示的条数
		var pageSize = 100;
		// 获取当前页
		var page = req.query.page?req.query.page:1;
		// 查询
		//console.log(page);
		topicModel.find(id).sort({createTime:-1}).populate('user','uname').count(function(err,total){
			// 获取总条数 total
			// console.log(total);
			// if(total==0){
			// 	res.redirect('/')
			// };
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
			// 获取条件分类
			// 查询
			topicModel.find(id).sort({createTime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname').populate('cid','cateName').exec(function(err,topicData){
				//console.log(topicData)
				//console.log(err)
				ep.emit('topicData',topicData);
				ep.emit('page',page);
				ep.emit('pageMax',pageMax);
	
			});

		});
	
	
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

	
};

// 标签页
list.tag = function(req,res){
	// 监听数据
	ep.all('webData','cateData','topicData','topicnewData','userData','page','pageMax','total',function(webData,cateData,topicData,topicnewData,userData,page,pageMax,total){
		// 关联查询 -- 以设置user(存储是用户的_id)
		// console.log(111);
		// console.log(topicData[0].user.uname);
			// 分配数据
			var data = {
				isshow:0,
				kind:0,
				webData:webData,
				cateData:cateData,
				topicData:topicData,
				topicnewData:topicnewData,
				userData:userData,
				page:page,
				pageMax:pageMax,
				total:total
			}

		// 响应首页模板
		res.render('home/tag',data);
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
	// 查询一共有几篇文章
	topicModel.find().count(function(err,total){
		ep.emit('total',total);
	});
	//end

	// 获取地址栏的参数
	var id ={
		tag:req.query.tag
	}
	// console.log(id)

	// 如果有条件 --- 第一次进来 req.query.tab 是undefined
	
	

		
		// 查询所有的文章
		//  每页显示的条数
		var pageSize = 100;
		// 获取当前页
		var page = req.query.page?req.query.page:1;
		// 查询
		//console.log(page);
		topicModel.find(id).sort({createTime:-1}).populate('user','uname').count(function(err,total){
			// 获取总条数 total
			// console.log(total);
			// if(total==0){
			// 	res.redirect('/')
			// };
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
			// 获取条件分类
			// 查询
			topicModel.find(id).sort({createTime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname').populate('cid','cateName').exec(function(err,topicData){
				// console.log(topicData)
				// console.log(err)
				ep.emit('topicData',topicData);
				ep.emit('page',page);
				ep.emit('pageMax',pageMax);
	
			});

		});
	
	
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
};


// 将对象暴露
module.exports = list;