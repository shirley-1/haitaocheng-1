function fangdajing(){
	//等比公式
	//小图width/大图width == 小区域width/大区域width
	//小区域的宽高：
	$("#smallArea").width( $("#smallImg").width() * $("#bigArea").width() / $("#bigImg").width() );//小区宽
	$("#smallArea").height( $("#smallImg").height() * $("#bigArea").height() / $("#bigImg").height() );//小区高
	
	//放大系数
	var scale = $("#bigImg").width() / $("#smallImg").width();
//		console.log(scale);
	//在小图中移动
	$("#smallImg").mousemove(function(e){
		$("#smallArea").show(); //显示小区域
		$("#bigArea").show(); //显示大区域
		
		x = e.pageX - $("#smallImg").offset().left - $("#smallArea").width()/2;//小区域距离元素左边的距离
		y = e.pageY - $("#smallImg").offset().top - $("#smallArea").height()/2;//小区域距离元素左边的距离
		
		//控制边界：
		if(x < 0){//左边界
			x=0;
		}
		if(x > $("#smallImg").width() - $("#smallArea").width()){//右边界
			x = $("#smallImg").width() - $("#smallArea").width()
		}
		if (y < 0){//上边界
			y = 0
		}
		else if (y > $("#smallImg").height()-$("#smallArea").height()) {//下边界
			y = $("#smallImg").height()-$("#smallArea").height();
		}
		
		//小区域移动：
		$("#smallArea").css({left:x, top:y});
		
		//大图移动
		$("#bigImg").css({left: -scale*x,top: -scale*y});
		
		$("#smallImg").mouseleave(function(){
			$("#smallArea").hide(); //隐藏小区域
			$("#bigArea").hide(); //隐藏大区域
		})
	})
	
	
	//点击改变图片
	$("body").on("click",".goodsimg-l dd",function(){
		
		var bimg = $(this).find("img").attr("src").replace("-s","-b");
//		console.log(index)
		$("#smallImg img,#bigArea img").attr("src",bimg);
	})
}
