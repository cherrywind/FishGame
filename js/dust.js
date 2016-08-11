var dustObj = function()
{
	this.image = [];//保存漂浮物的图片——漂浮物有7张图片，使得漂浮物看起来不都是一个样子，而是有的大有的小
	this.x = [];
	this.y = [];
	this.angle;
	this.amp = [];//振幅
}
dustObj.prototype.num = 25;//太多的话渲染压力比较大
dustObj.prototype.init = function()
{
	this.angle = 0;
	for(var i = 0;i < this.num;i++)
	{
		this.x[i] = Math.random() * canvasWidth;
		this.y[i] = Math.random() * canvasHeight;
		this.amp[i] = Math.random() * 30 + 15;//振幅的话没必要和海葵的保持一致，漂浮物的振幅要
											  //小一些,而且这里用的是随机值，每个漂浮物都有它自己的个性化左右摆动的幅度

		this.image[i] = new Image();
		var dustImageSrc = "./src/dust" + (Math.floor(Math.random() * 50) % 7) + ".png";
		this.image[i].src = dustImageSrc;
	}
}
dustObj.prototype.draw = function()
{
	this.angle += deltaTime * 0.0009;//必须和绘制海葵保持一致。这样才能使漂浮物和海葵的步调一致
	var distanceRatio = Math.sin(this.angle);//[-1,1] 	（正弦曲线的y值）

	context1.save();

	for(var i = 0;i < this.num;i++)
	{
		context1.drawImage(this.image[i],this.x[i] + distanceRatio * this.amp[i],this.y[i]);
	}
	context1.restore();
}
