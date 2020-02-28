window.onload = function() {
	const TIME = 5, beishu = 1e1;	//beishu用于调节误差（'click'的时候重置Interval会有误差）
	var round = 1,		//第几环节(从1开始)
		pbutton = document.getElementById('pBtn'),	//正方计时器按钮
		nbutton = document.getElementById('nBtn'),	//反方计时器按钮
		count = [TIME * beishu, TIME * beishu],	//时间
		click = ['', 'click'],	//玄学监视器控制器————是假的
		flag = [];				//用于标记Interval
					//1为正方，0为反方
		
	function ChangeBtn() {	//点击按钮时会改变计时器状态
		var str = this.name;	//按钮的name用于储存对应的输出框的id
		var num = Number(str[0]);
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
					clearInterval(flag[num]);
				}
			}, 1000 / beishu);
		}
		else if (this.textContent === 'Stop') {
			this.textContent = 'Start';
			clearInterval(flag[num]);
		}
	}
	
	function convert (msec) {	//玄学转换
		return Math.floor(msec / beishu);
	}
	
	function switchRound(str) {
		document.getElementById(str).textContent = '';
		round++;
		count[turn(round)] = TIME * beishu;
		click[turn(round)] = 'click';	//该环节发言方按钮生效
		click[turn(round) ^ 1] = '';	//非发言方按钮失效
		alert(click[turn(round)^1]);
	}
	function turn(num) {
		return num & 1;	//奇数返回 1，偶数返回 0
	}
	pbutton.addEventListener(click[0], ChangeBtn);
	nbutton.addEventListener(click[1], ChangeBtn);
};