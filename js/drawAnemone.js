//绘制海葵（anemone）
var aneObj = function()
{
	// this.x = [];
	// this.length = [];

	//绘制二次贝赛尔曲线
	//需要start point,end point,control point
	//控制点不需要定义，用start point的坐标来确定即可
	this.rootx = [];//start point-x （起始点的y值就是canvas的高度值，故不需要定义）
	this.headx = [];//end point-x
	this.heady = [];//end point-y
	this.angle;
	this.amp = [];//海葵头部摆动的振幅,每个海葵都有自己单独的振幅，显得更自然

}
aneObj.prototype.num = 50;
aneObj.prototype.init = function()
{
	this.angle = 0;
	for(var i = 0;i < this.num;i++)
	{
		this.rootx[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		// this.length[i] = 190 + Math.random() * 50;
		this.heady[i] = canvasHeight - 230 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;//振幅越大，海葵左右摇摆的幅度越大
	}
	// console.log("aaa");  调试用
}
aneObj.prototype.draw = function()
{
	this.angle += deltaTime * 0.0009;//越大，海葵摆动得越快
	var distanceRatio = Math.sin(this.angle);//[-1,1]

	context2.save();
	context2.lineWidth = 21;	/*不能带有px单位！*/
	context2.lineCap = "round";
	context2.strokeStyle = "#3b154e";
	context2.globalAlpha = 0.6;	 //全局透明度

	for(var i = 0;i < this.num;i++)
	{
		//begainPath,moveTo,lineTo,lineWidth,lineCap,strokeStyle,globalAlpha,stroke
		context2.beginPath();
		context2.moveTo(this.rootx[i],canvasHeight);//start point
		// context2.lineTo(this.x[i],canvasHeight - this.length[i]);
		this.headx[i] = this.rootx[i] + distanceRatio * this.amp[i];
		context2.quadraticCurveTo(this.rootx[i],canvasHeight - 130,this.headx[i],this.heady[i]);//绘制二次贝赛尔曲线
		context2.stroke();
	}
	context2.restore();
}