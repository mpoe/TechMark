<?php
	// CREATE USER
	$sUserName = $_POST['username'];
	$sPassword = $_POST['password'];

	// file to get contents to compare with
	$sFileName = "../../data/users.txt"; // This is the file+path to it

	//Open file
	$sajUsers = file_get_contents($sFileName);
	//Turn the string into an array
	$ajUsers = json_decode( $sajUsers );
	//If the file couldn't get read/doesn't exist
	if( !is_array($ajUsers ) ){
		$ajUsers = [];
	}
	//Create the new object
	$jUser = json_decode('{}'); // to make the json object
	$jUser->sID = (string)($ajUsers[count($ajUsers)-1]->sID+1);
	$jUser->sUsername = $sUserName;
	$jUser->sPassword = $sPassword;

	// push it to the array
	array_push( $ajUsers , $jUser );
	// turn the object into text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	// save the data to the file
	file_put_contents($sFileName , $sajUsers );

	echo '{"status":"ok"}';
?>