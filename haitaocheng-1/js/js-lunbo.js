
function lunbo(){
	var li1=document.getElementsByClassName("banner-li1");
	var li2=document.getElementsByClassName("banner-li2");
	var bannerbox=document.getElementsByClassName("banner-box")[0]
	
	var size=li1.length;//li长度
	var i=0;//li下标
	 	timer = setInterval(function(){
	 	i++;	
		move()
	 },3000)
	 
	 function move(){
	 	
	 	if(i>=size) i=0;//设置右边界
	 	if(i<0) i=5;//设置左边界
	 		for(var j=0; j<size ; j++){
	 			if(i==j){
	 				animate(li1[j],{opacity:100})
	 				li2[j].style.background = "#ff9000"
	 			}
	 			else{
	 				animate(li1[j],{opacity:0})
	 				li2[j].style.background = "#fff"
	 			}
	 		}
	 	}
		bannerbox.onmouseover=function(){
			clearInterval(timer);//鼠标划入关闭轮播图
		}
 		bannerbox.onmouseleave=function(){//鼠标离开开启轮播图
			clearInterval(timer);
			timer=setInterval(function(){
				i++;	
				move()
			},3000)
		}
 		
 		for (var j=0; j<li2.length; j++) {
			li2[j].index = j;
			li2[j].onmouseenter = function(){
				i = this.index;
				move();
			}
		}
}
