<?php

	$sFileName = "../../data/users.txt";

	//String of an array of json objects (file has this syntax)
	$sajUsers = file_get_contents($sFileName);
	
	echo $sajUsers;
?>