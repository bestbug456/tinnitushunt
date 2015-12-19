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
	$query = "INSERT INTO profile (id,email,indirizzo,contatto)
			VALUES (".$ArrayValue[0].", '".$ArrayValue[1]."', '".$ArrayValue[2]."', '".$ArrayValue[3]."')
			ON DUPLICATE KEY UPDATE email='".$ArrayValue[1]."',indirizzo='".$ArrayValue[2]."',contatto='".$ArrayValue[3]."'";
	$result = $database->query($query);
	if(!$result){
		$GLOBALS['errorSql'] = $database->error;
		$database->close();
		return false;
	}else{
		return saveNewGeoCode($ArrayValue[2],$ArrayValue[0],connectToDb());
	}
}

function saveNewGeoCode($address,$id, $database){
	$data = file_get_contents(dirname(__FILE__)."/authDB.txt");
	$auth = explode("-", $data);
	$address = urlencode($address);
	$url = "https://maps.google.com/maps/api/geocode/json?address=".$address."&components=country:IT&sensor=true&key=".$auth[4];
	$geocode=file_get_contents($url);
	$address= json_decode($geocode);

	$latitude = $address->results[0]->geometry->location->lat;
 	$longitude = $address->results[0]->geometry->location->lng;

	$query = "INSERT INTO geocode (latitude,longitude,id)
			VALUES ('".$latitude."', '".$longitude."',".$id.") ON DUPLICATE KEY UPDATE latitude='".$latitude."',longitude='".$longitude."'";
	$result = $database->query($query);
	if(!$result){
		$GLOBALS['errorSql'] = $database->error;
		$database->close();
		error_log($query.$database->error."\n", 3, "/var/tmp/my-errors.log");
		return false;
	}else{
		return true;
	}
}

function getDataFromDb($database,$id){
	$query = "SELECT * FROM profile WHERE id=".$id;
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
	$query = "SELECT * FROM profile";
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
	$query = "SELECT DISTINCT * FROM geocode";
	$result = $database->query($query);
	if(!$result){
		$database->close();
		$GLOBALS['errorSql'] = $database->error;
		return false;
	}else{
		$database->close();
		$arrayResult = array();
		$i=0;
		while ($row = $result->fetch_assoc()){
			
			$geocode[$i][0] = $row['latitude'];
			$geocode[$i][1] = $row['longitude'];
			array_push($arrayResult, $geocode);
		}
		return $arrayResult;
	}
}

?>
