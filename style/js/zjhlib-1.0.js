if(!''.trim){
	String.prototype.trim = function(){
		return this.replace(/^\s+|\s+$/g,'');
	};
}
if(![].forEach){
	Array.prototype.forEach = function(fn){
		var that = this;
		for(var i = 0,len = that.length;i<len;i++){
			fn.call(null,that[i],i);
		}
	};
}
(function(window,undefined){

	var zjh = {};

	zjh.body = document.body;
	zjh.html = document.documentElement;

	zjh.get = function(el){
		return typeof el === 'string' ? document.getElementById(el):el;
	};
	zjh.isphone = function(){
		var sUserAgent = navigator.userAgent.toLowerCase(),
			isIphone = sUserAgent.match(/iphone/i) == "iphone",
			isAndroid = sUserAgent.match(/android/i) == "android";
			
		return isIphone || isAndroid;
	};
	zjh.validate = function(demo,str){
		switch(demo){
			case 'pass':
				return /^[a-zA-Z0-9_#%$@.]{8,20}$/.test(str);
			case 'phone':
				return /^1[34578]\d{9}$/.test(str);
			case 'code':
				return /^[a-z0-9]{4}$/.test(str);
			case 'sms':
				return /^[0-9]{6}$/.test(str);
			case 'email':
				return /^[\da-zA-Z_]{5,}@[a-z\d]+\.(com|cn|net)$/.test(str);
			case 'name':
				return /^[\u4e00-\u9fa5]{2,4}$/.test(str);
			case 'int':
				return !isNaN(parseInt(str));
			case 'float':
				return !isNaN(parseFloat(str));
			case 'allnum':
				return /^\d+$/.test(str);
			default:
				return false;
		}
	};
	//浏览器可视区域高度
	zjh.getViewport = function(){
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	};
	//带borderWidth的文档高度，不包含与box周围的距离
	zjh.getPagearea = function(){
		//带borderWidth,不带borderWidth是document.body.clientHeight;
		return {
			height:document.documentElement.offsetHeight,
			width:document.documentElement.offsetWidth
		};
	};
	zjh.screen = function(){
		return {
			height:window.screen.height,
			width:window.screen.width
		};
	};
	zjh.css = function(el,attr,value){
		if(zjh.isObject(attr)){
			for(at in attr){
				zjh.css(el,at,attr[at]);
			}
		}else if(typeof value != 'undefined'){
			el.style[attr] = value;
		}else{
			var style = el.currentStyle ? el.currentStyle : window.getComputedStyle(el);
			if(style.getPropertyValue){
			    return style.getPropertyValue(attr);
			}else{
			    return style.getAttribute(attr);
			}
		}
	};
	zjh.nth = function(ele,index){
		var lists = ele.childNodes,
			elements = [];
		for(var i = 0,len = lists.length;i<len;i++){
			if(lists[i].nodeType == 1){
				elements.push(lists[i]);
			}
		}
		if(index < 0) index = elements.length+index;
		return elements[index];
	};
	zjh.first = function(ele){
		return zjh.nth(ele,0);
	};
	zjh.last = function(ele){
		return zjh.nth(ele,-1);
	};
	zjh.prev = function(ele){
		var pre = ele.previousSibling;
		if(pre && pre.nodeType == 1){
			return pre;
		}else if(pre && pre.nodeType == 3){
			return zjh.prev(pre);
		}else{
			return null;
		}
	};
	zjh.next = function(ele){
		var next = ele.nextSibling;
		if(next && next.nodeType == 1){
			return next;
		}else if(next && next.nodeType == 3){
			return zjh.next(next);
		}else{
			return null;
		}
	};
	zjh.animate = function(el,attr,fn,val){
	    var arg = arguments;
	    if(zjh.isObject(attr)){
	       var keyarr = [];
	       for(key in attr){
	       	  keyarr.push(key);
	       }
	       for(key in attr){
	       	 if(keyarr.slice(-1) == key){
	       	 	arg.callee(el,key,fn,attr[key]);
	       	 }else{
	       	 	arg.callee(el,key,null,attr[key]);
	       	 }
	       }
	    }else{
	        el = zjh.get(el);
	        attr = attr.replace(/([A-Z])/g,'-$1').toLowerCase();
	        target = parseInt(val);

	        var original = parseInt(zjh.css(el,attr)),
	          far      = target-original,
	          step     = far/20,
	          now      = 0;
	        //单位 px,em .etc
	        var suffix = val.match(/[a-z]+$/i);
	        suffix === null ? 0 : suffix[0];

	        void function(){
	           if(Math.abs(far)-Math.abs(step) <= Math.abs(now)){
	              el.style[attr] = target+suffix;
	              if(zjh.isFunction(fn)) fn.call();
	           }else{
	              el.style[attr] = original+now+suffix;
	              // console.log(original+now+suffix);
	              now = now+step;
	              setTimeout(arguments.callee,10);
	           }
	        }();
	    }
	};

	zjh.hasClass = function(el,clazz){
		if(zjh.isString(el)) el = zjh.get(el);
		if(el.length) el = el[0];
		var className = el.className;
		if(className === ''){
			return false;
		}
		var arr = className.split(' ');
		for(var i = 0,len = arr.length;i < len;i++){
			if(arr[i] == clazz) return true;
		}
		return false;
	};

	zjh.addClass = function(el,clazz){
		if(zjh.isString(el)) el = zjh.get(el);
		if(el.length){
			for(var i = 0,len = el.length;i<len;i++){
				zjh.addClass(el[i],clazz);
			}
		}else{
			if(!zjh.hasClass(el,clazz)){
				var classname = el.className == '' ? '' : el.className+" ";
				el.className = classname+clazz;
			}
		}
	};

	zjh.removeClass = function(el,clazz){
		if(zjh.isString(el)) el = zjh.get(el);
		if(el.length){
			for(var i = 0,len = el.length;i<len;i++){
				zjh.removeClass(el[i],clazz);
			}
		}else{
			var className = ' '+el.className+' ';
			el.className = className.replace(new RegExp('\\s'+clazz+'\\s'),'').trim();
		}
	};
	zjh.toggleClass = function(el,clazz){
		if(zjh.hasClass(el,clazz)){
			zjh.removeClass(el,clazz);
		}else{
			zjh.addClass(el,clazz);
		}
	};
	zjh.toggle = function(el){
		if(zjh.css(el,'display') == 'none'){
			zjh.show(el);
		}else{
			zjh.hide(el);
		}
	};
	zjh.addEvent = function(el,type,fn){
		el = zjh.get(el);
		if(el.attachEvent){
	    	el.attachEvent('on'+type,fn);
		}else{
		    el.addEventListener(type,fn,false);
		}
	};

	zjh.removeEvent = function(el,type,fn){
		el = zjh.get(el);
		if(el.detachEvent){
		    el.detachEvent('on'+type,fn);
		}else{
		    el.removeEventListener(type,fn,false);
		}
	};

	//文档滚动到指定位置
	zjh.scrollTo = function(position,rate){

		var toz = document.documentElement.scrollTop || document.body.scrollTop,
			target = position ? position === 'top' ? 0 : position === 'bottom' ? document.body.scrollHeight : parseInt(position) : 0,
			far = target - toz,
			now = 0,
			setId,
			step = far/(rate ? parseInt(rate) : 20);

		// console.log(toz,target,far,now,step);
		void function(){
			if(step === 0) return;
			if(far <= 0 ? toz + now <= target : target-now <= step){
				window.scrollTo(0,target);
				// console.log('target',target);
			}else{
				window.scrollTo(0,toz+now);
				now = now + step;
				// console.log(toz+now,target-now);
				setId = setTimeout(arguments.callee,10);
			}
		}();

	};
	zjh.isFunction = function(fn){
		return Object.prototype.toString.call(fn) === '[object Function]';
	};
	zjh.isArray = function(array){
		return Object.prototype.toString.call(array) === '[object Array]';
	};
	zjh.isObject = function(object){
		return Object.prototype.toString.call(object) === '[object Object]';
	};
	zjh.isString = function(str){
		return Object.prototype.toString.call(str) === '[object String]';
	};
	zjh.hide = function(ele){
		zjh.css(ele,'display','none');
	};
	zjh.show = function(ele){
		zjh.css(ele,'display','block');
	};
	zjh.showi = function(ele){
		zjh.css(ele,'display','inline-block');
		ie678 = !+"\v1" ;//include IE5
		if(ie678){
			zjh.css(ele,'display','inline');
			zjh.css(ele,'zoom','1');
		}
	}
	zjh.ajax = function(method,url,params,fn,async){

        async = typeof async === "undefined" ? true:async;
        method = method.toUpperCase();

        var xmlhttp,
        	param = '';

        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        }else{
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                if(typeof fn === "function") fn(xmlhttp.responseText);
            }
        };
        for(p in params){
        	param = param + "&" + p + "=" + params[p];
        }
       	param = param.slice(1)+"&random="+Math.random();

       	if(method === "GET"){
       		xmlhttp.open(method,url+"?"+param,async);
       		xmlhttp.send();
       	}else if(method === "POST"){
       		xmlhttp.open(method,url,async);
       		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
       		xmlhttp.send(param);
       	}else{
       		if(window.console) console.log('未知的方法：'+method);
       		return false;
       	}
    };

    zjh.setCookie = function(c_name,value,expiredays){
    	var exdate = new Date();
　　　　exdate.setDate(exdate.getDate() + expiredays);
　　　　document.cookie = c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/";
    };
    zjh.getCookie = function(name){
    	if(!name){
    		return document.cookie ? document.cookie : '';
    	}else{
    		var exp = new RegExp(name+'\s*=([^;]+)');
    		var ret = zjh.getCookie().match(exp);
    		if(ret){
    			return unescape(ret[1]);
    		}else{
    			return '';
    		}
    	}
    };
    //zjh.ng global
    zjh.ng = {};
    zjh.model = function(el,data,id){
    	// if(zjh.isString(el)) el = zjh.get(el);
    	if(!typeof data == 'undefined') data = [];
    	if(zjh.isObject(data)) data = [data];
    	// el = el.outerHTML;
    	if(zjh.ng[id]){
    		el = zjh.ng[id];
    	}else{
    		if(el.nodeType) el = el.outerHTML;
    	}
    	var objs = el.match(/[{]{2}\s*([^{}]+)\s*[}}]{2}/g);
    	var ret = [];
    	if(objs){
    		objs.forEach(function(ele){
    			var m = ele.match(/[^{}\s]+/);
    			if(m) ret.push(m[0]);
    		});
    	}
    	if(id){
    		zjh.ng[id] = el;
    	}
    	if(ret){
    		var html = "";
    		data.forEach(function(ele){
    			var htm = el.slice(0);
    			ret.forEach(function(re,index){
    				htm = htm.replace(objs[index],ele[re]);
    			});
    			html = html+"\n"+htm;
    		});
    		return html;
    	}else{
    		return '';
    	}
    };
    zjh.GET = function(url,params,fn,async){
    	zjh.ajax('GET',url,params,fn,async);
    };
    zjh.POST = function(url,params,fn,async){
    	zjh.ajax("POST",url,params,fn,async);
    };
    zjh.pop = function(title,content,width,height,fn){
    	if(!zjh.get('cssplugin')){
    		var link = document.createElement('link');
	    	link.setAttribute('rel','stylesheet');
	    	link.setAttribute('type','text/css');
	    	link.setAttribute('href','http://192.168.10.35/ida/style/css/plugin.css');
	    	link.id = 'cssplugin';
	    	document.getElementsByTagName('head')[0].appendChild(link);
    	}

    	var popShadow = document.createElement('div'),
    		closeDiv = document.createElement('b'),
    		wrap = document.createElement('div'),
    		pop = document.createElement('div');

    	popShadow.setAttribute('id','pop-shadow');
    	pop.setAttribute('id','layer-pop');
    	closeDiv.setAttribute('id','pop-close');
    	closeDiv.innerHTML = '×';
    	zjh.addClass(wrap,'wrap');
    	title = "<h2>"+title+"</h2>";

    	closeDiv.onclick = function(){
    		// zjh.body.removeChild(popShadow);
    		// zjh.body.removeChild(pop);
    		document.body.removeChild(popShadow);
    		// document.body.removeChild(pop);
    		if(typeof content == 'object'){
    			zjh.hide(content);
    			document.body.appendChild(content);
    		}
    		document.body.removeChild(pop);
    	};

    	if(width) zjh.css(pop,{
    		'width':width+"px",
    		'height':height+"px",
    		'margin-left':-width/2+"px",
    		'margin-top':-height/2+"px"
    	});

    	pop.innerHTML = title;
    	
    	if(typeof content == 'object'){
    		// var copyContent = content.cloneNode(true);
    		// zjh.show(copyContent);
    		// pop.appendChild(copyContent);
    		zjh.show(content);
    		pop.appendChild(content);
    	}else{
    		wrap.innerHTML = content;
    	}
    	// zjh.addClass(wrap,'tc');
    	pop.appendChild(wrap);
    	document.body.appendChild(popShadow);
    	document.body.appendChild(pop);
    	pop.appendChild(closeDiv);
    	if(zjh.isFunction(fn)){
    		fn(closeDiv);
    	}
    };
	window.zjh = zjh;
})(window);