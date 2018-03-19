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

$sql = "SELECT * FROM layout order by `create_time` desc limit 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // 输出每行数据
    while($row = $result->fetch_assoc()) {
        // 从结果集中取得一行作为关联数组。
        echo json_encode($row);
    }
} else {
    echo json_encode($result->num_rows);
}

$conn->close();
?>