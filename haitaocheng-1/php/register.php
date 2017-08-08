<?php
	
	
header('Access-Control-Allow-Origin:*');
header("Content-Type:text/html;charset=utf8");



$username = $_POST["username"]; //用户名
$password = $_POST["password"]; //密码

class Res {
	public $status;
	public $msg;
}

$conn = new mysqli("127.0.0.1", "root", "", "user") or die("连接失败");
   $sql = "select * from books where username='$username'";
$result = $conn->query($sql);
if ($result && $result->num_rows>0) {
    //说明存在相同用户名
    //echo "用户名已经存在！";
    $res = new Res();
    $res->status = 2;
    $res->msg = "用户名已经存在！";
    echo  json_encode($res);
}
else {
    //说明不存在相同用户名
    //注册
    $sql2 = "insert into books(username,password) values('$username', '$password')";
    $result2 = $conn->query($sql2);
    if ($result2) {
        //echo "注册成功"
        $res = new Res();
        $res->status = 1;
        $res->msg = "注册成功";
        echo  json_encode($res);

    } else {
        //echo "注册失败";
        $res = new Res();
        $res->status = 0;
        $res->msg = "注册失败";
        echo  json_encode($res);
    }
}
$conn->close();
?>