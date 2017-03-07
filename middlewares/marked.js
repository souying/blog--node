var marked = require('marked');
marked.setOptions({
	renderer : new marked.Renderer(),
	gfm : true,
	tables : true,
	breaks : false,
	pedantic : false,
	sanitize : true,
	smartLists : true,
	smartypants : false
});
//console.log(marked('测试测试'));
// 抛出去
module.exports = marked;