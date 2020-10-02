
import { SpPoint } from './../sp/SpPoint.js';

//import {PointSten3D } from './PointSten3D.js';

/**
* Данные для точек дороги
* @class
* @extends SpPoint
*/
export function SpPointSten (_stage) {
	SpPoint.call(this);
	var self = this;
	this.type = 'SpPointSten';
	this.tipe = 'SpPointSten';
	this.stage = _stage;
	this._height = 300;

	this._active=false

	this.content2d = new PIXI.Container();
	this.stage.content2dPoint.addChild(this.content2d);


	this.graphics = new PIXI.Graphics();
    this.content2d.addChild(this.graphics);
    this.graphics.interactive = true;
    

    this.graphics.beginFill(0xff0000, 0.3);    
    this.graphics.drawCircle(0,0,150);

    this.funDragMenu=undefined


    this.onDragStart=function(e){
    	if(_stage.par.sobSP!=undefined)_stage.par.sobSP("downPoint",self,e)
    }

    this.graphics.interactive = true;            
    this.graphics.on('mousedown', this.onDragStart);



    this.dragPost=function(){
    	
		this.content2d.x=this.position.x;
		this.content2d.y=this.position.y;
		if(this.funDragMenu!=undefined)this.funDragMenu();
		this.stage.render();
	}



/*
	this.restart = function () {
		SpPointSten.prototype.restart(this);
		this.mashtab = this.stage.mashtab;
		this.pointVisi = this.stage.pointVisi;
	};*/

	// получить типы обектов с которыми эта точка соедена
	// @return {Array<string>}
	this.getTypeConnect = function () {
		var res = ['AidPoint'];
		if (this.arrIdSten.length > 0) {
			res.push('Sten');
		}
		return res;
	};
}
SpPointSten.prototype = Object.create(SpPoint.prototype);
SpPointSten.prototype.constructor = SpPointSten;

SpPointSten.prototype.getObj = function () {
	var o = SpPoint.prototype.getObj.call(this);
	o.type = this.type;

	return o;
};
SpPointSten.prototype.setObj = function (o) {
	SpPoint.prototype.setObj.call(this, o);

	// if(o.type != undefined) this.type = o.type;
};


Object.defineProperties(SpPointSten.prototype, {
	// Отображение точек

	active: {
		set: function (value) {
			if (this._active == value) return;
			this._active = value;
			for (var ii = 0; ii < this.arrayClass.length; ii++) {
				if ('active' in this.arrayClass[ii]) this.arrayClass[ii].active = this._active;
			}
		},
		get: function () { return this._active; }
	},



	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			for (var ii = 0; ii < this.arrayClass.length; ii++) {
				if ('height' in this.arrayClass[ii]) this.arrayClass[ii].height = this._height;
			}
		},
		get: function () { return this._height; }
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			for (var ii = 0; ii < this.arrayClass.length; ii++) {
				if ('activMouse' in this.arrayClass[ii]) this.arrayClass[ii].activMouse = this._activMouse;
			}
		},
		get: function () { return this._activMouse; }
	},
	life: {
		set: function (value) {
			if (this._life == value) return;
			this._life = value;	
					
			if(this._life==true)this.stage.content2dPoint.addChild(this.content2d);
			else if(this.content2d.parent!=undefined)this.content2d.parent.removeChild(this.content2d);
		},
		get: function () { return this._life; }
	},

});
