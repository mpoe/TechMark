<?php

	$PartnerID = $_POST['id'];
	// Upload image

						//Name of field   //tmp name , //to directory 			// 'name' the Partners filename 
	move_uploaded_file ($_FILES['image']['tmp_name'] , "../../img/partners/" . $_FILES['image']['name']);

	$sFileName = "../../data/partners.txt";

	$sajPartners = file_get_contents( $sFileName );
	$ajPartners = json_decode( $sajPartners );
	if( !is_array($ajPartners ) ){
		$ajPartners = [];
	}

	print_r($ajPartners);
	// edit the object
	for( $i = 0; $i < count($ajPartners) ; $i++ ){
		// check if the ids match
		if( $PartnerID == $ajPartners[$i]->sID){
			// update the Partner based on the position in the array
			$ajPartners[$i]->sPartnerLogo = $_FILES['image']['name'];
			break;
		}
	}

	// object to text
	$sajPartners = json_encode( $ajPartners , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajPartners );

	echo '{"status":"ok"}';
?>