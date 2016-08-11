/*包括大鱼吃果实的圆圈和大鱼喂小鱼的圆圈*/

/*------------大鱼吃果实的特效----------------------------*/
var waveObj = function()
{
	this.x = [];
	this.y = [];
	this.radius = [];
	this.alive = [];
}
waveObj.prototype.num = 10;
waveObj.prototype.init = function()
{
	for(var i = 0;i < this.num;i++)
	{
		this.alive[i] = false;
		this.radius[i] = 0;//多少没关系
	}
}
waveObj.prototype.born = function(x,y)
{
	for(var i = 0;i < this.num;i++)
	{
		if(!this.alive[i])//如果是空闲的
		{
			//born
			// console.log("born");
			this.alive[i] = true;
			this.radius[i] = 10;
			this.x[i] = x;
			this.y[i] = y;
			return;//在物体池中找到一个去绘制就可以,立即跳出循环
		}
	}
}
waveObj.prototype.draw = function()
{
	context1.save();
	context1.lineWidth = 2;
	context1.shadowBlur = 10;
	context1.shadowColor = "#fff";
	for(var i = 0;i < this.num;i++)
	{
		if(this.alive[i])//如果是激活的，才可以绘制
		{
			//draw
			this.radius[i] += deltaTime * 0.04;
			if(this.radius[i] >= 50)
			{
				this.alive[i] = false;
			}
			var alpha = 1 - this.radius[i] / 50;
			context1.beginPath();
			context1.arc(this.x[i],this.y[i],this.radius[i],0,Math.PI * 2);
			context1.closePath();
			context1.strokeStyle = "rgba(255,255,255," + alpha + ")";
			context1.stroke();
		}
	}
	context1.restore();
}

/*------------大鱼喂小鱼的特效----------------------------*/
//halo是光环的意思
var haloObj = function()
{
	this.x = [];
	this.y = [];
	this.radius = [];
	this.alive = [];
}
haloObj.prototype.num = 10;
haloObj.prototype.init = function()
{
	for(var i = 0;i < this.num;i++)
	{
		this.alive[i] = false;
		this.radius[i] = 0;//多少没关系
	}
}
haloObj.prototype.born = function(x,y)
{
	for(var i = 0;i < this.num;i++)
	{
		if(!this.alive[i])//如果是空闲的
		{
			//born
			// console.log("born");
			this.alive[i] = true;
			this.radius[i] = 20;
			this.x[i] = x;
			this.y[i] = y;
			return;//在物体池中找到一个去绘制就可以,立即跳出循环
		}
	}
}
haloObj.prototype.draw = function()
{
	context1.save();
	context1.lineWidth = 3;
	context1.shadowBlur = 10;
	context1.shadowColor = "rgba(203,91,0,1)";
	for(var i = 0;i < this.num;i++)
	{
		if(this.alive[i])//如果是激活的，才可以绘制
		{
			//draw
			this.radius[i] += deltaTime * 0.04;
			if(this.radius[i] >= 100)
			{
				this.alive[i] = false;
			}
			var alpha = 1 - this.radius[i] / 100;
			context1.beginPath();
			context1.arc(this.x[i],this.y[i],this.radius[i],0,Math.PI * 2);
			context1.closePath();
			context1.strokeStyle = "rgba(203,91,0," + alpha + ")";
			context1.stroke();
		}
	}
	context1.restore();
}