$(function(){
    var id,temp=false;
	$(function(){
		id = location.search.slice(4);//获取当前点击跳转链接的id
//		console.log(id)
		$.get("json/goods.json",function(d){//获取json
//		console.log(d);
		var arr = d;
		for(var i=0; i<arr.length ; i++){
			var obj = arr[i];
			var	simg = obj.simg
			if(id == obj.id){
				goods(obj);
			}
		}
			fangdajing();
		})
		loadCart(id);
	})
	
	
	
	function goods(obj){
				//创建商品图片节点
				$(".goodsimg-l dl").append("<dt id=smallImg><img src='images/images2/"+ obj.id + "-b" + 1 + ".jpg'/><div id=smallArea></div></dt>");
					var	simg = obj.simg
				for(var j = 1 ; j<=simg.length ; j++){	
					$(".goodsimg-l dl").append("<dd><img src='images/images2/" + obj.id + "-s" + j +".jpg'/></dd>")
				}
				//创建放大镜
				$("#bigArea").append("<img src='images/images2/" + obj.id + "-b" + 1 + ".jpg' id=bigImg />")
				
				//创建商品描述
				$(".goodsimg-r").append("<h1><a class='name' href='#'>"+obj.name+"</a></h1>");
				$(".goodsimg-r").append("<h2><a href='#'>"+obj.logo+"</a></h2>");
				$(".goodsimg-r").append("<div class=goodsimg-r-1></div>")
				
				$(".goodsimg-r-1").append("<dl><dt>海 淘 价</dt><dd>￥ <i class='price'>"+ obj.price + "</i></dd></dl>")
				$(".goodsimg-r-1").append("<dl><dt>发货商家</dt><dd>海淘橙</dd></dl>")
				var dls="";
				for(var key in obj){					
					if(key.indexOf("description")!=-1){
						dls+="<dl>"
							+"<dt>"+obj[key][0]+"</dt>"
							+"<dd class='border'>"+obj[key][1]+"</dd>"
							+"</dl>"
					}
				}
				$(".goodsimg-r-1").append(dls);
				$(".goodsimg-r-1").append("<dl><dt>数量</dt><dd class=number><button id='del'>-</button><span>1</span><button id='add'>+</button>&nbsp;&nbsp;(库存"+obj.goodsnumber+"件)</dd></dl>")
				$(".goodsimg-r-1").append("<dl><dt>发货重量</dt><dd>"+obj.weight+"</dd></dl>");
				$(".goodsimg-r-1").append("<dl><dt>参考运费</dt><dd>"+obj.weightprice+"</dd></dl>");
				$(".goodsimg-r").append("<div class=goodsimg-r-2><h5><p id='warn'>单件商品一次购买不能超过6个，否则将判定为非个人自用物品被海关退运！</p></h5><input id='addcart' type=button value=加入购物车 ><input type=button value=加入收藏  /></div>")		
			
			}
	
})


