<?php
	// CREATE EVENT
	$sEventTitle = $_POST['title'];
	$sEventTag = $_POST['tag'];
	$sEventDescription = $_POST['description'];
	$sEventLocation = $_POST['location'];
	$sEventDate = $_POST['date'];
	$sEventPrice = $_POST['price'];

						//Name of field   //tmp name , //to directory 			// 'name' the users filename 
		move_uploaded_file ($_FILES['image']['tmp_name'] , "../../img/events/" . $_FILES['image']['name']);


	// file to get contents to compare with
	$sFileName = "../../data/events.txt"; // This is the file+path to it

	//Open file
	$sajEvents = file_get_contents($sFileName);
	//Turn the string into an array
	$ajEvents = json_decode( $sajEvents );
	//If the file couldn't get read/doesn't exist
	if( !is_array($ajEvents ) ){
		$ajEvents = [];
	}
	//Create the new object
	$jEvent = json_decode('{}'); // to make the json object
	$jEvent->sID = (string)($ajEvents[count($ajEvents)-1]->sID+1);
	$jEvent->sTitle = $sEventTitle;
	$jEvent->sTag = $sEventTag;
	$jEvent->sDescription = $sEventDescription;
	$jEvent->sLocation = $sEventLocation;
	$jEvent->sDate = $sEventDate;
	$jEvent->sPrice = $sEventPrice;
	$jEvent->sImage = $_FILES['image']['name']; //Filename


	// push it to the array
	array_push( $ajEvents , $jEvent );
	// turn the object into text
	$sajEvents = json_encode( $ajEvents , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	// save the data to the file
	file_put_contents($sFileName , $sajEvents );

	echo '{"status":"ok"}';
?>