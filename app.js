var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//加载session模块
var session = require('express-session');
//加载flash模块
var flash = require('connect-flash');
// 首页
var index = require('./routes/index');
// 用户
var user = require('./routes/user');
// 后台
var admin = require('./routes/admin');
//文章
var topic = require('./routes/topic');
//文章详情
var details = require('./routes/details');
//文章前台列表页
var list = require('./routes/list');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//在路由前面设置session存储信息
app.use(session({
	// 加密字符串
	secret:'zheshijiamizhifuchuan',
	cookie:{
		maxAge:60*1000*60*60,
		path:'/'
	}
}));
//加载flash
app.use(flash());
//设置错误信息和session信息
app.use(function(req,res,next){
	//全局对象
	//错误信息
	res.locals.errMsg = req.flash('errMsg');
	//继续走 移交权限
	next();
});
// 首页
app.use('/',index);
// 用户模块
app.use('/user',user);
// 文章模块
app.use('/topic',function(req,res,next){
	//如果用户没有登录跳转到前台首页
	if(!req.session.user){
		// 跳转首页
		res.redirect('/');
		//终止程序
		return;
	};
	// 移交权限
	next();
},topic);
// 文章详情
app.use('/details',details);
// 文章列表页
app.use('/list',list);
// 后台模块
app.use('/',function(req,res,next){
	//如果用户没有登录跳转到前台首页
	if(!req.session.user){
		// 跳转首页
		res.redirect('/');
		//终止程序
		return;
	};
	// 移交权限
	next();
},admin);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  // err.status = 404;
  if(err.status = 404){
  	// 响应404模板
	res.render('home/404');
  }
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
