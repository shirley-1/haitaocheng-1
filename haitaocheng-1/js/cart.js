$(function(){
	date = $.cookie("goods");
	
	if(date){
		date = JSON.parse(date);
		if(date.length>0){
			var total = 0;
			for(var i =0 ;i<date.length ; i++){
//				console.log(date[0].select)
				if(date[i].select){

					var td1 = $("<td><img src=" + date[i].img + "/ id='img'><p id='name'>" + date[i].name +"</p></td>")
					var td2 = $("<td><i>￥</i><span id='price'>" +date[i].price + "</span></td>")
					var td3 = $("<td id ='num'>"+ date[i].num+"</td>");
					
					var tr = $("<tr></tr>").append(td1).append(td2).append(td3);
					
					$(".cart-tb").append(tr);
					
					total += date[i].num*date[i].price
					$(".tp").html(total)
				}
			}
		}
	}
})
