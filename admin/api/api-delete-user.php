<?php
	
	$sIdToDelete = $_GET['id'];

	$sFileName = "../../data/users.txt";

	//String of an array of json objects (file has this syntax)
	$sajUsers = file_get_contents($sFileName);

	//Decode turns string into computer code, for the purpose of checking if the information is "valid"
	$ajUsers = json_decode($sajUsers);
	
	//If the array is not the correct format (for whatever reason), return an error message
	if( !is_array($ajUsers) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}


	for($i = 0; $i < count($ajUsers);$i++){
		if($sIdToDelete == $ajUsers[$i]->sID)
		{
			array_splice($ajUsers,$i,1);
		}
	}


	// SUCCESS, the text is valid, now return it to a string, so we can echo it
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
	file_put_contents($sFileName, $sajUsers);
?>