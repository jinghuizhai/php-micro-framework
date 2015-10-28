<?php
	class ModelUser extends Model{
		function findById($id){
			return $this->db->queryOne('select * from `user` where id =?',$id);
		}
	}
?>