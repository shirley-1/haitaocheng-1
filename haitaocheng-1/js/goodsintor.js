$(function(){
	$(".goodsintor-top li").click(function(){
		$(this).css("background","#ff9000").siblings().css("background","#d9d9d9");
		$(this).find("a").css("color","#fff");
		$(this).siblings().find("a").css("color","#908d8d");
		
	})
})
