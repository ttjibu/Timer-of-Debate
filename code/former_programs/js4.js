window.onload = function() {
	const TIME = 5, beishu = 1e0;
	var btnName = 'pBtn', countName = 'pTimer',
		count = TIME * beishu, 
		pbutton = document.getElementById('pBtn'),
		nbutton = document.getElementById('nBtn'),
		click = "click",
		flag;
	function pChangeBtn() {
		if (this.textContent === 'Start') {
			this.textContent = 'Stop';
			flag = setInterval(pRunTime,1000 / beishu);
//			flag = setInterval(runTime,1);
		}
		else if (this.textContent === 'Stop') {
			this.textContent = 'Start';
			clearInterval(flag);
		}
	}
	function nChangeBtn() {
		if (this.textContent === 'Start') {
			this.textContent = 'Stop';
			flag = setInterval(nRunTime,1000 / beishu);
//			flag = setInterval(runTime,1);
		}
		else if (this.textContent === 'Stop') {
			this.textContent = 'Start';
			clearInterval(flag);
		}
	}
	function ChangeBtn() {
		if (this.textContent === 'Start') {
			this.textContent = 'Stop';
			var str = this.name;
//			alert(this.name);
//			flag = setInterval(RunTime(str),1000 / beishu);
			flag = setInterval(function() {
				var m = Math.floor(convert(count) / 60);	//整除求分，Math.floot()为整除函数
				var s = convert(count) % 60;
				if(s < 10) {s = '0' + s;}
				document.getElementById(str).textContent = m + ':' + s;
				if(count > 0) {
					count--;
				}
			}, 1000 / beishu);
		}
		else if (this.textContent === 'Stop') {
			this.textContent = 'Start';
			clearInterval(flag);
		}
	}
	function convert (msec) {	//将秒转换成毫秒
		return Math.floor(msec / beishu);
	}
	function pRunTime() {
		var m = Math.floor(convert(count) / 60);	//整除求分，Math.floot()为整除函数
		var s = convert(count) % 60;
		if(s < 10) {s = '0' + s;}
		document.getElementById('pTimer').textContent = m + ':' + s;
		if(count > 0) {
			count--;
		}
//		else {
//			btnName = 'nBtn';
//			countName = document.getElementById(btnName).name;
//			count = TIME * beishu;
//		}
	}
	function nRunTime() {
		var m = Math.floor(convert(count) / 60);	//整除求分，Math.floot()为整除函数
		var s = convert(count) % 60;
		if(s < 10) {s = '0' + s;}
		document.getElementById('nTimer').textContent = m + ':' + s;
		if(count > 0) {
			count--;
		}
	}	
	function RunTime(str) {
		var m = Math.floor(convert(count) / 60);	//整除求分，Math.floot()为整除函数
		var s = convert(count) % 60;
		if(s < 10) {s = '0' + s;}
		document.getElementById(str).textContent = m + ':' + s;
		if(count > 0) {
			count--;
		}
	}
//	document.getElementById(btnName).addEventListener(click, changeBtn);
//	pbutton.addEventListener(click, pChangeBtn);
//	nbutton.addEventListener(click, nChangeBtn);
	nbutton.addEventListener(click, ChangeBtn);
};