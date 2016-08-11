var fruitObj = function()
{
	this.x = [];
	this.y = [];
	this.size = [];	//果实的大小
	this.speed = [];  //果实成长、往上飘的速度
	this.fruitType = [];	//果实的类型——橙色果实和蓝色果实,是字符串
	this.isAlive = [];	//保存的是boolean值，表示果实是否处于活跃状态
	this.orange = new Image();
	this.blue = new Image();
	this.anemoneHost = [];//定义每个果实的宿主海葵，即每个果实长在哪个海葵上，为使每个果实
						  //生长的过程中随海葵一起摆动做准备,在每个果实born的时候告诉它在哪个海葵上born
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function()
{
	for(var i = 0;i < this.num;i++)
	{
		this.x[i] = 0;
		this.y[i] = 0;
		// this.isAlive[i] = true;
		this.isAlive[i] = false;
		this.speed[i] = Math.random() * 0.017 + 0.003;//此处速度变化范围越大，则果实就越不会扎堆长大，扎堆往上飘，就会更自然
		// this.born(i);
		this.fruitType[i] = "";	//初始化为空字符串,千万不要忘记写下标[i]！
		this.anemoneHost[i] = 0;//没用的初始化，但是保持好习惯
	}
	this.orange.src = "./src/orangeFruit.png";
	this.blue.src = "./src/blueFruit.png";
}
fruitObj.prototype.draw = function()
{
	for(var i = 0;i < this.num;i++)
	{
		if(this.isAlive[i])
		{
			// console.log(this.fruitType[i]);
			if(this.fruitType[i] == "orange")
			{
				var picType = this.orange;	//赋予orange果实图片的资源
			}
			else
			{
				var picType = this.blue;	//赋予blue果实图片的资源
			}
			

			if(this.size[i] <= 14)	//防止果实无限制地长大
			{
				var anemoneID = this.anemoneHost[i];
				this.x[i] = anemone.headx[anemoneID];
				this.y[i] = anemone.heady[anemoneID];

				// this.size[i] += 0.01 * deltaTime;
				this.size[i] += this.speed[i] * deltaTime;	//每个果实都有不同的成长的速度
			}
			else	//果实长大之后开始往上飘
			{
				// this.y[i] -= 0.05 * deltaTime;
				this.y[i] -= this.speed[i] * 5 * deltaTime;	//每个果实都有不同的飘的速度
			}

			context2.drawImage(picType,this.x[i] - this.size[i] * 0.5,this.y[i] - this.size[i] * 0.5,this.size[i],this.size[i]); //最后两个参数是指绘制图片的尺寸,即size*size大小
			if(this.y[i] < 10)
			{
				this.isAlive[i] = false;	//如果果实已经飘出了画布，则置为非活跃状态
			}
		}
	}
}
fruitObj.prototype.born = function(i)
{
	// var aneID = Math.floor(Math.random() * anemone.num);
	this.anemoneHost[i] = Math.floor(Math.random() * anemone.num);//告诉第i个果实在哪个海葵上出生
	/*出生时不用告诉果实i的坐标了，而是告诉它长在哪个海葵上，然后在果实成长的时候由海葵的ID确定果实的
	 *的坐标*/
	// this.x[i] = anemone.headx[aneID];
	// this.y[i] = anemone.heady[aneID];
	this.size[i] = 0;
	this.isAlive[i] = true;	//这句千万别忘了，否则fruitObj.prototype.draw函数将什么也不执行

	var ran = Math.random();
	if(ran < 0.2)	//该数字越小，则蓝色果实越少
	{
		this.fruitType[i] = "blue";
		// console.log(this.fruitType[i]);
	}
	else
	{
		this.fruitType[i] = "orange";
		// console.log(this.fruitType[i]);
	}
}
fruitObj.prototype.isEaten = function(whichFruit)
{
	this.isAlive[whichFruit] = false;
}
/*
fruitObj.prototype.screenFruitNumMonitor = function()
{
	var aliveNum = 0;
	for(var i = 0;i < this.num;i++)
	{
		if(this.isAlive[i])
		{
			aliveNum++;
		}
	}
	if(aliveNum < 15)
	{
		this.sendAFruit();
		return;
	}
}
*/
function screenFruitNumMonitor()
{
	var aliveNum = 0;
	for(var i = 0;i < fruit.num;i++)
	{
		if(fruit.isAlive[i])
		{
			aliveNum++;
		}
	}
	if(aliveNum < 15)
	{
		sendAFruit();
		return;
	}
}
/*
fruitObj.prototype.sendAFruit = function()
{
	for(var i = 0;i < this.num;i++)
	{
		if(!this.isAlive[i])
		{
			this.born(i);
			return;	//只使一个果实开始成长就好
		}
	}
}
*/
function sendAFruit()
{
	for(var i = 0;i < fruit.num;i++)
	{
		if(!fruit.isAlive[i])
		{
			fruit.born(i);
			return;	//只使一个果实开始成长就好
		}
	}
}