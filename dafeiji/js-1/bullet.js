class Base {
	constructor(){
		//属性--创建子弹
		this.ele=document.createElement("div");
		
		//属性--子弹id
		this.id=parseInt(Math.random()*10000000);
	}
	
class Bullet extends Base {
	//继承基类属性
	constructor(){
		super();
	}
	
	//方法：
	//初始化
	init(){
		this.ele=document.createElement("div");//创建子弹
		this.ele.className="bullet";
		gameEngine.ele.appendChild(this.ele)//添加到页面中
		gameEngine.allbullet[this.id] = this;//将每个id赋值给子弹
		
		this.ele.style.left = myplane.ele.offsetLeft + myplane.ele.offsetWidth/2 -this.ele.offsetWidth/2 + "px";
		this.ele.style.top = myplane.ele.offsetTop - this.ele.offsetHeight + "px";
		return this;
	}
	
	//移动
	
	move(){
		let that = this;
		this.timer = setInterval(()=>{
			let y = that.ele.offsetTop - 10;
			if(y<-18){
				clearInterval(that.timer); //停止移动
				gameEngine.ele.removeChild(that.ele); //移除子弹
				
				delete gameEngine.allbullet[that.id]//移除id
			}
			else{
				that.ele.style.top = y + "px";
			}
		},50)
	}
	
	boom(){
		clearInterval(this.timer);//停止移动
		this.ele.className = "bullet-die"
		let dieImg = ["images/die1.png", "images/die2.png"]
		let i=0;
		let that = this;
		let dietimer = setInterval(()=>{
			if(i>=1){
				clearInterval(dietimer);//停止运动
				gameEngine.ele.removeChild(that.ele)//移除子弹
			}
			that.ele.background = "url("+dieImg[++i]+")"
		},30)
		
	}
	
}
	
	
	
