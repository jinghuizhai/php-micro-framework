<?php
	require('../engine/action.php');	
	$url = '/ida/catalog/';
	$action = new Action($url);
	echo $action->test();
?>