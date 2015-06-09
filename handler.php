<?php
if (is_ajax()) {
  if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "insert": addNewAcufene(); break;
    }
  }
}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function addNewAcufene(){

  $adress =  $_POST['address'];

  $filename = "savedArray.txt"
  
  $handle = fopen($filename, "r");
  $contents = fread($handle, filesize($filename));
  fclose($handle);

  $listAddress = unserialize($contents);
  $listAddress[hash("sha256",$adress)]++;  

  file_put_contents($filename, serialize($listAddress));



  $return["status"] = "ok";
  
  //Do what you need to do with the info. The following are some examples.
  //if ($return["favorite_beverage"] == ""){
  //  $return["favorite_beverage"] = "Coke";
  //}
  //$return["favorite_restaurant"] = "McDonald's";
  
  $return["json"] = json_encode($return);
  echo json_encode($return);
}
?>
