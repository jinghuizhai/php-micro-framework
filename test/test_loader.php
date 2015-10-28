<?php
	// error_reporting(none);
	require('../config.php');
	require('../engine/registry.php');
	require('../engine/loader.php');
	$registry = new registry;
	$loader = new Loader;
	$user = $loader->model('user');
	var_dump($user);
	$user2 = $loader->model('User');
	var_dump($user2);
	$user3 = $loader->controller('user');
	var_dump($user3);
	$user4 = $loader->controller('User');
	var_dump($user4);

	$user5 = $loader->controller('errorUser');
	$user6 = $loader->model('errorUser');
	echo $view = $loader->view('user',array('user'=>123));
	echo $view = $loader->view('user',array('user'=>123),'haha','hehe');
	echo $loader->view('erroruser');
?>