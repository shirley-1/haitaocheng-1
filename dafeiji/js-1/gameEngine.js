//游戏引擎
var gameEngine = {
	
	//属性：游戏主界面
	ele:null,
	
	//属性：所有子弹和敌机
	allbullet:{},
	allenemy:{},
	//方法：
	
	//初始化
	init:function(){
		this.ele=document.getElementById("main");//给ele属性添加属性值（节点）
		return this;
	},
	
	//开始游戏
	start:function(){
		this.loadding(function(){
			console.log("游戏加载完毕");//加载完毕之后
			//创建我的飞机
			myplane.init().move();
			myplane.fire(); //开火
			
			//监听键盘
			gameEngine.listeningKeybord();
			
			//创建敌机
			gameEngine.createEnemy();
			
			//检测碰撞
			gameEngine.listeningCrash();
			
		})
	},
	
	//登录
	loadding:function(callback){//登录界面
		var logo=document.createElement("div");//添加飞机大战LOGO
			main.appendChild(logo);
			logo.className="logo";
						
		var load = document.createElement("div");
			load.className = "load";
			gameEngine.ele.appendChild(load);
			
		//加载动画
		var imgs = ["images/loading1.png", "images/loading2.png", "images/loading3.png"];
		var i=0;
		var timer=setInterval(function(){
			if(i>=5){//如果加载2次之后
				clearInterval(timer);//关闭定时器
				gameEngine.ele.removeChild(logo);//移除屏幕上的节点
				gameEngine.ele.removeChild(load);
				callback();//调用加载结束后的代码
			}
			else{
				load.style.background="url("+imgs[++i%3]+") no-repeat";
			}
			
		},500);
	},
	
	
	//键盘方法
	listeningKeybord: function(){
		
		var xSpeed = 0;
		var ySpeed = 0;
		window.onkeydown = function(e){
			e = e || event;
			if (e.keyCode == 37){ //左
				xSpeed = -10;
			}
			else if (e.keyCode == 39){ //右
				xSpeed = 10;
			}
			else if (e.keyCode == 38){ //上
				ySpeed = -10;
			}
			else if (e.keyCode == 40){ //下
				ySpeed = 10;
			}
		}
		window.onkeyup = function(){
			xSpeed = 0;
			ySpeed = 0;
		}
		setInterval(function(){
			var x = myplane.ele.offsetLeft + xSpeed;
			if (x < 0) {x = 0;}
			if (x > gameEngine.ele.offsetWidth-myplane.ele.offsetWidth) {
				x = gameEngine.ele.offsetWidth-myplane.ele.offsetWidth
			}
			myplane.ele.style.left = x + "px";
			myplane.ele.style.top = myplane.ele.offsetTop + ySpeed + "px";
		}, 30);
		
	},
	
	//创建敌机
	createEnemy: function(){
		
		//随机创建小型飞机
		setInterval(function(){
			var flag = Math.random()>0.4 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Small);
				enemy.init().move();
			}
		}, 2000);
		
		//随机创建中型飞机
		setInterval(function(){
			var flag = Math.random()>0.6 ? true : false;
			if (flag) {
				var  enemy = new Enemy(Enemy.prototype.Enemy_Type_Middle);
				 enemy.init().move();
			}
		}, 3000);
		
		//随机创建小型飞机
		setInterval(function(){
			var flag = Math.random()>0.5 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Large);
				enemy.init().move();
			}
		}, 8000);
		
	},
	
	listeningCrash: function(){
		console.log("检测碰撞")
		
		var isCrashMyPlane = false; //表示是否碰撞到我的飞机
		setInterval(function(){
	
			for (var i in gameEngine.allenemy) { //遍历所有页面上的敌机
				
				for (var j in gameEngine.allbullet) { //遍历所有页面上的子弹
					
					//如果某个子弹和某个敌机发生了碰撞
					if ( isCrash(gameEngine.allenemy[i].ele, gameEngine.allbullet[j].ele) ) {
						//console.log("发生了碰撞");
						
						//让子弹消失
						gameEngine.allbullet[j].boom(); //让子弹爆炸
						delete gameEngine.allbullet[j];  //将子弹对象从allBullet中移除
						
						//让敌机掉一滴血
						gameEngine.allenemy[i].hurt();
					}
					
				}
				
				//如果敌机和我的飞机发生了碰撞
				if ( !isCrashMyPlane && isCrash(gameEngine.allenemy[i].ele, myplane.ele)){
					isCrashMyPlane = true;
					//alert("Game Over");
					console.log("Game Over");
				}
			}
		}, 30);
	}
		
}



