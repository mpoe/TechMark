<?php
	// UPDATE EVENT
    // For indexing - know which event we are working with is correct
	$sId = $_GET['id'];
	//Fields to update
	$sEventTitle = $_GET['title'];
	$sEventTag = $_GET['tag'];
	$sEventDescription = $_GET['description'];
	$sEventLocation = $_GET['location'];
	$sEventDate = $_GET['date'];
	$sEventPrice = $_GET['price'];

	$sFileName = "../../data/events.txt";

	$sajEvents = file_get_contents( $sFileName );
	$ajEvents = json_decode( $sajEvents );
	if( !is_array($ajEvents ) ){
		$ajEvents = [];
	}

	// edit the object
	for( $i = 0; $i < count($ajEvents) ; $i++ ){
		// check if the ids match
		if( $sId ==  $ajEvents[$i]->sID  ){
			// echo $ajEvents[$i]->sUniqueId;
			// update the Event based on the position in the array
			$ajEvents[$i]->sTitle = $sEventTitle;
			$ajEvents[$i]->sTag = $sEventTag;
			$ajEvents[$i]->sDescription = $sEventDescription;
			$ajEvents[$i]->sLocation = $sEventLocation;
			$ajEvents[$i]->sDate = $sEventDate;
			$ajEvents[$i]->sPrice = $sEventPrice;

			break;
		}
	}

	// object to text
	$sajEvents = json_encode( $ajEvents , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajEvents );

	echo '{"status":"ok"}';
?>