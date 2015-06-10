<?php

session_start();
header('Content-type: text/html');
$provider = $_GET["provider"];
$config = dirname(__FILE__).'/hybridauth/config.php';
require_once( dirname(__FILE__).'/hybridauth/Hybrid/Auth.php' );
try {
    $hybridAuth = new Hybrid_Auth($config);
    $adapter = $hybridAuth->authenticate($provider);
    $_SESSION["userProfile"] = json_encode($adapter->getUserProfile());
    echo "<script type='text/javascript'>";
    echo "window.close();";
    echo "</script>";
} catch (Exception $e) {
    echo "Ooophs, we got an error: ";
}
?>