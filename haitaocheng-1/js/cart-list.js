$(function(){
	var bg = false;
	//创建节点
	function cart_list(){
		$(".cartlist-tb").find("tr").remove();
		var date = $.cookie("goods");
		if(date){
			var date = JSON.parse(date);
//			console.log(date);
			if(date.length>0){
				var total = 0;
				var num = 0;
				var s = 0;
				for(var i=0 ;i<date.length ; i++){
//					console.log(date[i])

					if(date[i].select){
						s++;
						total+=date[i].num*date[i].price;
						bg = true;
	  				}
					
					
					var td1 = $("<td><input type='checkbox' class='checkbox' /></td>");
					td1.find("input").prop("checked",date[i].select);
					var td2 = $("<td><img src=" + date[i].img + "/ id='img'><p id='name'>" + date[i].name +"</p></td>")
					var td3 = $("<td><i>￥</i><span id='price'>" +date[i].price + "</span></td>")
					var td4 = $("<td><button class='del'>-</button><span id ='num'>" + date[i].num + "</span><button class='add'>+</button></td>");
					var td5 = $("<td class ='detel'>删除</td>")
					var tr = $("<tr></tr>").append(td1).append(td2).append(td3).append(td4).append(td5);
					
					$(".cartlist-tb").append(tr);
					
					$(".tp").html(total);
					$(".num").html(s)
					
					if(s>0){
  							bg = true;
  							$(".buy").css("background","#FFCA18")
  						}
	  					else{
	  						bg = false;
	  						$(".buy").css("background","#ccc")
	  					}
				}
			}
			else{
				$(".tp").html(0);
				$(".checkall").prop("checked", false);
				
			}
		}
	}
	
	cart_list();
	
	//点击减号按钮减少商品
	$("body").on("click",".del",function(){
		var date = $.cookie('goods');
		if(date){
			var date = JSON.parse(date);
			var index = $(this).index(".del");
			if(date[index].num>1){
				date[index].num--;
				$(".warn").hide();
			}
		}
		
		$.cookie("goods",JSON.stringify(date),{expries:30,path:"/"});//存cookie
		cart_list();//刷新节点
	})
	
	
	//点击加号按钮增加商品
	$("body").on("click",".add",function(){
		var date = $.cookie('goods');
		if(date){
			var date = JSON.parse(date);
			var index = $(this).index(".add");
//			console.log(date,index)
			if(date[index].num<6){
				date[index].num++;
			}
			else{
				$(".warn").show();
			}
		}
		$.cookie("goods",JSON.stringify(date),{expries:30,path:"/"});//存cookie
		cart_list();//刷新节点
	})
	
	//点击删除按钮，移除当前节点
	$("body").on("click",".detel",function(){
		var date = $.cookie("goods");
		if (date){
			var date = JSON.parse(date) 
			if(date.length > 0){
				var index = $(this).index(".detel");
				console.log(index)
				date.splice(index,1);
			}
		}
		$.cookie("goods",JSON.stringify(date),{expries:30,path:"/"});//存cookie
		cart_list();//刷新节点
	})
	
	
	
	//点击选择框计算商品价格
	$("body").on("click",".checkbox",function(){
		var date = $.cookie("goods");
		if(date){
			var date = JSON.parse(date);
			var index = $(this).index(".checkbox");
			date[index].select = !date[index].select;
			$.cookie("goods",JSON.stringify(date),{expries:30,path:"/"});//存cookie
			cart_list();//刷新节点
			isAllCheck();
		}
	})
	
	
	//全选
  	$(".checkall").click(function(){
		var date = $.cookie("goods")//取出cookie
		if(date){
			var date = JSON.parse(date);
			if(date.length>0){
				if($(this).prop("checked") ){
					for(var i=0; i<date.length; i++){
						date[i].select = true;
						$.cookie("goods",JSON.stringify(date),{expries:30,path:"/"});//存cookie
						cart_list();//刷新节点
					}
		  		}
				else{
		  			for(var i=0; i<date.length; i++){
						date[i].select = false;
						$.cookie("goods",JSON.stringify(date),{expries:30,path:"/"});//存cookie
						cart_list();//刷新节点
					}
	  			}
	  		}
		}
  	});
	
	//点击是否全选
	isAllCheck();
	function isAllCheck(){
		var date = $.cookie("goods");
		if(date){
			var date = JSON.parse(date);
			if(date.length>0){
				var sum = 0;
				for(var i =0 ; i<date.length ; i++){
					sum +=date[i].select - 0;
				}
				console.log(sum,date.length)
				if(sum == date.length && date.length !=0){
					$(".checkall").prop("checked", true);
				}
				else{
					$(".checkall").prop("checked", false);
				}
			}
		}
	}
	
	
	
	
	
	
	//点击跳转到结算
	$(".buy").click(function(){
		if(bg){
			location.href = "cart.html"
		}
		
	})
})
