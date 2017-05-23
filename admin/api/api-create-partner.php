<?php
	// CREATE USER
	$sPartnerName = $_POST['name'];
	$sPartnerWebsite = $_POST['website'];
	$sPartnerMail = $_POST['mail'];

						//Name of field   //tmp name , //to directory 			// 'name' the users filename 
	move_uploaded_file ($_FILES['image']['tmp_name'] , "../../img/partners/" . $_FILES['image']['name']);


	// file to get contents to compare with
	$sFileName = "../../data/partners.txt"; // This is the file+path to it

	//Open file
	$sajPartners = file_get_contents($sFileName);
	//Turn the string into an array
	$ajPartners = json_decode( $sajPartners );
	//If the file couldn't get read/doesn't exist
	if( !is_array($ajPartners ) ){
		$ajPartners = [];
	}
	//Create the new object
	$jPartner = json_decode('{}'); // to make the json object
	$jPartner->sID = (string)($ajPartners[count($ajPartners)-1]->sID+1);
	$jPartner->sPartnerName = $sPartnerName;
	$jPartner->sPartnerWebsite = $sPartnerWebsite;
	$jPartner->sPartnerMail = $sPartnerMail;
	$jPartner->sPartnerLogo = $_FILES['image']['name']; //The filename


	// push it to the array
	array_push( $ajPartners , $jPartner );
	// turn the object into text
	$sajPartners = json_encode( $ajPartners , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	// save the data to the file
	file_put_contents($sFileName , $sajPartners );

	echo '{"status":"ok"}';
?>