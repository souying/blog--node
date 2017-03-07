// 数据库配置文件

// 加载mongoopse模块   先下载  npm install mongoose --save
// 引入mongoose模块
var mongoose = require('mongoose');
// 定义数据库地址
var dbUrl = '127.0.0.1';
// 定义端口号
var dbPort = '27017';
// 定义数据库名
var dbName = 'blog';
// 定义连接的账户
var dbUser = 'admin';
// 定义账户密码
var dbPwd = 'admin';



// 需要的数据库连接地址
var connect_url = 'mongodb://'+dbUrl+':'+dbPort+'/'+dbName;

// 连接
mongoose.connect(connect_url,function(err){
	if(err){
		console.log('数据库连接失败');
	}
});

// 将mongoose对象向外暴漏
module.exports = mongoose;