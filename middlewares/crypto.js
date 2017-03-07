module.exports=function(str){
    // 加载系统模块crypto
    var crypto = require('crypto');

    // sha1加密方式更加安全
    var sha1 = crypto.createHash('sha1');

    // 加密
    sha1.update(str);

    // 输出
   return sha1.digest('hex');

}