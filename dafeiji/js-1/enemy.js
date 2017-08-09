


//创建敌机--多个种类
function Enemy(type){
	
	//属性--创建敌机
	this.ele=document.createElement("div");//创建
	this.id = parseInt(Math.random()*100000000);//页面上每个敌机取名字
	
	this.speed = 10;//速度
	this.hp = 1; //血量
	this.dieImgs = []; //爆炸时的图片数组
	this.score = 10; //敌机的分数
	
	
	//初始化
	this.init=function(){
		
		gameEngine.ele.appendChild(this.ele)//添加到页面中
		gameEngine.allenemy[this.id] = this;//将每个id赋值给敌机
		//判断三种飞机
		switch(type){
			case this.Enemy_Type_Large: //大型飞机
				this.ele.className = "enemy-large";
				this.speed = this.Enemy_Speed_Large;
				this.hp = this.Enemy_Hp_Large;
				this.dieImgs = ["images/plane3_die1.png", "images/plane3_die2.png", "images/plane3_die3.png", "images/plane3_die4.png", "images/plane3_die5.png", "images/plane3_die6.png"]
				this.score = 30;
				break;
				
			case this.Enemy_Type_Middle:  //中型飞机
				this.ele.className = "enemy-middle";
				this.speed = this.Enemy_Speed_Middle;
				this.hp = this.Enemy_Hp_Middle;
				this.dieImgs = ["images/plane2_die1.png", "images/plane2_die2.png", "images/plane2_die3.png", "images/plane2_die4.png"]
				this.score = 20;
				break;
				
			case this.Enemy_Type_Small: //小型飞机
				this.ele.className = "enemy-small";
				this.speed = this.Enemy_Speed_Small;
				this.hp = this.Enemy_Hp_Small;
				this.dieImgs = ["images/plane1_die1.png", "images/plane1_die2.png", "images/plane1_die3.png"]
				this.score = 10;
				break;
				
			default :
				console.log("error");
		}
		
		
		//随机位置
		this.ele.style.left = parseInt(Math.random() * (gameEngine.ele.offsetWidth - this.ele.offsetWidth)) + "px";
		this.ele.style.top = - this.ele.offsetHeight + "px";
		return this;
	}
	
	
	this.move=function(){
		var that = this ;
		var timer=setInterval(function(){
			var y = that.ele.offsetTop + that.speed;
			if(y>gameEngine.ele.offsetHeight){
				clearInterval(timer);//停止移动
				gameEngine.ele.removeChild(that.ele);//关闭定时器
				delete gameEngine.allenemy[that.id]//移除id
			}
			
			else {
				that.ele.style.top = y + "px";
			}
			
			
		},50)
	}
	//掉一滴血
	this.hurt = function(){
		this.hp--;
		if(this.hp==0){
			this.boom();
		}
	}
	
	this.boom = function(){
		clearInterval(this.timer);//关闭定时器，停止运动
		var that = this;
		var i=0;
		var dietimer=setInterval(function(){
			if(i>=that.dieImgs.length){
				clearInterval(dietimer);//停止爆炸
				gameEngine.ele.removeChild(that.ele); //移除敌机
			}
			else{
				that.ele.style.background = "url("+ that.dieImgs[i++] +")"
			}
		},100)
		
		
	}
}

Enemy.prototype = {
	Enemy_Type_Large: 1,  //大型飞机
	Enemy_Type_Middle: 2, //中型飞机
	Enemy_Type_Small: 3, //小型飞机
	
	Enemy_Speed_Large: 3, //大型飞机的速度
	Enemy_Speed_Middle: 5, //中型飞机的速度
	Enemy_Speed_Small: 8, //小型飞机的速度
	
	Enemy_Hp_Large: 8, //大型飞机的血量
	Enemy_Hp_Middle: 3, //中型飞机的血量
	Enemy_Hp_Small: 1 //小型飞机的血量
	
}
