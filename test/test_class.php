<?php
	require('../engine/controller.php');
	$path = "D:/wamp/www/ida/admin/controller/";
	$dirs = scandir($path);
	var_dump($dirs);
	$class = array();
	foreach($dirs as $key => $value){
		if($value == '.' || $value == '..') continue;
		$class[] = 'Controller'.ucfirst(basename($path.$value,'.php'));
		require($path.$value);
	}
	foreach($class as $key => $value){
		echo $value;
		echo '<br/>';
		echo var_dump(get_class_methods($value));
	}
?>