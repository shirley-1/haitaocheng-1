function loadCart(id){
	
	//点击加入购物车按钮，购物车内商品数量或者种类增加
  	var id = id;
	//	console.log(id);
	$("body").on("click","#addcart",function(){
		
		var date = $.cookie("goods")//取出cookie
		var arr = date?JSON.parse(date):[];////当cookie存在的时候，arr=JSON.parse()，否则创建一个空数组
		var obj = {//要存入cookie的对象
			"name":$(".name").html(),
			"num":1,
			"price":$(".price").html(),
			"img":$("#smallImg").find("img").attr("src"),
			"id":id,
			"select": false,
		}

		var flag = false;
		for(var i=0 ; i<arr.length ; i++){
			if(arr[i].id == obj.id){//如果商品id相同，则只添加数量，不添加种类
				arr[i].num += $(".goodsimg-r-1").find("span").html()-0;
				flag = true;
				if(arr[i].num>=6){
					console.log("大于6");
					arr[i].num=6;
					$(".warn-1").css("color","red").show();
				}
			}
			
		}
		
		if(!flag){//如果商品id不一样，则需要添加新的商品
			arr.push(obj);
		}
		
		$.cookie("goods",JSON.stringify(arr),{expries:30,path:"/"});//存cookie
		console.log($.cookie("goods"))
		
		cartlist();//创建节点
		isAllCheck();
		
	});
	
	
	
//创建购物车里面的节点
function cartlist(){
	temp=true;
	var obj = $.cookie("goods");//取cookie
	
	if(obj){//判断cookie是否存在
		obj = JSON.parse(obj)//存在即对cookie进行解析
		var s = 0,price=0;   //s:商品件数（种类） price:商品价格
		
		if(obj.length > 0){
			
			$(".cart-goods .mygoods").remove();//移除之前创建的节点
			
			for(var i=0; i<obj.length ; i++){//遍历解析后的cookie数据,根据数据创建节点对象
				
				div = $("<div class='mygoods'></div>");
				
			    var input =	$( "<input type='checkbox' class='checkbox' />");//复选框
			    
			    input.prop("checked",obj[i].select); //从Cookie取出复选框之前的选中状态
			    
		  		var h1 = $("<h1></h1>");
	  			input.appendTo(h1);
		  		$("<img src=" + obj[i].img+ " />").appendTo(h1);
		  		
		  		dl = $("<dl><dt>"+obj[i].name+"</dt><dd><button class='del'>-</button><span id='number'>" + obj[i].num + "</span><button class='add'>+</button></dd><dd id='price'><span>￥</span>" + obj[i].price + "</dd></dl>")
				div.append(h1).append(dl);
				$(".cart-goods").append(div);
				
				if(obj[i].select){					//判断购物车内复选框的选中状态，选中即执行if语句
					s++; 							//已选中的商品数量相加
					price+=obj[i].num*obj[i].price;//价格相加
				}
			}
			$(".fixnav-3 .num").html(obj.length);//购物车内的商品总数量（种类）
		}
		
		$("#totpric").html(price);
		
		$(".totalprice p span").html(s);
		
		if(s>0){//s大于0,表示至少有一个商品被选中
			temp = true;
			$(".go").css("background","#ff9000")
		}
		else{ //没有商品被选中
			temp = false;
			$(".go").css("background","#666");
		}
	}
}

	//选中商品跳转到结算页面
  	$(".go").click(function(){
  		if(temp){
  			location.href = "cart-list.html";
  		}
  	});
  	
  	
	
	//点击加入购物车商品飞入购物车
  	var offset = $(".cart_icon").offset();  //结束的地方的元素
	//console.log(offset);		//left:1235 top:624
  	
  	$("body").on("click","#addcart",function(event){ //是$("#addcar")这个元素点击触发的  开始动画的位置就是这个元素的位置为起点
  		
  		img = $("#smallImg").next().find("img").attr('src');//找到图片路径
  		
  		var flyer = $('<img class="u-flyer" src="'+img+'">');//要飞图片的路径
  		
  		flyer.fly({//调用插件中飞的方法
  			//开始位置
			start: {
				left: event.clientX,
				top: event.clientY
		//		width: 20px,
		//		height: 20px
			},
			//结束位置
			end: {
				left: offset.left,
				top: offset.top,
				width: 0,
				height: 0
			}
  		})
  	})
	cartlist();
	
		  		
	//点击加号按钮，增加加入购物车的商品数量
  	$("body").on("click","#add",function(){
	//console.log(add);
  		var nub = $(".number").find("span").eq(0).html();
			nub++;
			if(nub>6){
				nub = 6
				$("#warn").show();
			}
			
		$(".number").find("span").eq(0).html(nub);
  	})
  	
  	
  	//点击减号按钮，减少加入购物车的商品数量
  	$("body").on("click","#del",function(){
	//console.log(del);
  		var nub = $(".number").find("span").eq(0).html();
				$("#warn").hide();
			nub--;
			if(nub<1){
				nub = 1
			}
		$(".number").find("span").eq(0).html(nub);
  	})
		  	
				
	//点击购物车logo显示购物车小窗口
	$(".fixnav-3").click(function(){
	//		  		console.log(1)
		$(".cart").stop().animate({"right":0},300);
	})
	$(".check").find("span").click(function(){
		$(".cart").stop().animate({"right":-250},1000);
	})	  	
		  	
  	//点击按钮增加或减少购买数量
  	$("body").on("click",".add",function(){
		var date = $.cookie("goods")//取出cookie
		var arr = JSON.parse(date);
		var index = $(this).index(".add");
		
			if(arr[index].num<6){
				arr[index].num++;
				$(".warn-1").hide();
			}
			else{
				$(".warn-1").css("color","red").show();
			}
		$.cookie("goods",JSON.stringify(arr),{expries:30,path:"/"});//存cookie
			cartlist();//刷新节点	
  	})
  	
  	$("body").on("click",".del",function(){
  		$(".warn-1").hide();
		var date = $.cookie("goods")//取出cookie
		var arr = JSON.parse(date);
		var index = $(this).index(".del");
			if(arr[index].num>1){
				arr[index].num--;
			}
		$.cookie("goods",JSON.stringify(arr),{expries:30,path:"/"});//存cookie
			cartlist();//刷新节点
			
  	})
	
	
	
	//点击选中按钮计算总价
  	$("body").on("click",".checkbox",function(){
  		var index = $(this).index(".checkbox");
  		var obj= $.cookie("goods");
  		var obj = JSON.parse(obj);
  		obj[index].select = !obj[index].select;
		$.cookie("goods",JSON.stringify(obj),{expries:30,path:"/"});//存cookie
  		cartlist();	
  		isAllCheck();
  	})
  	
  	
  	
  	//全选
  	$(".check p input").click(function(){
		var date = $.cookie("goods")//取出cookie
		if(date){
			var arr = JSON.parse(date);
			if(arr.length>0){
				if($(this).prop("checked") ){
					for(var i=0; i<arr.length; i++){
						arr[i].select = true;
						$.cookie("goods",JSON.stringify(arr),{expries:30,path:"/"});//存cookie
						cartlist();//刷新节点
					}
		  		}
				else{
		  			for(var i=0; i<arr.length; i++){
						arr[i].select = false;
						$.cookie("goods",JSON.stringify(arr),{expries:30,path:"/"});//存cookie
						cartlist();//刷新节点
					}
	  			}
	  		}
		}
  	});
		  
		  
//判断是否全选了
	isAllCheck();
	function isAllCheck(){
		
		var arr = $.cookie("goods");
		if(arr){
			arr = JSON.parse(arr);
			if(arr.length>0){
				var sum = 0;
				for (var i=0; i<arr.length; i++) {
					console.log(arr[i].select-0)
					sum +=arr[i].select-0;
				}
				
				//全选了
				console.log(sum,arr.length)
				if (sum == arr.length && arr.length!=0) {
					$(".check p input").prop("checked", true);
				}
				//没有全选
				else {
					$(".check p input").prop("checked", false);
				}
			}
		}
		
	}	  
	
	
	
	
	
}