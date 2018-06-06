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
	return new Promise(function(resolve){
	    setTimeout(function(){
            gm('image/map19.png').resize(Math.pow(2,l-startLevel)*2*256,null).crop(256, 256, x, y).write(destImg, function (err) {
                console.log(destImg);
                resolve(err);
            });
        },20)
	})
}
async function createWp(srcImg,level,row,col){
    var num=Math.pow(2,l-startLevel);
    var startCol2=startCol*num;
    var startRow2=startRow*num;
	var destDir=path.resolve('destmap',level+'',row+'');
	await fse.ensureDir(destDir);
	await cropImg(srcImg,path.resolve(destDir,col+".png"),(col-startCol2)*256,(row-startRow2)*256);
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
var startLevel=16;
var endLevel=19;
var l=16;

var startRow=12269;
var endRow=12270;
var startCol=53514;
var endCol=53515;
async function init(){
    for(l=startLevel;l<=endLevel;l++){
        var num=Math.pow(2,l-startLevel);
        for(var row=startRow*num;row<=endRow*num+parseInt(Math.pow(2,l-startLevel-1));row++){
            for(var col=startCol*num;col<=endCol*num+parseInt(Math.pow(2,l-startLevel-1));col++){
                await createWp('image/map19.png',l,row,col);
            }
        }
    }
    console.log('done........');
}
init();




