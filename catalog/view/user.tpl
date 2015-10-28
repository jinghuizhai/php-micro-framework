<?php var_dump($user); ?>
<form action="<?php echo HOSTNAME;?>user/login" method='post'>
	<input type="text" name="name" placeholder='name' />
	<button>确定</button>
</form>