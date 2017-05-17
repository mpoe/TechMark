<?php
	// UPDATE EVENT
    // For indexing - know which event we are working with is correct
	$sId = $_GET['id'];
	//Fields to update
	$sPartnerName = $_GET['title'];
	$sPartnerWebsite = $_GET['website'];
	$sPartnerMail = $_GET['mail'];

	$sFileName = "../../data/partners.txt";

	$sajPartners = file_get_contents( $sFileName );
	$ajPartners = json_decode( $sajPartners );
	if( !is_array($ajPartners ) ){
		$ajPartners = [];
	}

	// edit the object
	for( $i = 0; $i < count($ajPartners) ; $i++ ){
		// check if the ids match
		if( $sId ==  $ajPartners[$i]->sID  ){
			// echo $ajPartners[$i]->sUniqueId;
			// update the Partners based on the position in the array
			$ajPartners[$i]->sPartnerName = $sPartnerName;
			$ajPartners[$i]->sPartnerWebsite = $sPartnerWebsite;
			$ajPartners[$i]->sPartnerMail = $sPartnerMail;
			break;
		}
	}

	// object to text
	$sajPartners = json_encode( $ajPartners , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

	// save the data in the file
	file_put_contents( $sFileName , $sajPartners );

	echo '{"status":"ok"}';
?>