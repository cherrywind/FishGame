var babyObj = function()
{
	this.x;
	this.y;
	this.angle;

	// this.babyEye = new Image();
	// this.babyBody = new Image();
	// this.babyTail = new Image();

	this.babyTail = [];//保存小鱼尾巴动画的序列帧图片
	this.babyTailTimer;
	this.babyTailFrameCount;//记录当前处于哪一帧

	this.babyEye = [];
	this.babyEyeTimer;
	this.babyEyeFrameCount;//记录当前处于哪一帧
	this.babyEyeInterval;

	this.babyBody = [];
	this.babyBodyTimer;
	this.babyBodyFrameCount;//记录当前处于哪一帧

}
babyObj.prototype.init = function()
{
	this.x = canvasWidth * 0.5 + 50;
	this.y = canvasHeight * 0.5 + 50;
	this.angle = 0;

	// this.babyEye.src = "./src/babyEye0.png";
	// this.babyBody.src = "./src/baby.png";
	// this.babyTail.src = "./src/babyTail0.png";

	for(var i = 0;i < 8;i++)
	{
		this.babyTail[i] = new Image();
		var babyTailImageSrc = "./src/babyTail" + i + ".png";
		this.babyTail[i].src = babyTailImageSrc;
	}
	this.babyTailTimer = 0;
	this.babyTailFrameCount = 0;

	for(var i = 0;i < 2;i++)
	{
		this.babyEye[i] = new Image();
		var babyEyeImageSrc = "./src/babyEye" + i + ".png";
		this.babyEye[i].src = babyEyeImageSrc;
	}
	this.babyEyeTimer = 0;
	this.babyEyeFrameCount = 0;
	this.babyEyeInterval = 1000;

	for(var i = 0;i < 20;i++)
	{
		this.babyBody[i] = new Image();
		var babyBodyImageSrc = "./src/babyFade" + i + ".png";
		this.babyBody[i].src = babyBodyImageSrc;
	}
	this.babyBodyTimer = 0;
	this.babyBodyFrameCount = 0;
}
babyObj.prototype.draw = function()
{
	//context1

	//lerp x,y
	this.x = lerpDistance(mom.x,this.x,0.99);//第三个参数越大，则大鱼跟着鼠标动的速度越慢，和按正常思维想的不一样（待研究）
	this.y = lerpDistance(mom.y,this.y,0.99);

	//lerp angle
	var betaAngle = Math.atan2(mom.y - this.y,mom.x - this.x) + Math.PI;
	this.angle = lerpAngle(betaAngle,this.angle,0.7);//第三个参数越小，则方向转得越快越灵活

	//babyTail 动画
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50)
	{
		this.babyTailFrameCount = (this.babyTailFrameCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	//babyEye 动画
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval)
	{
		this.babyEyeFrameCount = (this.babyEyeFrameCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;
		// console.log(this.babyEyeFrameCount);
		// console.log(this.babyEyeInterval);
		if(this.babyEyeFrameCount == 0)//睁眼
		{
			this.babyEyeInterval = Math.random() * 1500 + 2000;
			// console.log("睁眼");
		}
		else if(this.babyEyeFrameCount == 1)//闭眼
		{
			this.babyEyeInterval = 100;
			// console.log("闭眼1");
		}
	}

	//babyBody 小鱼身体褪色动画
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300)
	{
		this.babyBodyFrameCount += 1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyFrameCount > 19)
		{
			this.babyBodyFrameCount = 19;
			//game over
			data.isGameOver = true;
		}
	}
	

	context1.save();
	context1.translate(this.x,this.y);
	context1.rotate(this.angle);

	var babyTailCount = this.babyTailFrameCount;
	context1.drawImage(this.babyTail[babyTailCount],0 - this.babyTail[babyTailCount].width * 0.5 + 25,0 - this.babyTail[babyTailCount].height * 0.5);
	var babyBodyCount = this.babyBodyFrameCount;
	context1.drawImage(this.babyBody[babyBodyCount],0 - this.babyBody[babyBodyCount].width * 0.5,0 - this.babyBody[babyBodyCount].height * 0.5);
	var babyEyeCount = this.babyEyeFrameCount;
	context1.drawImage(this.babyEye[babyEyeCount],0 - this.babyEye[babyEyeCount].width * 0.5,0 - this.babyEye[babyEyeCount].height * 0.5);
	context1.restore();
}