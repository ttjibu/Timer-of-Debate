window.onload = function() {
	//这一个const定义的常量都是由赛制决定的
	const roundNumber = 7,		//总环节数
		  roundFreeDebate = 5,	//自由辩环节
		  firstSpeak = 1,	//自由辩时先发言方
		  Round = [-1, 1, 0, 0, 1, -1, 0, 1],//第几轮发言方的，1为正方，0为反方，-1为其他
	 	  Time = [0, 120, 120, 120, 120, 180, 180, 180],	//该轮发言时限(秒)
		  roundTitle = ['',				//环节内容
					   'Round1:正一陈词',
					   'Round2:反一质询正一',
					   'Round3:反一陈词',
					   'Round4:正一质询反一',
					   'Round5:自由辩',
					   'Round6:反二结辩',
					   'Round7:正二结辩',
					   '比赛结束'];
	
	const beishu = 1e2;
	//beishu用于调节误差（'click'的时候重置Interval会有误差），beishu越大，误差越小（不要1e3，有bug）
	
	let timerBtn = [getEle('0Button'), getEle('1Button')],	//x方计时器按钮
		cnt = [],		//时间
		flag = [];		//用于标记Interval
	
	let speaker = firstSpeak,	////自由辩时发言方(初始化为firstspeaker)
		pstRnd = 0,		//当前环节(从0开始)
		functionalBtn = getEle('functional');	//开始&自由辩按钮
		
	function getEle(id) {
		return document.getElementById(id);
	}
	
	function outputTimer(num) {		//该函数用于 输出num方计时器当前时间
		let m = Math.floor(convert(cnt[num]) / 60);	//整除求分，convert为玄学转换函数
		let s = convert(cnt[num]) % 60;
		if(s < 10) {s = '0' + s;}
		getEle(num + 'Timer').textContent = m + ':' + s;	//输出		
	}
	
	function changeBtn() {	//点击按钮时会改变计时器状态（自由辩时按钮会隐藏）
//		let num = Number(this.id[0]);
		let num = Round[pstRnd];
		if (this.textContent === 'Start') {	//当前计时器暂停
			this.textContent = 'Stop';
			flag[num] = setInterval(runTime, 1000 / beishu);
		}
		else if (this.textContent === 'Stop') {	//当前计时器正在跑
			this.textContent = 'Start';
			clearInterval(flag[num]);
		}
	}
	
	function convert(msec) {	//玄学转换
		return Math.floor(msec / beishu);
	}
	
	function functional() {
		if(pstRnd === 0) {
			$(this).addClass("d-none").removeClass("d-flex");
			$("#roundPart").removeClass("d-none").addClass("d-flex");	//打开环节显示
			pstRnd++;
			adjustRound();
		}
		else if (pstRnd === roundFreeDebate){
			if (this.textContent === 'Start') {	//还没开始
				flag[speaker] = setInterval(runTime, 1000 / beishu);
				this.textContent = 'Change';	//按钮也改名
			}
			else if (cnt[0] * cnt[1] > 0) {		//开始了，且双方都还有时间
				clearInterval(flag[speaker]);	//该方计时器暂停
				speaker ^= 1;		//换成另一方
				getEle('speakerInFreeDebate').textContent = (speaker === 1 ? '正' : '反') + '方发言';	//别忘了改小标题
				flag[speaker] = setInterval(runTime, 1000 / beishu);
			}
			//有一方没时间时，change按钮就失效了
		}
	}
	
	function adjustRound() {	//根据pstRnd 的大小来调节几个 btn 和 pstRnd 的 title
		getEle('Round').textContent = roundTitle[pstRnd];	//环节名称
		if (pstRnd > roundNumber) {	//环节都结束了
			$("#nextRound").addClass("d-none").removeClass("d-flex");
			$("#lastRound").addClass("d-none").removeClass("d-flex");
			getEle('0Timer').textContent = '';
			getEle('1Timer').textContent = '';
			$(timerBtn[0]).addClass("d-none").removeClass("d-flex");
			$(timerBtn[1]).addClass("d-none").removeClass("d-flex");
		}
		else if (pstRnd !== roundFreeDebate) {	//不是自由辩
			let num = Round[pstRnd];
			$(timerBtn[num ^ 1]).addClass("d-none").removeClass("d-flex");	//非发言方
			getEle((num ^ 1) + 'Timer').textContent = '';	//清空
			
			$(timerBtn[num]).removeClass("d-none").addClass("d-flex");	//发言方
			timerBtn[num].textContent = 'Start';	//重置
						
			cnt[num] = Time[pstRnd] * beishu;	//设置该轮的时间
															//记得乘以!!beishu!!
			outputTimer(num);	//顺便输出时间（此时是静止的）
			
			getEle('speakerInFreeDebate').textContent = '';
			$(functionalBtn).addClass("d-none").removeClass("d-flex");	//以防万一
		}
		else {	//自由辩
			$(functionalBtn).removeClass("d-none").addClass("d-flex");
			$(timerBtn[0]).addClass("d-none").removeClass("d-flex");
			$(timerBtn[1]).addClass("d-none").removeClass("d-flex");	//隐藏and显示按钮
			
			getEle('speakerInFreeDebate').textContent = (firstSpeak === 1 ? '正' : '反') + '方先发言';
			cnt[1] = Time[pstRnd] * beishu;
			cnt[0] = Time[pstRnd] * beishu;	//设置该轮的时间（双方都要）
			outputTimer(0);
			outputTimer(1);	//输出时间
			
			speaker = firstSpeak;
		}
	}	
		
	function skipToNextRound() {
		if (pstRnd !== roundFreeDebate) {	//非自由辩
			let num = Round[pstRnd];		//找到该环节发言方
			clearInterval(flag[num]);	//终止计时
			getEle(num + 'Timer').textContent = '';	//清空其计时器
		}
		else {
			clearInterval(flag[0]);
			clearInterval(flag[1]);	//停止双方计时器
			getEle('0Timer').textContent = '';

			getEle('1Timer').textContent = '';	//清空
		}
		pstRnd++;	//下一环节	
		adjustRound();
	}
	
	function returnToLastRound() {
		if(pstRnd > 1){		//补丁
			if (pstRnd !== roundFreeDebate) {	//非自由辩
				let num = Round[pstRnd];		//找到该环节发言方
				clearInterval(flag[num]);	//终止计时
				getEle(num + 'Timer').textContent = '';	//清空其计时器
			}
			else {
				clearInterval(flag[0]);
				clearInterval(flag[1]);	//停止双方计时器
				getEle('0Timer').textContent = '';
				getEle('1Timer').textContent = '';	//清空
			}
			pstRnd--;	//上一环节
			adjustRound();
		}
	}
	
	function runTime() {
		let num;
		if (pstRnd === roundFreeDebate) {	//自由辩
			num = speaker;
		}
		else {		//非自由辩
			num = Round[pstRnd];
		}
		outputTimer(num);
		if(cnt[num] > 0) {	//还有时间
			cnt[num]--;
		}
		else {
			clearInterval(flag[num]);	//没时间了，停止计时
			if (pstRnd !== roundFreeDebate) {	//不是自由辩
				pstRnd++;	//下一环节
				adjustRound();	//调整
			}
			else if (cnt[num ^ 1] > 0) {	//自由辩ing，且对方还有时间
				num ^= 1;					//接下来计时器就不会停止，直到自由辩结束
				getEle('speakerInFreeDebate').textContent = (num === 1 ? '正' : '反') + '方发言';	//别忘了改小标题
				flag[num] = setInterval(function() {
					outputTimer(num);
					if (cnt[num] > 0) {
						cnt[num]--;
					}
					else {	//则双方都没有时间了
						clearInterval(flag[num]);
						pstRnd++;
						adjustRound();
					}
				}, 1000 / beishu);
			}
		}
	}
	
	getEle('nextRound').addEventListener('click', skipToNextRound);	//跳过该环节
	getEle('lastRound').addEventListener('click', returnToLastRound);	//返回该环节的上一环节
	functionalBtn.addEventListener('click', functional);
	timerBtn[0].addEventListener('click', changeBtn);
	timerBtn[1].addEventListener('click', changeBtn);
};
