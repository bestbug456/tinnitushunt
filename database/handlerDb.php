<?php

function addData($ArrayValue){
	$database = connectToDb();
	if(!$database){
		return false;
	}
	if(!executeCommand($database,"insert",$ArrayValue)){
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

function getTotalFromDb(){
	$database = connectToDb();
	if(!$database){
		return false;
	}
	$result = executeCommand($database,"getTotal",NULL);
	if(!$result){
		return false;
	}else{
		return $result;
	}
}

function getListZips(){
	$database = connectToDb();
	if(!$database){
		return false;
	}
	$result = executeCommand($database,"getListOfZips",NULL);
	if(!$result){
		return false;
	}else{
		return $result;
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
      case "getTotal": return getTotalTinnitus($database);
      case "getListOfZips": return getListOfZips($database);
    }
}

function insertDataToDb($database,$ArrayValue){
	$query = "INSERT INTO answer (id, cap,senti,inizio,patologie,suoni,andamento,notare,storia,miglioramento,sesso,nascita,email,indirizzo) VALUES(".$ArrayValue[0].", ".$ArrayValue[1].", ".$ArrayValue[2].", '".$ArrayValue[3]."', ".$ArrayValue[4].", ".$ArrayValue[5].", ".$ArrayValue[6].", ".$ArrayValue[7].", '".$ArrayValue[8]."', '".$ArrayValue[9]."', ".$ArrayValue[10].", ".$ArrayValue[11].", '".$ArrayValue[12]."','".$ArrayValue[13]."') ON DUPLICATE KEY UPDATE    
cap=".$ArrayValue[1].",senti=".$ArrayValue[2].",inizio='".$ArrayValue[3]."',patologie=".$ArrayValue[4].",suoni=".$ArrayValue[5].",andamento=".$ArrayValue[6].",notare=".$ArrayValue[7].",storia='".$ArrayValue[8]."',miglioramento='".$ArrayValue[9]."',sesso=".$ArrayValue[10].",nascita=".$ArrayValue[11].",email='".$ArrayValue[12]."',indirizzo='".$ArrayValue[13]."'";
	$result = $database->query($query);
	if(!$result){
		$GLOBALS['errorSql'] = $database->error;
		$database->close();
		$result->close();
		return false;
	}else
		return true;

}

function getDataFromDb($database,$id){
	$query = "SELECT * FROM answer WHERE id=".$id;
	$result = $database->query($query);
	
	if(!$result){
		$GLOBALS['errorSql'] = $database->error;
		$database->close();
		$result->close();
		return false;
	}else{
		$database->close();
		$GLOBALS['dataUser'] = $result->fetch_assoc();
		$result->close();
		return true;
	}
}

function getTotalTinnitus($database){
	$query = "SELECT * FROM answer";
	$result = $database->query($query);
	
	if(!$result){
		$database->close();
		$GLOBALS['errorSql'] = $database->error;
		return false;
	}else{
		$database->close();
		return $result->num_rows;
	}
}

function getListOfZips($database){
	$query = "SELECT DISTINCT indirizzo FROM answer";
	$result = $database->query($query);
	
	if(!$result){
		$database->close();
		$GLOBALS['errorSql'] = $database->error;
		return false;
	}else{
		$database->close();
		$arrayResult = array();
		while ($row = $result->fetch_assoc())
			array_push($arrayResult, $row);
		return $arrayResult;
	}
}

?>