var dataObj = function()
{
	this.fruitNum = 0;
	this.double = false;//吃到一个蓝色果实，则分值加倍。此时this.double变为true
	this.score = 0;
	this.isGameOver = false;
	this.textAlpha = 0;//文字的透明度变量
}
// dataObj.prototype.reset = function()
// {
// 	this.fruitNum = 0;
// 	this.double = false;
// }
dataObj.prototype.addScore = function()
{
	if(data.double)
	{
		this.score += this.fruitNum * 20;//注意：用到的不是fruit.num,而是data里的fruitNum！
		// console.log(fruit.num);
		// console.log("doublekill");
	}
	else
	{
		this.score += this.fruitNum * 10;
	}
	// fruit.num = 0;
	this.fruitNum = 0;
 	this.double = false;
	// data.reset();
}
dataObj.prototype.draw = function()
{
	/*把下面的三条样式语句放在main.js中的初始化函数中，而不要放在这里，因为这里是要一次一次循环的*/
	// context1.fillStyle = "#fff";//绘制文本的填充颜色
	// context1.font = "30px Verdana,sans-serif";
	// context1.textAlign = "center";

	context1.save();

	if(this.isGameOver)
	{
		this.textAlpha += deltaTime * 0.0003;
		if(this.textAlpha >= 1)
		{
			this.textAlpha = 1;
		}
		context1.font = "30px Verdana,sans-serif";
		context1.shadowBlur = 10;
		context1.shadowColor = "#fff";
		context1.fillStyle = "rgba(255,255,255," + this.textAlpha + ")";
		context1.fillText("GAMEOVER",canvasWidth * 0.5,canvasHeight * 0.5);
	}
	context1.fillStyle = "#fff";
	context1.shadowBlur = 0;
	context1.font = "20px Arial,Verdana,sans-serif";
	context1.fillText("Num " + this.fruitNum,canvasWidth * 0.5,canvasHeight - 70);//绘制文本
	context1.fillText("double " + this.double,canvasWidth * 0.5,canvasHeight - 45);
	context1.fillText("Score " + this.score,canvasWidth * 0.5,canvasHeight - 20);

	context1.restore();
}
