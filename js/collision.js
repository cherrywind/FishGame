//碰撞检测，即判断大鱼和果实之间的距离
function mom_fruit_collision()
{
	if(!data.isGameOver)//如果游戏结束，则大鱼将不能吃果实，即与果实相碰不再有效
	{
		for(var i = 0;i < fruit.num;i++)
		{
			if(fruit.isAlive[i])
			{
				//计算momFish和fruit之间的距离，calLength2(x1, y1, x2, y2)函数已在commonFunctions.js中
				//写好了，返回的是距离的平方
				var dist = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
				if(dist < 900)
				{
					fruit.isEaten(i);//果实消失
					data.fruitNum++;

					mom.bigBodyFrameCount++;
					if(mom.bigBodyFrameCount > 7)
					{
						mom.bigBodyFrameCount = 7;
					}
					if(fruit.fruitType[i] == "blue")
					{
						data.double = true;
					}

					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}
	}
	
}

function mom_baby_collision()
{	
	/*只有当大鱼吃到果实(data.fruitNum > 0)，才能够喂小鱼，即此时大鱼和小鱼的碰撞才是有效的，
	 *才能将小鱼点亮
	 *如果已经gameover，大鱼也不能喂小鱼
	 */
	if(data.fruitNum > 0 && !data.isGameOver)
	{
		var mbDist = calLength2(mom.x,mom.y,baby.x,baby.y);
		if(mbDist < 900)
		{
			//baby recover
			baby.babyBodyFrameCount = 0;
			// data.reset();  放到addScore函数里去调用
			mom.bigBodyFrameCount = 0;//大鱼和小鱼拥抱之后，大鱼的身体变成无色
			//更新得分
			data.addScore();
			//出现圆圈特效
			halo.born(baby.x,baby.y);
		}
	}
}