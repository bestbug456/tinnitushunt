<?php

function addData($id,$cap){
	$database = connectToDb();
	if(!$database){
		return false;
	}
	if(!executeCommand($database,"insert",array($id,$cap))){
		return false;
	}else{
		return true;
	}
}

function getData($id){
	$database = connectToDb();
	if(!$database){
		return false;
	}
	if(!executeCommand($database,"get",$id)){
		return false;
	}else{
		return true;
	}
}

function connectToDb(){
	$data = file_get_contents(dirname(__FILE__)."/authDB.txt");
	$auth = explode("-", $data);
	return new mysqli($auth[0], $auth[1], $auth[2], $auth[3]);
}

function executeCommand($database,$action,$ArrayValue){
	switch($action) {
      case "insert": return insertDataToDb($database,$ArrayValue);
      case "get": return getDataFromDb($database,$ArrayValue);
    }
}

function insertDataToDb($database,$ArrayValue){
	$query = "INSERT INTO answer (id, cap) VALUES(".$ArrayValue[1].", ".$ArrayValue[0].") ON DUPLICATE KEY UPDATE    
cap=".$ArrayValue[0];
	$result = $database->query($query);
	if(!$result){
		$GLOBALS['errorSql'] = $database->error;
		return false;
	}else
		return true;

}

function getDataFromDb($database,$id){
	$query = "SELECT * FROM answer WHERE id=".$id;
	$result = $database->query($query);
	
	if(!$result){
		$GLOBALS['errorSql'] = $database->error;
		return false;
	}else{
		$GLOBALS['dataUser'] = $result->fetch_assoc();
		return true;
	}
}


?>