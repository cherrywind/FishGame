var momFishObj = function()
{
	this.x;
	this.y;
	this.angle;

	// this.bigEye = new Image();
	// this.bigBody = new Image();
	// this.bigTail = new Image();

	this.bigTail = [];
	this.bigTailTimer;
	this.bigTailFrameCount;

	this.bigEye = [];
	this.bigEyeTimer;
	this.bigEyeFrameCount;
	this.bigEyeInterval;

	this.bigBodyOrange = [];//保存大鱼橙色身体的图片数组
	this.bigBodyBlue = [];//保存大鱼蓝色身体的图片数组
	this.bigBodyFrameCount;

}
momFishObj.prototype.init = function()
{
	this.x = canvasWidth * 0.5;
	this.y = canvasHeight * 0.5;
	this.angle = 0;

	// this.bigEye.src = "./src/bigEye0.png";
	// this.bigBody.src = "./src/bigSwim0.png";
	// this.bigTail.src = "./src/bigTail0.png";

	for(var i = 0;i < 8;i++)
	{
		this.bigTail[i] = new Image();
		var bigTailImageSrc = "./src/bigTail" + i + ".png";
		this.bigTail[i].src = bigTailImageSrc;
	}
	this.bigTailTimer = 0;
	this.bigTailFrameCount = 0;

	for(var i = 0;i < 2;i++)
	{
		this.bigEye[i] = new Image();
		var bigEyeImageSrc = "./src/bigEye" + i + ".png";
		this.bigEye[i].src = bigEyeImageSrc;
	}
	this.bigEyeTimer = 0;
	this.bigEyeFrameCount = 0;
	this.bigEyeInterval = 2000;

	for(var i = 0;i < 8;i++)
	{
		this.bigBodyOrange[i] = new Image();
		this.bigBodyBlue[i] = new Image();
		var bigBodyOrangeImageSrc = "./src/bigSwim" + i + ".png";
		var bigBodyBlueImageSrc = "./src/bigSwimBlue" + i + ".png";
		this.bigBodyOrange[i].src = bigBodyOrangeImageSrc;
		this.bigBodyBlue[i].src = bigBodyBlueImageSrc;
	}
	this.bigBodyFrameCount = 0;//初始化勿忘！
}
momFishObj.prototype.draw = function()
{
	//lerp x,y  即让大鱼的坐标跟随鼠标的坐标.lerpDistance函数在commonFunctions.js中已经写好
	this.x = lerpDistance(mouseX, this.x, 0.96);//第三个参数越大，则大鱼跟着鼠标动的速度越慢，和按正常思维想的不一样（待研究）
	this.y = lerpDistance(mouseY, this.y, 0.96);

	/*计算delta angel，即大鱼的坐标和鼠标的坐标之间形成的夹角,需要用到反正切函数
	 *Math.atan2(deltay,deltax)	一定要 + Math.PI，Math.atan2返回的角度值范围是-PI到PI，如果不加，就不是
	 鱼的头朝向鼠标
	 */
	var currentDeltaAngle = Math.atan2(mouseY - this.y,mouseX - this.x) + Math.PI;

	/*lerp angle  即让大鱼的角度跟随其与鼠标之间形成的夹角
	 *lerpAngle(aimAngle, currentAngle, ratio)函数已经在commonFunctions.js中已经写好
	 *需要注意的是lerpAngle(aimAngle, currentAngle, ratio)中deltaAngle之所以要加减2*PI，是因为
	 *Math.atan2返回的角度值范围是-PI到PI
	 */
	this.angle = lerpAngle(currentDeltaAngle, this.angle, 0.6);//第三个参数越小，则方向转得越快越灵活

	//big Tail 动画
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer > 50)
	{
		this.bigTailFrameCount = (this.bigTailFrameCount + 1) % 8;
		this.bigTailTimer %= 50;
	}

	//big Eye 动画
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer > this.bigEyeInterval)
	{
		this.bigEyeFrameCount = (this.bigEyeFrameCount + 1) % 2;
		this.bigEyeTimer %= this.bigEyeInterval;
	}
	if(this.bigEyeFrameCount == 0)
	{
		this.bigEyeInterval = Math.random() * 1500 + 2000;
	}
	else
	{
		this.bigEyeInterval = 100;
	}

	context1.save();
	context1.translate(this.x,this.y);//将大于的坐标设置为(0,0)参考点
	context1.rotate(this.angle);//旋转画布。一定要在context1.translate(this.x,this.y);之后再进行

	var bigTailCount = this.bigTailFrameCount;
	context1.drawImage(this.bigTail[bigTailCount],0 - this.bigTail[bigTailCount].width * 0.5 + 30,0 - this.bigTail[bigTailCount].height * 0.5);

	var bigBodyCount = this.bigBodyFrameCount;
	if(data.double == false)//orange
	{
		context1.drawImage(this.bigBodyOrange[bigBodyCount],0 - this.bigBodyOrange[bigBodyCount].width * 0.5,0 - this.bigBodyOrange[bigBodyCount].height * 0.5);
	}
	else//blue
	{
		context1.drawImage(this.bigBodyBlue[bigBodyCount],0 - this.bigBodyBlue[bigBodyCount].width * 0.5,0 - this.bigBodyBlue[bigBodyCount].height * 0.5);
	}
	
	var bigEyeCount = this.bigEyeFrameCount;
	context1.drawImage(this.bigEye[bigEyeCount],0 - this.bigEye[bigEyeCount].width * 0.5,0 - this.bigEye[bigEyeCount].height * 0.5);
	
	context1.restore();
}