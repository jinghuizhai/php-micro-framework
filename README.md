# php-micro-framework
一个微型的php框架，它吸取了opencart的一些思想。
它的特点如下：
* MVC模式，前后端分离，容易掌握。
* 加载类库非常简单，不用在function中使用require，只需要$this->load->model('user')就引入了一个model层的php文件。
* 可以配置友好的路由；比如http://hostname/user,http://hostname/login,而不是http://hostname/login.php
* 可以用不同的类来响应游客和登录用户的访问，而不用每次都判断session中是否为空，不但如此，权限判断也十分简单。
----------------------------
它的工作原理是这样的：
.htaccess文件分发路由，将所有的访问都指向index.php文件处理
                        |
index.php解析url，判断由哪个类处理请求
                        |
catalog文件夹下的相应的controller类初始化，接受参数并访问数据库
model文件夹下的相应model类执行sql查询并返回结果给controller
将view文件夹下的.tpl（模板）文件读到内存中并加入查询结果
展示数据给用户。
