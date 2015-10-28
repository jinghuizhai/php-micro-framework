<?php
	abstract class Model{
		protected $registry;
		function __construct($registry){
			$this->registry = $registry;
		}
		function __get($key){
			return $this->registry->get($key);
		}
	}
?>