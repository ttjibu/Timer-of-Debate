window.onload = function() {
	const TIME = 5, beishu = 1e0;
	var btnName = 'pBtn', countName = document.getElementById(btnName).name,
		count = TIME * beishu, 
//		button = document.getElementById('nBtn'),
		flag;
	function changeBtn() {
		if (this.textContent === 'Start') {
			this.textContent = 'Stop';
			flag = setInterval(runTime,1000 / beishu);
//			flag = setInterval(runTime,1);
		}
		else if (this.textContent === 'Stop') {
			this.textContent = 'Start';
			clearInterval(flag);
		}
	}
	function convert (msec) {	//将秒转换成毫秒
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
			btnName = 'nBtn';
			countName = document.getElementById(btnName).name;
			count = TIME * beishu;
		}
	}
	
	document.getElementById(btnName).addEventListener('click', changeBtn);
};