$(function(){
	$(".col-box").hover(function(){
		$(this).children(".icon").css({"width":"55px","height":"30px","margin-top":"-60px","transition":"all 1s"});
		$(this).children(".line").css({"height":"30px","margin-top":"-60px","transition":"all 1s"});
		$(this).children(".text").css("display","none");
		$(this).children(".hideBox").css("display","block");
	},function(){
		$(this).children(".icon").css({"width":"110px","height":"60px","margin-top":"0px","transition":"all 1s"});
		$(this).children(".line").css({"height":"60px","margin-top":"0px","transition":"all 1s"});
		$(this).children(".text").css("display","block");
		$(this).children(".hideBox").css("display","none");
	});
});