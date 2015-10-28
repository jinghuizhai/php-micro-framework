<?php
	require('../engine/registry.php');
	$registry = new Registry();
	$registry->set('a',"1");
	$registry->set('b',"2");
	echo $registry->get('a');
	echo "<br/>";
	echo $registry->has('b');
	echo "<br/>";
	echo $registry->has('c');
	echo "<br/>";
	echo $registry->get('d');
?>