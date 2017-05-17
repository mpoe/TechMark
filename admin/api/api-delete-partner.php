<?php
	
	$sIdToDelete = $_GET['id'];

	$sFileName = "../../data/partners.txt";

	//String of an array of json objects (file has this syntax)
	$sajPartners = file_get_contents($sFileName);

	//Decode turns string into computer code, for the purpose of checking if the information is "valid"
	$ajPartners = json_decode($sajPartners);
	
	//If the array is not the correct format (for whatever reason), return an error message
	if( !is_array($ajPartners) ){
		echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
		exit;
	}


	for($i = 0; $i < count($ajPartners);$i++){
		if($sIdToDelete == $ajPartners[$i]->sID)
		{
			array_splice($ajPartners,$i,1);
		}
	}


	// SUCCESS, the text is valid, now return it to a string, so we can echo it
	$sajPartners = json_encode( $ajPartners , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
	file_put_contents($sFileName, $sajPartners);
?>