<?php

	$sFileName = "../../data/events.txt";

	//String of an array of json objects (file has this syntax)
	$sajEvents = file_get_contents($sFileName);
	
	echo $sajEvents;
?>