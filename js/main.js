var canv1;
var canv2;
var context1;
var context2;

var lastTime;
var	deltaTime;

var bgPicture = new Image();

var canvasWidth,
	canvasHeight;

var anemone;

var fruit;

var mom,
	baby;

var mouseX,//鼠标的X值
	mouseY;//鼠标的X值

var data;

var wave,
	halo;
var dust;//漂浮物

document.body.onload = game;//game()函数相当于主函数
function game()
{
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}
function init()
{
	canv1 = document.getElementById("canvas1");//绘制fishes,dust,UI,circul
	context1 = canv1.getContext('2d');
	canv2 = document.getElementById("canvas2");//绘制background,anemone(海葵),fruit
	context2 = canv2.getContext('2d');

	//注意：下面的canvas千万不要写成context1！
	canvas1.addEventListener('mousemove',onMouseMove,false);/*HTML DOM中的事件监听函数，语法是
															element.addEventListener(event, function, useCapture)
															注意: 不要使用 "on" 前缀。 例如，使用 
															"click" ,而不是使用 "onclick"，使用"mouseover",
															而不是HTML DOM 的鼠标移动事件“onmousemove”*/

	bgPicture.src = "./src/background.jpg";	/*原来写的是"../src/background.jpg"，会导致
											浏览器找不到该图片——JavaScript和CSS用于寻找资源
											路径方法不一样？还是说"../"表示父目录只适用于
											用“url()”?("./"表示根目录)*/
	canvasWidth = canvas1.width;
	canvasHeight = canvas1.height;

	context1.fillStyle = "#fff";//绘制文本的填充颜色
	context1.textAlign = "center";

	mouseX = canvasWidth * 0.5;//初始化鼠标的坐标
	mouseY = canvasHeight * 0.5;

	anemone = new aneObj();
	anemone.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momFishObj();
	mom.init();
	baby = new babyObj();
	baby.init();

	data = new dataObj();
	// data.reset();

	wave = new waveObj();
	wave.init();
	halo = new haloObj();
	halo.init();

	dust = new dustObj();
	dust.init();

}
function gameloop()
{
	requestAnimFrame(gameloop);//相对于setInterval和setTimeout更科学,让gameloop函数循环调用
							   //已经在commonFunction.js里封装好了
	// console.log("loop");  调试用

	var currentTime = Date.now();
	deltaTime = currentTime - lastTime;
	lastTime = currentTime;
	if(deltaTime >= 40)
	{
		deltaTime = 40;//防止游戏页面不是当前显示页面，等过了一段时间再切换回来时出现特别大的果实
	}
	// console.log(deltaTime);

	drawBackground();
	// drawAnemone();
	anemone.draw();
	// fruit.screenFruitNumMonitor();
	screenFruitNumMonitor();
	fruit.draw();
	context1.clearRect(0,0,canvasWidth,canvasHeight);	//在loop里，每次都清空一下context1画布，在干净
													    //的画布上绘制，从(0,0)到(canvasWidth,canvasHeight)
													    //清空。如果不加这句，绘出的鱼线条会很粗
	mom.draw();
	baby.draw();
	mom_fruit_collision();
	mom_baby_collision();

	data.draw();

	dust.draw();

	wave.draw();
	halo.draw();
}

function onMouseMove(e)
{
	if(!data.isGameOver)//如果游戏结束，则大鱼将不再受鼠标的控制
	{
		if(e.offsetX || e.layerX)
		{
			//mouseX、mouseY是自定义的变量,但是offsetX和layerX是内置的属性（offsetX和layerX待研究）
			mouseX = e.offsetX == undefined ? e.layerX : e.offsetX;
			mouseY = e.offsetY == undefined ? e.layerY : e.offsetY;
			// console.log(mouseX);  调试
		}
	}
	
}