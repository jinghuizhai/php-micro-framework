<?php
	//throw后程序立即停止
	function checkNum($num){
		if($num > 1){
			try{
				// throw new Exception('haha');
			}catch(Exception $e){
				throw new Exception('haha');
			}
			
		}
		return $num;
	}
	// echo checkNum(2);
	
	try{
		checkNum(2);	
	}catch(Exception $e){
		echo $e->getMessage();
	}

	
	
?>