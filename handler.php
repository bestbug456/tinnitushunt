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

  $filename = "savedArray.txt";
  $contents = file_get_contents($filename);
  if($contents != ""){
    $listAddress = unserialize($contents);
  }else{
    $listAddress = array();
  }

  if($listAddress[hash("sha256",$adress)] != NULL)
    $listAddress[hash("sha256",$adress)]++; 
  else
    $listAddress[hash("sha256",$adress)]=1;

  file_put_contents($filename, serialize($listAddress));



  $return["status"] = "ok";
  $return["address_count"] = $listAddress[hash("sha256",$adress)];
  
  //Do what you need to do with the info. The following are some examples.
  //if ($return["favorite_beverage"] == ""){
  //  $return["favorite_beverage"] = "Coke";
  //}
  //$return["favorite_restaurant"] = "McDonald's";
  
  $return["json"] = json_encode($return);
  echo json_encode($return);
}
?>