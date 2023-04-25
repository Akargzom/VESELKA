<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type , Accept");
header("Content-Type: application/json");
$json = file_get_contents("../DB/DB.json");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = json_decode($json, true);
    $data = file_get_contents("php://input", "./backend.php");
    $json_data[json_decode(stripslashes($data), true)['post']] = json_decode(stripslashes($data), true)['content'];
    file_put_contents('../DB/DB.json', json_encode($json_data));
}else{
print_r($json);
}
?>