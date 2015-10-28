<?php
	class ControllerUser extends Controller{
		/*
		* route == http://127.0.0.1/php-micro-framework/admin/user
		* or 
		* route == http://127.0.0.1/php-micro-framework/admin/user/index
		*/
		function index(){
			$result = $this->load->model('user')->findById(8676);
			return $this->load->view('user',array('user'=>$result));
		}
		/*
		* route == http://127.0.0.1/php-micro-framework/admin/user/test
		*/
		function test(){
			return 'admin/controller/test';
		}
	}
?>