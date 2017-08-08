
$(function(){
	Top();//我的购物车显示隐藏
	Headlist();//头部列表显示隐藏
	Headnews();//新闻列表显示隐藏
	Headlist_r();//子菜单显示隐藏
	Fix();
	Weixin();

	
	Goods();//商品列表导航条切换
	
	//商品列表底部灰色名称栏显示隐藏
	$(".goods-r li").mouseenter(function(){
		$(this).children(".addfav").show();
		var index = $(this).index();
		$(this).children("p").stop().animate({bottom:"0px"},300);
	})
	
	$(".goods-r li").mouseleave(function(){
		$(this).children("p").stop().animate({bottom:"-23px"},300);
		$(this).children(".addfav").hide()
	})
	
	//ajax商品价格和描述--goods2
		$.get("json/goods.json",function(d){
			var arr = d;
//			console.log(arr.length);
			for(var i=0 ; i<arr.length ; i++){// 创建商品节点
				$(".goods2-c li").eq(i).append("<p><a>"+arr[i].name+"</a></p>");
				var div = $("<div class=price><h4>海淘价:</h4><h5><span>￥</span>"+arr[i].price+"</h5></div>");
				var a = $("<a href='javascript:;'><img src="+arr[i].img+"/></a>");
				$(".goods2-c li").eq(i).append("<div class=describe></div>");
				$(".describe").eq(i).append(div).append(a);
			}
			
			$(".goods2-c").on("click","li",function(){//点击商品所在的li
				var index = $(this).index();
				var id = arr[index].id
//				console.log(1,id)
				location.href = "details.html?id=" +id;
			})
			
//			
			$("body").on("mouseenter", ".describe a", function(){
				
				$(this).children("img").stop().animate({"marginLeft":-5},400);
				
				$(this).mouseleave(function(){
					$(this).children("img").stop().animate({"marginLeft":5},400);
					$(this).off("mouseleave");
				})
			})
			
		})
	
	//吸顶
	Hdwraper();
	
	//ajax商品价格和描述--goods3

		$.get("json/goods3.json",function(d){
			var arr = d;
//			console.log(JSON.stringify(arr));
			for(var i=0 ; i<arr.length ; i++){
				$(".goods3 .goods3-c li").eq(i).append("<p><a>"+arr[i].name+"</a></p>");
				var div = $("<div class='price'><h4>海淘价:</h4><h5><span>￥</span>"+arr[i].price+"</h5></div>");
				var a = $("<a href='#'><img src="+arr[i].img+"/></a>");
				$(".goods3 .goods3-c li").eq(i).append("<div class='describe'></div>");
				$(".goods3 .describe").eq(i).append(div).append(a);
			}
		})
		
	//ajax商品价格和描述--goods4
		$.get("json/goods4-1.json",function(d){
			var arr = d;
//			console.log(arr[0])
			for(var j=0;j<arr.length;j++){//遍历json对象
				var obj1 = arr[j];
				//创建ul节点
				$("<ul class=list"+(j+1)+"></ul>").appendTo(".goods4-r");
				for(var i=0 ; i<obj1.length ; i++){
					$(".goods4 .goods4-r ul").eq(j).append("<li></li>");
					
					$(".goods4 .goods4-r ul").eq(j).children("li").eq(i).append("<h4><a href='#'><img src="+obj1[i].img+"/><span></span></a></h4>")
						.append("<h5><a href='#'>"+obj1[i].name+"</a></h5>")
						.append("<h6><a href='#'>"+obj1[i].infor+"</a></h6>")
						.append("<p>海淘价：<i>￥</i><em>"+obj1[i].price+"</em></p>")					
					}
			}
			$(".goods4-list li").mouseenter(function(){
				var index = $(this).index(".goods4-list li");
				// arr[index];
				$(".goods4 .goods4-r ul").eq(index).show().siblings().hide()
			})
		})
		
	// li .hover 
	
	$(".headlist li").hover(function(){//li阴影
		$(this).css("box-shadow","0px 0px 8px rgba(0,0,0,0.15)");
		$(this).find(".bg").css("box-shadow","0px 8px 8px rgba(0,0,0,0.15)");
	},function(){
		$(this).css("box-shadow","");
		$(this).next().css("box-shadow","");
	});
	
})