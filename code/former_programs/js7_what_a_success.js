window.onload = function() {
	const TIME = 5, beishu = 1e1;	//beishu用于调节误差（'click'的时候重置Interval会有误差）
	var button = [document.getElementById('nBtn'), document.getElementById('pBtn')],	//x方计时器按钮
		count = [TIME * beishu, TIME * beishu],	//时间
		onoff = [false, true],				//标记该按钮跑不跑
		flag = [];				//用于标记Interval
						//1为正方，0为反方
	
	var round = 1,		//第几环节(从1开始) and many other more function
		nextRoundBtn = document.getElementById('nextRound'),	//‘环节跳过’控制按钮
		lastRoundBtn = document.getElementById('lastRound');	//‘环节回溯’控制按钮
		
	document.getElementById("Round").textContent = "Round" + round;
	function ChangeBtn() {	//点击按钮时会改变计时器状态
		var str = this.name;	//按钮的name用于储存对应的输出框的id
		var num = Number(str[0]);
		if (onoff[num]) {	//轮到该方发言
			if (this.textContent === 'Start') {
				this.textContent = 'Stop';
				flag[num] = setInterval(function() {		//该函数用于 输出计时情况
					var m = Math.floor(convert(count[num]) / 60);	//整除求分，convert为玄学转换函数
					var s = convert(count[num]) % 60;
					if(s < 10) {s = '0' + s;}
					document.getElementById(str).textContent = m + ':' + s;
					if(count[num] > 0) {
						count[num]--;
					}
					else {
						switchRound(str);	//切换到下一环节
						document.getElementById('Round').textContent = 'Round' + round;	//更改环节名称(特意没有写进switchRound()函数)
						clearInterval(flag[num]);
					}
				}, 1000 / beishu);
			}
			else if (this.textContent === 'Stop') {
				this.textContent = 'Start';
				clearInterval(flag[num]);
			}			
		}
	}
		
	function switchRound(str) {
		document.getElementById(str).textContent = '';	//清零
		button[turn(round)].textContent = 'Start';		//初始化
		round++;	//下一环节
		count[turn(round)] = TIME * beishu;
		onoff[turn(round)] = true;	//该环节发言方按钮生效
		onoff[turn(round) ^ 1] = false;	//非发言方按钮失效
	}
	
	function convert(msec) {	//玄学转换
		return Math.floor(msec / beishu);
	}
	
	function turn(num) {
		return num & 1;	//奇数返回 1，偶数返回 0
	}
	
	function skipToNextRound() {
		var str = turn(round) + 'Timer';
		switchRound(str);
		document.getElementById('Round').textContent = 'Round' + round;	//更改环节名称
		clearInterval(flag[Number(str[0])]);
	}
	
	function returnToNextRound() {
		if(round > 1){		//补丁
			var str = turn(round) + 'Timer';
			switchRound(str);
			round -= 2;	//不同于skipToNextRound 的补丁
			document.getElementById('Round').textContent = 'Round' + round;	//更改环节名称
			clearInterval(flag[Number(str[0])]);			
		}
	}
	nextRoundBtn.addEventListener('click', skipToNextRound);	//跳过该环节
	lastRoundBtn.addEventListener('click', returnToNextRound);	//返回该环节的上一环节
	button[0].addEventListener('click', ChangeBtn);
	button[1].addEventListener('click', ChangeBtn);
};