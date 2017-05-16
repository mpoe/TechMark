<?php

	$sFileName = "../../data/partners.txt";

	//String of an array of json objects (file has this syntax)
	$sajPartners = file_get_contents($sFileName);
	
	echo $sajPartners;
?>