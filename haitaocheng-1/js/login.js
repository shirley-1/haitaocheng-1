onload =function(){
	ipt = document.getElementsByTagName("input");
	
	var date = $.cookie("user");
	console.log(date);
	if(date){
		date = JSON.parse(date);
		$(".ipt1").val(date.username);
		$(".ipt2").val(date.password);
	}

	ipt[3].onclick=function(){
//		console.log(1);
		
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://127.0.0.1/haitaocheng-1/php/login.php", true);
	    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	    xhr.send("username="+ ipt[0].value + "&password=" + ipt[1].value);
	    
	    xhr.onreadystatechange = function(){
	    	
	    	if(xhr.readyState == 4 && xhr.status == 200){
	    		console.log(xhr.responseText);
	    		
	    		str = JSON.parse(xhr.responseText);
	    		
	    		if (str.status == 1){//登录成功
	    			if($(".ipt7").prop("checked")){
	    				obj = {
	    					"username":ipt[0].value,
	    					"password":ipt[1].value
	    				}
	    				$.cookie("user",JSON.stringify(obj),{expires:30, path:"/"})
	    			}
	    				$(".erro h1").html("").hide();
		    			location.href = "index.html";
	    			}
	    		
	    		}
	    		else{//登录失败
	    			$(".erro h1").html("登录失败,请检查用户名或密码是否有效").show();
	    		}
	    		
	    	}
	    }
}
