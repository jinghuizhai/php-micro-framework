# php-micro-framework
一个微型的php框架，它吸取了opencart的一些思想。
它的特点如下：
* MVC模式，前后端分离，容易掌握。
* 加载类库非常简单，不用在function中使用require，只需要$this->load->model('user')就引入了一个model层的php文件。
* 可以配置友好的路由；比如http://hostname/user,http://hostname/login,而不是http://hostname/login.php
* 可以用不同的类来响应游客和登录用户的访问，而不用每次都判断session中是否为空，不但如此，权限判断也十分简单。
<hr/>
它的工作原理是这样的：
.htaccess文件分发路由，将所有的访问都指向index.php文件处理
                        |
index.php解析url，判断由哪个类处理请求
                        |
catalog文件夹下的相应的controller类初始化，接受参数并访问数据库
                        |
model文件夹下的相应model类执行sql查询并返回结果给controller
                        |
将view文件夹下的.tpl（模板）文件读到内存中并加入查询结果
                        |
                  展示数据给用户。
<hr/>
**example：
比如有一个用户访问：http://hostname/user
意思就是由catalog/controller/user.php中的ControllerUser类处理这个请求，但是并没有指定那个function(函数)，这里的默认的function是index方法，如果ControllUser中没有这个function的话，就会初出错。
所以可以推测http://hostname/user/login一定是访问ControllerUser的login方法，是这样的。
需要传参的话怎么办呢？需要分页的话怎么办呢？比如http://hostname/article/2，请求第二页的文章。
请看ControllerArticle的index方法：
<pre><code>
  function index($arg){
    $current = (int)$arg[0];//当前请求页数
    $page = array($current,'hostname/article/',20);//每页显示20条记录
    $this->load->model('article')->find($page);
    $pagination = $db->getPage();
  }
</code></pre>
可以看到，传参和查询数据以及分页就是这么简单。
但是，有时候参数是更复杂的，比如，我们要查询name like tom and date between 2014 and 2015的用户怎么办？
* http://hostname/user/index?name=tom&date_start=2014&date_end=2015
* or http://hostname/user/index/?name=tom&date_start=2014&date_end=2015
* 但是不能这样：http://hostname/user?name=tom&date_start=2014&date_end=2015
* *默认的，带有问号的参数是不能忽略方法参数的*
这样，user的index方法就可以这样接受参数了：
<pre><code>
function index(){//注意，这里是没有参数的
  $get = $this->req->get;
  $name = $get['name'];
  $date_start = $get['date_start'];
  $date_end = $get['date_end'];
  ...
}
</code></pre>
-----------------------------------------------------
have fun.
