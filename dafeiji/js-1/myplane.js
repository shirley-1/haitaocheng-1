var myplane={
	//添加属性--我的飞机
	ele:null,
	
	//添加属性--子弹发射速度
	fireInterval: 500, 
	
	//方法：
	//初始化
	init:function(){
		this.ele=document.createElement("div");//创建我的飞机
		this.ele.className="myplane";
		gameEngine.ele.appendChild(this.ele)//添加到页面中
		this.ele.style.left = (gameEngine.ele.offsetWidth - this.ele.offsetWidth)/2 + "px";
		this.ele.style.top = gameEngine.ele.offsetHeight-this.ele.offsetHeight + "px";
		return this;
	},
	
	//发射
	fire:function(){
		setInterval(function(){
			var bullet = new Bullet();
			bullet.init().move(); //初始化子弹对象并移动
		},myplane.fireInterval)
	},
	
	//移动
	move:function(){
		var that=this;
		this.ele.onmousedown=function(e){
			e = e || event;
			var disX = e.offsetX;
			var disY = e.offsetY;
			
				document.onmousemove = function(e){
				e.preventDefault();
				e = e || event;
				var x = e.pageX - disX - gameEngine.ele.offsetLeft;
				if (x < 0) {
					x = 0;
				}
				else if (x > gameEngine.ele.offsetWidth-myplane.ele.offsetWidth) {
					x = gameEngine.ele.offsetWidth-myplane.ele.offsetWidth;
				}
				myplane.ele.style.left = x + "px";
				myplane.ele.style.top = e.pageY - disY + "px";
				
			}
			
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
			}
		}
		
		
	}
}
