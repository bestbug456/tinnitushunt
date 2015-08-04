<?php
if (is_ajax()) {
  if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "insert": addNewAcufene(); break;
      case "getData": getInfoForm(); break;
      case "getTotal": getTotal();break;
      case "getListOfZips": getZips();break;
    }
  }
}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function addNewAcufene(){
  include_once dirname(__FILE__).'/database/handlerDb.php';
  if(addData(array($_POST['id'],$_POST['cap'],$_POST['senti'],$_POST['inizio'],$_POST['patologie'],$_POST['suoni'],$_POST['andamento'],$_POST['notare'],$_POST['storia'],$_POST['miglioramento'],$_POST['sesso'],$_POST['nascita'],$_POST['email'],$_POST['indirizzo'])))
    $return["status"] = "ok";
  else{
    $return["status"] = "error";
    $return['errorInfo'] = $GLOBALS['errorSql'];
  }

  $return["json"] = json_encode($return);
  echo json_encode($return);
}


function getInfoForm(){
  include_once dirname(__FILE__).'/database/handlerDb.php';
  $id = $_POST['id'];
  
  $info = getData($id);
  if($GLOBALS['dataUser'] == NULL & $info == true){
    $return["status"] = "ok";
    $return['info'] = "NOT_EXIST";
  }elseif($info == false){
    $return["status"] = "error";
    $return['errorInfo'] = $GLOBALS['errorSql'];
  }else{
    $return['status'] = "ok";
    $return['dataUser'] = $GLOBALS['dataUser'];
  }

  $return["json"] = json_encode($return);
  echo json_encode($return);
}

function getTotal(){
  include_once dirname(__FILE__).'/database/handlerDb.php';
  $info = getTotalFromDb();
  
  if(!$info){
    $return["status"] = "error";
    $return['errorInfo'] = $GLOBALS['errorSql'];
  }else{
    $return['status'] = "ok";
    $return['dataUser'] = $info;
  }

  $return["json"] = json_encode($return);
  echo json_encode($return);
}

function getZips(){
  include_once dirname(__FILE__).'/database/handlerDb.php';
  $info = getListZips();
  
  if(!$info){
    $return["status"] = "error";
    $return['errorInfo'] = $GLOBALS['errorSql'];
  }else{
    $return['status'] = "ok";
    $return['dataUser'] = $info;
  }

  $return["json"] = json_encode($return);
  echo json_encode($return);
}
?>
