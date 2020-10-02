
/*

import { Windows } from './Windows.js';
import { Sten3D } from './Sten3D.js';
*/
import { Splice } from './../sp/Splice.js';
/**
* Стена(линия)
* @class
* @extends Splice
*/
export function SpliceSten (_stage) {
	Splice.call(this,_stage);
	var self = this;
	this.type = 'SpliceSten';
	this.tipe = 'SpliceSten';
	this.stage = _stage;
	this._boolText = true;
	this._active = false;


	this._height = this.stage._height;
	this.content2d = new PIXI.Container();
	_stage.content2d.addChild(this.content2d);

	
	this.graphics = new PIXI.Graphics();
    this.content2d.addChild(this.graphics);
    this.graphics.interactive = true;
    

    this.graphics.beginFill(Math.random()*0xffffff, 0.5);
    this.graphics.drawCircle(0,0,150);


    this.onDragStart=function(e){
    	if(_stage.par.sobSP!=undefined)_stage.par.sobSP("downSten",self,e)
    }

    this.graphics.interactive = true;            
    this.graphics.on('mousedown', this.onDragStart);



    /**/

    

/*
	this.content3d = new THREE.Object3D();
	_stage.content3d.add(this.content3d);
	this.content3d.gObj=this;
	this.idRandom=Math.random();


	this.funDragMenu=undefined;
	this._activMouse=true;
	this._col3d=_stage.col3d;
	this._col3d1=_stage.col3d1;

	this.materialSten = this.stage.pm.mat.getIDReturn(this._col3d);
	this.materialSten1 = this.stage.pm.mat.getIDReturn(this._col3d1);	


	this.materialVerh = this.stage.materialVerh;
	this.materialVerh1 = this.stage.materialVerh1;


	this.triangulateShape = this.stage.triangulateShape;


	this.windows = new Windows(this, this.stage.isNot3D);
	this.sten3D = new Sten3D(this);

	this.arrayClass.push(this.windows);
	this.arrayClass.push(this.sten3D);


	this.content3d.add(this.sten3D.content3d);
	this.content3d.add(this.windows.content3d);

	this.stage.pm.visi3D.objShadow(this.content3d, true)


	this.addBlok = function (_blok) {
		return this.windows.addBlok(_blok)
	}
	this.removeBlok = function (_blok) {
		return this.windows.removeBlok(_blok)
	}

	this.contains = function (_point) {
		return this.sten2D.contains(_point);
	};
*/
	


	this.draw1 = function () {
	
		this.graphics.clear();
		this.graphics.lineStyle(10, 0x555555, 0.8);
		this.graphics.moveTo(0,0);
		this.graphics.lineTo(this._distans,0);


		this.graphics.lineStyle(0.1, Math.random()*0xffffff, 0.18);
		this.graphics.beginFill(0x47aec8, 0.5);





		this.graphics.moveTo(-this.arrPosit[2].x,this.arrPosit[2].y);
		this.graphics.lineTo(-this.arrPosit[1].x,this.arrPosit[1].y);
		this.graphics.lineTo(-this.arrPosit[0].x,this.arrPosit[0].y);

		
		this.graphics.lineTo(this.arrPosit1[5].x+this._distans,this.arrPosit1[5].y);
		this.graphics.lineTo(this.arrPosit1[4].x+this._distans,this.arrPosit1[4].y);
		this.graphics.lineTo(this.arrPosit1[3].x+this._distans,this.arrPosit1[3].y);

		this.graphics.lineTo(this.arrPosit1[2].x+this._distans,this.arrPosit1[2].y);
		this.graphics.lineTo(this.arrPosit1[1].x+this._distans,this.arrPosit1[1].y);
		this.graphics.lineTo(this.arrPosit1[0].x+this._distans,this.arrPosit1[0].y);


		this.graphics.lineTo(-this.arrPosit[5].x,this.arrPosit[5].y);
		this.graphics.lineTo(-this.arrPosit[4].x,this.arrPosit[4].y);
		this.graphics.lineTo(-this.arrPosit[3].x,this.arrPosit[3].y);

	}



	this.dragPost=function(){		
		this.content2d.x=this.position.x;
		this.content2d.y=this.position.y;
		this.content2d.rotation=this._rotation;

		this.draw1();


		this.stage.render();
	}

}
SpliceSten.prototype = Object.create(Splice.prototype);
SpliceSten.prototype.constructor = SpliceSten;

SpliceSten.prototype.getObj = function () {
	var o = Splice.prototype.getObj.call(this);
	o.type = this.type;
	//o.windows = this.windows.getObj();
	o.colorSten = this.colorSten;
	o.boolText = this.boolText;
	o.height = this.height;
	o.height = this.height;
	o.col3d=this.col3d
	o.col3d1=this.col3d1	
	return o;
};
SpliceSten.prototype.setObj = function (o) {
	Splice.prototype.setObj.call(this, o);
	//if (o.windows !== undefined) this.windows.setObj(o.windows);
	if (o.boolText!== undefined)  this.boolText=o.boolText;
	if (o.height!== undefined)  this.height=o.height;
	if (o.col3d!== undefined ) this.col3d=o.col3d
	if (o.col3d1!== undefined ) this.col3d1=o.col3d1
	
};
SpliceSten.prototype.compare = function (_sten) {
	var rez = true;
	if (!Splice.prototype.compare(this, _sten)) rez = false;
	return rez;
};
SpliceSten.prototype.setSten = function (_sten) {
	Splice.prototype.setSten.call(this, _sten);
};
SpliceSten.prototype.restart = function () {
	Splice.prototype.restart(this);
	//this.windows.clear();
	//this.content2d.addChild(this.sten2D.content2d);
	//this.stage.configureSplice(this);
};

SpliceSten.prototype.drag = function () {
	Splice.prototype.drag.call(this);
	this.stage.addObjFun(this);
	//trace(">>>>",this);
};
Object.defineProperties(SpliceSten.prototype, {


	height: {
		set: function (value) {
			if (this._height === value) return;			
			this._height = value;
			this._setAllParam('height', this._height);
		},
		get: function () { return this._height; }
	},

	boolText: {
		set: function (value) {
			if (this._boolText === value) return;			
			this._boolText = value;			
			this._setAllParam('boolText', this._boolText);
		},
		get: function () { return this._boolText; }
	},


	active: {
		set: function (value) {
			if (this._active === value) return;			
			this._active = value;
			this._setAllParam('active', this._active);
		},
		get: function () { return this._active; }
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
			for (var ii = 0; ii < this.arrayClass.length; ii++) {
				if ('activMouse' in this.arrayClass[ii]) this.arrayClass[ii].life = this._life;
			}
			if(this._life==true)this.stage.content2d.addChild(this.content2d);
			else if(this.content2d.parent!=undefined)this.content2d.parent.removeChild(this.content2d);
		},
		get: function () { return this._life; }
	},


	// ---
	col3d: {
		set: function (value) {
			
			if (this._col3d === value) return;			
			this._col3d = value;
			
			this.materialSten = this.stage.pm.mat.getIDReturn(this._col3d);
			this._setAllParam('col3d', this._col3d);
			if(this.funDragMenu!=undefined)this.funDragMenu()
			this.stage.render()
		},
		get: function () { return this._col3d; }
	},


	col3d1: {
		set: function (value) {
			if (this._col3d1 === value) return;
			this._col3d1 = value;
			this.materialSten1 = this.stage.pm.mat.getIDReturn(this._col3d1);
			this._setAllParam('col3d1', this._col3d1);
			if(this.funDragMenu!=undefined)this.funDragMenu()
			this.stage.render()
		},
		get: function () { return this._col3d1; }
	},

});


/**
* Стена(квадрат) с 4 стен(линий)
* Нужен для изменения внутренней и внешней дистанции
* @class
*/
function SpliceStenSquare (_arr) {
	var self = this;
	this.type = 'SpliceStenSquare';
	this.tipe = 'SpliceStenSquare';

	this._distans0 = 0;
	this._distans1 = 0;
	this.array = [];
	this._activ = false;

	this.getDist01 = function () {

		this._dist0 = 0;
		this._dist1 = 0;

		for (var i = 0; i < this.array.length; i++) {
			this._dist0 += this.array[i].distans0;
			this._dist1 += this.array[i].distans1;
		}
	};


	var pos = new Position();
	var pos1 = new Position();
	var distForOne = 0; // рахница. сколько нужно добавить к каждой стене

	this.upDateDist01ForArr = function (_distOld, dist, nameDist) {
		distForOne = (dist - _distOld) / this.array.length;
		for (var i = 0; i < this.array.length / 2; i++) {

			var p = this.array[i].position.copy();
			var p1 = this.array[i].position1.copy();
			calc.korektToLine(p, p1, ((this.array[i][nameDist] + distForOne) - this.array[i][nameDist]) / 2, 0); // (новый размер - старый) / 2

			if (i === 0) {
				pos.x = p.x;
				pos1.x = p1.x;
			}
			if (i === 1) {
				pos.y = p.y;
				pos1.y = p1.y;
			}
		}

		this.array[0].addPoint.position.x = pos.x;
		this.array[0].addPoint1.position.x = pos1.x;
		this.array[0].addPoint.position.y = pos.y;
		this.array[0].addPoint1.position.y = pos.y;


		this.array[1].addPoint.position.x = pos1.x;
		this.array[1].addPoint1.position.x = pos1.x;
		this.array[1].addPoint.position.x = pos1.x;
		this.array[1].addPoint1.position.x = pos.x;


		this.array[2].addPoint.position.x = pos1.x;
		this.array[2].addPoint1.position.x = pos.x;
		this.array[2].addPoint.position.y = pos1.y;
		this.array[2].addPoint1.position.y = pos1.y;

		this.array[3].addPoint.position.x = pos.x;
		this.array[3].addPoint1.position.x = pos.x;
		this.array[3].addPoint.position.y = pos1.y;
		this.array[3].addPoint1.position.y = pos.y;

		for (var i = 0; i < this.array.length; i++) {
			this.array[i].addPoint.dragVokrug();
			this.array[i].addPoint1.dragVokrug();
		}
	};


	this.setArr = function (_arr) {
		
		this.array = _arr;
		this.delph = this.array[0].delph;
	};
}
SpliceStenSquare.prototype = {


	set dist0 (v) {
		if (this._dist0 === v) return;
		this.upDateDist01ForArr(this._dist0, v, '_distans0');

		this._dist0 = v;
	},
	get dist0 () {
		this.getDist01();
		return this._dist0;
	},
	set dist1 (v) {
		if (this._dist1 === v) return;
		this.upDateDist01ForArr(this._dist1, v, '_distans1');

		this._dist1 = v;
	},
	get dist1 () {
		this.getDist01();
		return this._dist1;
	}
};
