<?php
	class Action{
		private $file;
		private $class;
		private $method;
		private $originalClass;
		private $args = array();
		function __construct($route,$args=array()){
			if(strpos($route,'/?') == 0){
				$route = str_replace('?', '/?', $route);
			}
			$params = explode('/', $route);
			foreach($params as $key => $value){
				if($key == 0 || $key == 1) continue;
				if($key == 2 && $value != ''){
					$this->originalClass = preg_replace('/[^a-zA-Z0-9_]/','',$value);
					$this->class = 'Controller'.ucfirst(preg_replace('/[^a-zA-Z0-9_]/','',$value));
					$this->file = CONTROLLER.$value.'.php';
				}
				if($key == 3 && $value != ''){
					if(is_numeric($value)){
						$this->method = 'index';
						$args[] = $value;
					}else{
						$this->method = $value;
					}
				}
				if($key > 3 && $value != ''){
					$args[] = $value;
				}
			}
			if(empty($this->method)){
				$this->method = 'index';
			}
			if($args){
				$this->args = $args;
			}
		}
		private function doexecute($registry){
			if(is_file($this->file)){
				require_once($this->file);
			}else{
				trigger_error('can not loading controller file:'.$this->file);
			}
			$class = $this->class;
			$controller = new $class($registry);
			if(is_callable(array($controller,$this->method))){
				return call_user_func(array($controller,$this->method),$this->args);
			}else{
				return false;
			}
		}
		function execute($registry){
			//过滤程序
			return $this->doexecute($registry);
		}
	}	
?>