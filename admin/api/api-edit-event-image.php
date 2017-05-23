<?php

	$eventID = $_POST['id'];

	// Upload image

						//Name of field   //tmp name , //to directory 			// 'name' the Events filename 
	move_uploaded_file ($_FILES['image']['tmp_name'] , "../../img/events/" . $_FILES['image']['name']);

	$sFileName = "../../data/events.txt";

	$sajEvents = file_get_contents( $sFileName );
	$ajEvents = json_decode( $sajEvents );
	if( !is_array($ajEvents ) ){
		$ajEvents = [];
	}

	// edit the object
	for( $i = 0; $i < count($ajEvents) ; $i++ ){
		// check if the ids match
		if( $eventID == $ajEvents[$i]->sID){
			// update the Event based on the position in the array
			if(!empty($_FILES['image']['name'])){
			$ajEvents[$i]->sImage = $_FILES['image']['name'];
			break;
			}
		}
	}

	// object to text
	$sajEvents = json_encode( $ajEvents , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajEvents );

	echo '{"status":"ok"}';
?>