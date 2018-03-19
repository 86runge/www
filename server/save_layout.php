<?php

// function_exists(date_default_timezone_set);//在这他总是返回1,这函数是判断这里面的字符是不是一个定义了的函数名 
// date_default_timezone_set("Etc/GMT");//这是格林威治标准时间,得到的时间和默认时区是一样的 
// date_default_timezone_set("Etc/GMT+8");//这里比林威治标准时间慢8小时 
// date_default_timezone_set("Etc/GMT-8");//这里比林威治标准时间快8小时 
date_default_timezone_set('PRC'); //设置中国时区 

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "test";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

$layout = $_REQUEST["layout"];
$data_now = date("Y-m-d H-i-s");

$sql = "INSERT INTO layout (layout_str, create_time)
VALUES ('$layout', '$data_now')";

if ($conn->query($sql) === TRUE) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>