<?php
	// error_reporting(0);
	require('../engine/zjhsql.php');
	$db = ZjhSql::getInstance('localhost','aida','root','');
	//获取省
	function retObj($data){
		$html = file_get_contents("http://japi.zto.cn/zto/api_utf8/baseArea?msg_type=GET_AREA&data=".$data);	
		return json_decode("[".$html."]")[0];
	}
	function logs($str){
		echo $str;
		echo "<br/>";
	}
	set_time_limit(0);
	$province = retObj(0);
	
	if($province->message == ''){
		$provinces = $province->result;
		foreach($provinces as $key => $value){
			$db->exec('insert into 	`provinces` set provinceid=?,province=?',array($value->code,$value->fullName));
			$city = retObj($value->code);
			logs($value->code.$value->fullName);
			if($city->message == ''){
				$cities = $city->result;
				foreach($cities as $k => $v){
					logs($v->code.$v->fullName);
					$db->exec('insert into `cities` set cityid=?,city=?,provinceid=?',array($v->code,$v->fullName,$value->code));
					$area = retObj($v->code);
					if($area->message == ''){
						$areas = $area->result;
						foreach($areas as $k_a => $v_a){
							logs($v_a->code.$v_a->fullName);
							$db->exec('insert into `areas` set areaid=?,area=?,cityid=?',array($v_a->code,$v_a->fullName,$v->code));
						}
					}
				}
			}
		}
	}
	echo 'done';
?>