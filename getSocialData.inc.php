<?php
session_start();
header('Content-type: application/json');
$return['data'] = $_GET['callback'] . '(' . "{$_SESSION["userProfile"]}" . ')';

$return["json"] = json_encode($return);
echo json_encode($return);
?>