<?php
	class Registry{
		private $data = array();
		
		function get($key){
			return isset($this->data[$key]) ? $this->data[$key] : null;
		}
		function set($key,$value){
			$this->data[$key] = $value;
		}
		function has($key){
			return isset($this->data[$key]);
		}
	}

?>