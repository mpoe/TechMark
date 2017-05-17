<?php
	// UPDATE USER
    // For indexing - know which user is correct
	$sId = $_GET['id'];
	//Fields to update
	$sUsername = $_GET['username'];
	$sPassword = $_GET['password'];

	$sFileName = "../../data/users.txt";

	$sajUsers = file_get_contents( $sFileName );
	$ajUsers = json_decode( $sajUsers );
	if( !is_array($ajUsers ) ){
		$ajUsers = [];
	}

	// edit the object
	for( $i = 0; $i < count($ajUsers) ; $i++ ){
		// check if the ids match
		if( $sId ==  $ajUsers[$i]->sID  ){
			// echo $ajUsers[$i]->sUniqueId;
			// update the user based on the position in the array
			$ajUsers[$i]->sUsername = $sUsername;
			$ajUsers[$i]->sPassword = $sPassword;
			break;
		}
	}

	// object to text
	$sajUsers = json_encode( $ajUsers , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajUsers );

	echo '{"status":"ok"}';
?>