// JavaScript Document
window.onload = function() {
	var btnName, timerName, time, button, Round, flag;
	const TIME = 100;
	
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
			alert("123");
			var m = Math.floor(time / 60);	//整除求分，Math.floot()为整除函数
			var s = time % 60;
			if(s < 10) {s = '0' + s;}
			document.getElementById(timerName).textContent = m + ':' + s;
			if(time > 0) {
				time--;
			}
		}
	}
	
	
	for(Round = 1; Round <= 7; Round++) {
		if(Round === 5) {		//自由辩
			
		}
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
			flag = setInterval(runTime,1000);
			if(time === 0){
				button.value = 'Start';
				clearInterval(flag);				
			}			
		}
	}
	
	
	button.addEventListener('click', changeBtn);
	
//	function period(){
//		if(Round === 5) {}
//		else {
//			if(Round % 2 === 1) {	//正方发言
//				btnName = 'pBtn';
//				timerName = 'pTimer';
//			}
//			else {		//反方发言
//				btnName = 'nBtn';
//				timerName = 'nTimer';
//			}
//			button = document.getElementById(btnName);
//			time = TIME;
////			runTime();
//			flag = setInterval(runTime,1000);
//		}
//	}
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
