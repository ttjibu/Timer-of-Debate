// JavaScript Document
window.onload = function() {
	var btnName, timerName, time, button, Round = 1, flat;
	const TIME = 5;
	
	function changeBtn() {
		if (this.value === 'Start') {
			this.value = 'Stop';
		}
		else if (this.value === 'Stop') {
			this.value = 'Start';
		}
	}
	
	function runTime() {
		if (button.value ==='Stop') {
			var m = Math.floor(time / 60);	//整除求分，Math.floot()为整除函数
			var s = time % 60;
			if(s < 10) {s = '0' + s;}
			document.getElementById(timerName).textContent = m + ':' + s;
			if(time > 0) {
				time--;
			}
			else {
				button.value = 'Start';
				Round ++;
				clearInterval(flat);
			}
		}
	}
	
	function period(){
		if(Round === 5) {}
		else {
			if(Round % 2 === 1) {	//正方发言
				btnName = 'pBtn';
				timerName = 'pTimer';
			}
			else {		//反方发言
				btnName = 'nBtn';
				timerName = 'nTimer';
			}
			button = document.getElementById(btnName);
			time = TIME;
//			runTime();
			flat = setInterval(runTime,1000);
		}
	}
	console.log(Round);
	period();
//	setInterval(period, 1000);
	button.addEventListener('click', changeBtn);
	
	
//	var time = 10;
//	var btnName = 'pBtn';
//	var timerName = 'pTimer';
//	var button = document.getElementById(btnName);
//	
//	button.addEventListener('click',changeBtn);
//	function changeBtn() {
//		if (this.value === 'Start') {
//			this.value = 'Stop';
//		}
//		else {
//			this.value = 'Start';
//		}
//	}
//		
//	function runTime() {
//		if (button.value ==='Stop') {
//			var m = Math.floor(time / 60);	//整除求分，Math.floot()为整除函数
//			var s = time % 60;
//			if(s < 10) {s = '0' + s;}
//			document.getElementById(timerName).textContent = m + ':' + s;
//			if(time > 0) {
//				time--;
//			}
//		}
//	}
//	
//	setInterval(runTime,1000);
};















//hide the tag
document.getElementById('fuckyou').onclick = function() {
	document.getElementById('fuck').style.display = "none";		
};

//get background-color changed	
var x = document.getElementById('a');

function random(number) {
	return Math.floor(Math.random() * number);
}

function getChanged() {
	var randomColor = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
	document.body.style.backgroundColor = randomColor;
}

x.addEventListener('click', getChanged);
