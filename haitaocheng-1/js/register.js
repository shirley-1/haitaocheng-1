$(function(){
	var flag1=true;
	var flag2=true;
	var flag3=true;
	var flag4=true;
	var flag5=false;
	//用户名验证
	$(".ipt1").keyup(function(){
		ipt1();
	})
	
	function ipt1(){
		if((/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[05-9]))\d{8}$/.test($(".ipt1").val())) || (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/ .test($(".ipt1").val()))){
			flag1 = true;
			$(".erro h1").hide();
		}
		else{
			$(".erro h1").html("请填写真实有效的邮箱地址或手机号码").show();
			flag1 = false; 
		}
	}
	
	$(".ipt1").focus(function(){
		ipt1();
		$(".ipt1").css("border-color","#75abf3").siblings().css("border-color","#ccc");
	})
	
	
	//密码框验证
	$(".ipt2").keyup(function(){
		ipt2();
	})
	
	function ipt2(){
		if( /^[0-9A-Za-z]{6,16}$/.test($(".ipt2").val())){
			flag2 = true; 
			$(".erro h1").hide();
		}
		else{
			$(".erro h1").html("请输入6-16位英文字母或数字组成的密码").show();
			flag2 = false;
		}
	}
	
	$(".ipt2").focus(function(){
		ipt2();
		$(".ipt2").css("border-color","#75abf3").siblings().css("border-color","#ccc")
	})
	
	//重复密码验证
	$(".ipt3").keyup(function(){
		ipt3();
	})
	
	function ipt3(){
		if( $(".ipt3").val() == $(".ipt2").val() ){
			flag3 = true; 
			$(".erro h1").hide();
		}
		else{
			$(".erro h1").html("重复密码不正确").show();
			flag3 = false; 
		}
	}
	
	$(".ipt3").focus(function(){
		ipt3();
		$(".ipt3").css("border-color","#75abf3").siblings().css("border-color","#ccc")
	})
	
	
	//验证码验证
	$(".ipt4").keyup(function(){
		ipt4();
	})
	
	function ipt4(){
		if( $(".ipt4").val() == $(".ipt5").val() ){
			flag4 = true; 
			$(".erro h1").hide();
		}
		else{
			$(".erro h1").html("验证码不正确").show();
			flag4 = false; 
		}
	}
	
	//随机四位数验证码
	$("#click").click(function(){
		$(".ipt4").val("");
		ipt4();
		var arr=[];
		for(var i=0 ;i<4; i++){
			arr.push(parseInt(Math.random()*10))//随机一位数；
			var num = arr.join("") //将数字转成字符串
			$(".ipt5").val(num);
		}
	})
	
	//判断用户协议是否勾选
	$(".ipt7").click(function(){
		flag5 = $(this).prop("checked");
		$(".erro h1").html("").hide();
	})
	
	//判断注册
	$(".ipt6").click(function(){

		if(flag1 && flag2 && flag3 && flag4 & flag5){
			ajax1();
		}
		else{
			$(".erro h1").html("注册成失败，请检查用户名或密码格式是否正确！").show();
			if (flag5 == false){
				$(".erro h1").html("请先阅读《海淘橙用户协议》并勾选同意").show();
			}
		}
	})


	function ajax1(){
		 var xhr = new XMLHttpRequest();//
	        xhr.open("POST", "http://127.0.0.1/haitaocheng-1/php/register.php", true);
	        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	        xhr.send("username="+$(".ipt1").val()+ "&password="+$(".ipt2").val());
	        xhr.onreadystatechange = function(){
	            if (xhr.readyState==4 && xhr.status==200) {
//	                console.log(xhr.responseText);
					var str = xhr.responseText;
					str = JSON.parse(str);
//					console.log(str)
					if(str.status == 2){
						$(".erro h1").html("该用户名已经被注册").show();
					}
					if(str.status == 1){
//						$(".erro h1").html("注册成功").show();
						alert("注册成功!")
						location.href = "index.html"
					}
					
	            }
	    	}
	}

})