/**
 * Created by Administrator on 2018/6/5.
 */
var gm = require("gm");
var fse=require("fs-extra");
var path=require("path");
/**
 * 裁剪图片
 * @param srcImg    待裁剪的图片路径
 * @param destImg   裁剪后的图片路径
 * @param width     宽度
 * @param height    高度
 * @param x         x坐标
 * @param y         y坐标
 */
function cropImg(srcImg,destImg,x, y) {
	gm(srcImg).crop(256, 256, x, y).write(destImg, function (err) {
		console.log(err);
	});
}
async function createWp(srcImg,level,row,col){
	var destDir=path.resolve('destmap',level+'',row+'');
	await fse.ensureDir(destDir); 
	cropImg(srcImg,path.resolve(destDir,col+".png"),(col-startCol)*256,(row-startRow)*256);
}
//17
/*var startRow=57083;
var endRow=57088;
var startCol=107028;
var endCol=107033;*/

/*var startRow=114168*2+1;
var endRow=114174*2;
var startCol=214056*2;
var endCol=214063*2;*/
var startLevel=17;
var endLevel=19;

for(var l=startLevel;l<=endLevel;l++){
	for(var row=startRow;row<=endRow;row++){
		for(var col=startCol;col<=endCol;col++){
			createWp('image/map19.png',19,row,col);
		}
	}
}



