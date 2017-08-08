//我的购物车显示隐藏
function Top(){
	var topright1 = document.getElementsByClassName("right-1")[0];
	var mylist = document.getElementById("mylist");
	
	mylist.onmouseenter = topright1.onmouseenter=function(){
		mylist.style.display = "block";
	}
	mylist.onmouseleave = topright1.onmouseleave=function(){
		mylist.style.display = "none"
	}
}

//头部列表显示隐藏
function Headlist(){
	var navl = document.getElementsByClassName("nav-l")[0];
	var headlist = document.getElementsByClassName("headlist")[0];
	
	headlist.onmouseenter = navl.onmouseenter=function(){
		headlist.style.display = "block";
	}
	headlist.onmouseleave =navl.onmouseleave=function(){
		headlist.style.display = "none"
		$(".headlist-r").hide();
	}
}

//二维码显示隐藏：
function Weixin(){
	$(".right-3,.top-1-weixin").hover(function(){
		$(".top-1-weixin").show();
	},function(){
		$(".top-1-weixin").hide();
	})
}
////头部列表子菜单显示隐藏
function Headlist_r(){
	$(".headlist li").mouseenter(function(){
		var index = $(this).index();
//		console.log(index); 
		$(".headlist-r").eq(index).show().siblings(".headlist-r").hide();
	})
	
	$(".headlist-r").hover(function(){
		$(this).show();
		$(".headlist").show();
	},function(){
		$(this).hide();
		$(".headlist").hide();
	});
}

//右侧新闻栏显示隐藏
function Headnews(){
	var navr = document.getElementsByClassName("nav-r")[0];
	var headnews = document.getElementsByClassName("headnews")[0];
	
	headnews.onmouseenter = navr.onmouseenter=function(){
		headnews.style.display = "block";
	}
	headnews.onmouseleave =navr.onmouseleave=function(){
		headnews.style.display = "none"
	}
}
//商品列表导航条切换
function Goods() {
	$(".main-list li").mouseenter(function(){
		var index=$(this).index()
//		console.log(index);
		$(".goods").eq(index).css("display","block").siblings().css("display","none")
	})
}


//吸顶导航条
function Hdwraper(){
	var navTop = $(".nav").offset().top;
	
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
//		console.log(scrollTop);
		if(scrollTop >= navTop ){
//			console.log(1)
			$(".hdwraper").css("display","block");
		}
		else {
//			console.log(2)
			$(".hdwraper").css("display","none");
		}
		
		
	})
}
	
	function goodsintor(){
		var goodsintorTop = $(".goodsintor-top").offset().top;
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop >= goodsintorTop){
	//			console.log(1);
				$(".goodsintor-top").css({"position":"fixed","top":40});
			}
			
			else {
	//			console.log(2);
				$(".goodsintor-top").css("position","static");
			}
		})
	}
	
	
	
//右边fix
function Fix(){
	$(".fixnav-1").mouseenter(function(){
		var index = $(this).index(".fixnav-1");
		$(".fixnav-1-p").eq(index).animate({"right":"34","opacity":1},500)
	})
	$(".fixnav-1").mouseleave(function(){
		var index = $(this).index(".fixnav-1");
		$(".fixnav-1-p").eq(index).animate({"right":"70","opacity":0},500)
	})


	
}


