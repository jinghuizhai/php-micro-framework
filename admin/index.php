<?php
	date_default_timezone_set('PRC');
	$time = time();
	session_start();
	require_once('config.php');
	require_once(ENGINE.'adminAction.php');
	require_once(ENGINE.'controller.php');
	require_once(ENGINE.'loader.php');
	require_once(ENGINE.'model.php');
	require_once(ENGINE.'registry.php');
	require_once(ENGINE.'request.php');
	require_once(ENGINE.'response.php');
	require_once(ENGINE.'session.php');
	require_once(ENGINE.'zjhsql.php');

	$registry = new Registry;
	$req = new request;
	$res = new Response;
	$session = new Session;
	$load = new Loader($registry);
	
	$db = ZjhSql::getInstance(SERVERNAME,DBNAME,USERNAME,PASSWORD);

	$res->addHeader('Content-Type: text/html; charset=utf-8');

	$registry->set('req',$req);
	$registry->set('res',$res);
	$registry->set('session',$session);
	$registry->set('load',$load);
	$registry->set('db',$db);

	$route = $req->server['REQUEST_URI'];
	$action = new Action($route);
	$output = $action->execute($registry);
	$res->setOutput($output);
	$res->output();
?>