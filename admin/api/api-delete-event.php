<?php
	
	$sIdToDelete = $_GET['id'];

	$sFileName = "../../data/events.txt";

	//String of an array of json objects (file has this syntax)
	$sajEvents = file_get_contents($sFileName);

	//Decode turns string into computer code, for the purpose of checking if the information is "valid"
	$ajEvents = json_decode($sajEvents);
	
	//If the array is not the correct format (for whatever reason), return an error message
	if( !is_array($ajEvents) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}


	for($i = 0; $i < count($ajEvents);$i++){
		if($sIdToDelete == $ajEvents[$i]->sID)
		{
			array_splice($ajEvents,$i,1);
		}
	}


	// SUCCESS, the text is valid, now return it to a string, so we can echo it
	$sajEvents = json_encode( $ajEvents , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
	file_put_contents($sFileName, $sajEvents);
?>