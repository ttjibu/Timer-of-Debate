window.onload = function() {
	const TIME = 5, beishu = 1e1;	//beishu用于调节误差（'click'的时候重置Interval会有误差）
	var timerBtn = [document.getElementById('nBtn'), document.getElementById('pBtn')],	//x方计时器按钮
		count = [TIME * beishu, TIME * beishu],	//时间
		flag = [];				//用于标记Interval
						//1为正方，0为反方
	
	const roundFreeDebate = 5,	//自由辩环节
		  firstSpeak = 0;	//自由辩时先发言方
	var speaker = firstSpeak;	////自由辩时发言方(初始化为firstspeaker)
	var presentRound = 0,		//当前环节(从0开始) and many other more function
		nextRoundBtn = document.getElementById('nextRound'),	//‘环节跳过’控制按钮
		lastRoundBtn = document.getElementById('lastRound'),	//‘环节回溯’控制按钮
		functionalBtn = document.getElementById('functional');	//开始&自由辩按钮
		
	const Round = [-1, 1, 0, 0, 1, -1, 0, 1],//该轮发言方1为正方，0为反方，-1为其他
	 	  Time = [0, TIME, TIME, TIME, TIME, TIME, TIME + 60, TIME + 60],	//该轮发言时限
		  RoundTitle = ['',				//环节内容
					   'Round1:正一陈词',
					   'Round2:反一质询正一',
					   'Round3:反一陈词',
					   'Round4:正一质询反一',
					   'Round5:自由辩',
					   'Round6:反二结辩',
					   'Round7:正二结辩',
					   '比赛结束'];
	function outputTimer(str) {		//该函数用于 输出计时器当前时间
									//str为0Timer或1Timer
		var num = Number(str[0]);
		var m = Math.floor(convert(count[num]) / 60);	//整除求分，convert为玄学转换函数
		var s = convert(count[num]) % 60;
		if(s < 10) {s = '0' + s;}
		document.getElementById(str).textContent = m + ':' + s;	//输出		
	}
	
	function runTime() {	//点击按钮时会改变计时器状态（自由辩时按钮会隐藏）
		var str = this.name;	//按钮的name用于储存对应的输出框的id
		var num = Number(str[0]);
		if (this.textContent === 'Start') {	//当前计时器暂停
			this.textContent = 'Stop';
			flag[num] = setInterval(function() {
				outputTimer(str);		//输出
				if(count[num] > 0) {
					count[num]--;
				}
				else {	//时间到，计时器停止
					document.getElementById(str).textContent = '';	//清空
					presentRound++;	//下一环节
					adjustRound();	//调整
					clearInterval(flag[num]);
				}
			}, 1000 / beishu);
		}
		else if (this.textContent === 'Stop') {	//当前计时器正在跑
			this.textContent = 'Start';
			clearInterval(flag[num]);
		}
	}
		
	
	function convert(msec) {	//玄学转换
		return Math.floor(msec / beishu);
	}
	
	function control() {
		if(presentRound === 0) {
			this.style.visibility = 'hidden';
			document.getElementById('roundPart').style.visibility = 'visible';	//打开环节显示
			presentRound++;
			adjustRound();
		}
		else if (presentRound === roundFreeDebate){
			if (this.textContent === 'Start') {	//还没开始
				flag[speaker] = setInterval(function() {
					outputTimer(speaker + 'Timer');		//输出
					if(count[speaker] > 0) {
						count[speaker]--;
					}
					else {	//时间到，计时器停止
						clearInterval(flag[speaker]);
					}
				}, 1000 / beishu);
				this.textContent = 'Change';	//按钮也改名
			}
			else if (count[0] * count[1] > 0) {		//开始了，且双方都还有时间
				clearInterval(flag[speaker]);	//该方计时器暂停
				speaker = speaker ^ 1;		//换成另一方
				flag[speaker] = setInterval(function() {	//再次跑起
					outputTimer(speaker + 'Timer');
					if(count[speaker] > 0) {
						count[speaker]--;
					}
					else {	//时间到，计时器停止
						clearInterval(flag[speaker]);
						control();
					}
				}, 1000 / beishu);
			}
			else if(count[0] + count[1] > 0) {//有一方已经没有时间了，按钮就失效了
				speaker = speaker ^ 1;		//最后一方
				flag[speaker] = setInterval(function() {	//再次跑起
					outputTimer(speaker + 'Timer');
					if(count[speaker] > 0) {
						count[speaker]--;
					}
					else {	//双方时间都结束了，进入下一轮
						document.getElementById('0Timer').textContent = '';
						document.getElementById('1Timer').textContent = '';	//清空
						presentRound++;	//下一环节
						adjustRound();	//调整
						clearInterval(flag[speaker]);
					}
				}, 1000 / beishu);
				
			}
		}
	}
	
	function adjustRound() {	//根据presentRound 的大小来调节几个 btn 和 presentRound 的 title
								//一定要跟在 round ++/-- 后面
		document.getElementById('Round').textContent = RoundTitle[presentRound];	//环节名称
		if (presentRound > 7) {	//环节都结束了
//			document.querySelectorAll('button').style.visibility = 'hidden';
			document.getElementById('nextRound').style.visibility = 'hidden';
			document.getElementById('lastRound').style.visibility = 'hidden';
			timerBtn[0].style.visibility = 'hidden';
			timerBtn[1].style.visibility = 'hidden';
		}
		else if (presentRound !== roundFreeDebate) {	//不是自由辩
			timerBtn[Round[presentRound]].style.visibility = 'visible';	//发言方
			timerBtn[Round[presentRound] ^ 1].style.visibility = 'hidden';	//非发言方
			timerBtn[Round[presentRound]].textContent = 'Start';	//重置
						
			count[Round[presentRound]] = Time[presentRound] * beishu;	//设置该轮的时间
															//记得乘以!!beishu!!
			outputTimer(timerBtn[Round[presentRound]].name);	//顺便输出时间（此时是静止的）
			
			document.getElementById('speakerInFreeDebate').textContent = '';
			functionalBtn.style.visibility = 'hidden';	//以防万一
		}
		else {	//自由辩
			functionalBtn.style.visibility = 'visible';
			timerBtn[0].style.visibility = 'hidden';
			timerBtn[1].style.visibility = 'hidden';	//隐藏and显示按钮
			
			document.getElementById('speakerInFreeDebate').textContent = (firstSpeak === 1 ? '正' : '反') + '方先发言';
			count[1] = Time[presentRound] * beishu;
			count[0] = Time[presentRound] * beishu;	//设置该轮的时间（双方都要）
			outputTimer('0Timer');
			outputTimer('1Timer');	//输出时间
		}
	}	
		
	function skipToNextRound() {
		if (presentRound !== roundFreeDebate) {	//非自由辩
			var str = Round[presentRound] + 'Timer';	//找到该环节发言方
			clearInterval(flag[Round[presentRound]]);	//终止计时
			document.getElementById(str).textContent = '';	//清空其计时器
		}
		else {
			clearInterval(flag[0]);
			clearInterval(flag[1]);	//停止双方计时器
			document.getElementById('0Timer').textContent = '';
			document.getElementById('1Timer').textContent = '';	//清空
		}
		presentRound++;	//下一环节	
		adjustRound();
	}
	
	function returnToLastRound() {
		if(presentRound > 1){		//补丁
			if (presentRound !== roundFreeDebate) {	//非自由辩
				var str = Round[presentRound] + 'Timer';	//找到该环节发言方
				clearInterval(flag[Round[presentRound]]);	//终止计时
				document.getElementById(str).textContent = '';	//清空其计时器
			}
			else {
				clearInterval(flag[0]);
				clearInterval(flag[1]);	//停止双方计时器
				document.getElementById('0Timer').textContent = '';
				document.getElementById('1Timer').textContent = '';	//清空
			}
			presentRound--;	//上一环节
			adjustRound();
		}
	}
	
	nextRoundBtn.addEventListener('click', skipToNextRound);	//跳过该环节
	lastRoundBtn.addEventListener('click', returnToLastRound);	//返回该环节的上一环节
	functionalBtn.addEventListener('click', control);
	timerBtn[0].addEventListener('click', runTime);
	timerBtn[1].addEventListener('click', runTime);
};