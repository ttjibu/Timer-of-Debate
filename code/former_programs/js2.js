window.onload = function() {
	const TIME = 5, beishu = 1e0;
	var btnName = 'nBtn', countName = 'nTimer',
//		count = TIME, 
		count = TIME * beishu, 
//		button = $(btnName), 
		nbutton = document.getElementById('nBtn'),
		pbutton = document.getElementById('pBtn'),
		button = nbutton,
		flag;
	function changeBtn() {
		if (this.value === 'Start') {
			this.value = 'Stop';
			flag = setInterval(runTime,1000 / beishu);
//			flag = setInterval(runTime,1);
		}
		else if (this.value === 'Stop') {
			this.value = 'Start';
			clearInterval(flag);
		}
	}
	function convert_s_to_ms (sec) {	//将秒转换成毫秒
		return sec * beishu;
	}
	function convert (msec) {	//将秒转换成毫秒
//		return msec;
		return Math.floor(msec / beishu);
	}
	function runTime() {
		var m = Math.floor(convert(count) / 60);	//整除求分，Math.floot()为整除函数
		var s = convert(count) % 60;
		if(s < 10) {s = '0' + s;}
		document.getElementById(countName).textContent = m + ':' + s;
		if(count > 0) {
			count--;
		}
		else {
			button.valve = 'Start';
			btnName = 'pBtn';
//			button = $(btnName);
//			alert("before changebtn");
//			button = document.getElementById(btnName);
			button = pbutton;
//			alert("after changebtn");
			countName = 'pTimer';
			count = TIME * beishu;
		}
	}
	
	button.addEventListener('click', changeBtn);
	
//	function $(id) {
//		return document.getElementById(id);
//	}
//	function run() {
//		if (button.value === 'Stop') {
//			setInterval(tick, 1000);
//		}
//	}
};