<?php
	class ControllerUser extends Controller{
		/*
		* route == http://127.0.0.1/php-micro-framework/user
		* or 
		* route == http://127.0.0.1/php-micro-framework/user/index
		*/
		function index(){
			$result = $this->load->model('user')->findById(8676);
			return $this->load->view('user',array('user'=>$result));
		}
		function login(){
			$post = $this->req->post;
			if(count($post)){
				$name = $post['name'];
				return 'your input name is '.$name;
			}else{
				return $this->load->view('user');
			}
		}
	}
?>