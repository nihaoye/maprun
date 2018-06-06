/**
 * Created by Administrator on 2018/6/2.
 */
const fse = require('fs-extra');
const fs = require('fs');
const walker=require('walker');
const path = require('path');
walker('map/')
	.on('entry', function(entry, stat) {
		console.log('Got entry: ' + entry)
	})
	.on('dir', function(dir, stat) {
		console.log('Got directory: ' + dir);
	})
	.on('file', function(file, stat) {
		console.log('Got file: ' + file)
		rename(file)
	})
	.on('symlink', function(symlink, stat) {
		console.log('Got symlink: ' + symlink)
	})
	.on('blockDevice', function(blockDevice, stat) {
		console.log('Got blockDevice: ' + blockDevice)
	})
	.on('fifo', function(fifo, stat) {
		console.log('Got fifo: ' + fifo)
	})
	.on('socket', function(socket, stat) {
		console.log('Got socket: ' + socket)
	})
	.on('characterDevice', function(characterDevice, stat) {
		console.log('Got characterDevice: ' + characterDevice)
	})
	.on('error', function(er, entry, stat) {
		console.log('Got error ' + er + ' on entry ' + entry)
	})
	.on('end', function() {
		console.log('All files traversed.')
	});

async function  rename(file) {
	var dir=file.replace(/\\L\d{1,2}\\/,function(str){
		return str.replace("L","");
	});
	dir=dir.replace(/\\R[a-z0-9]+\\/,function(str){
		str=str.replace("R","").replace(/\\/g,'');
		str=parseInt(str,16);
		return "\\"+str+"\\";
	});
	dir=dir.replace(/\\C[0-9a-z]+\.png/,function(str){
		str=str.replace('\\C','').replace('.png','');
		str=parseInt(str,16);
		return "\\"+str+".png";
	});
	dir=dir.replace("map",'map2');
	await fse.ensureDir(path.dirname(dir));
	//await fse.copy(file,dir);
	await fse.rename(file,dir)
}
