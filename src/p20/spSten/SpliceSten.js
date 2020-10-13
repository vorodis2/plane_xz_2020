
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
	this.idUi=Math.round(Math.random()*1000);
	this.sUi = -1;
	this._offset=0;
	this._bChaz=false;
	this._bChaz1=false;

	this._height = this.stage._height;
	
	this.content2d = new PIXI.Container();
	_stage.content2d.addChild(this.content2d);
	
	this.graphics = new PIXI.Graphics();
    this.content2d.addChild(this.graphics);
    this.graphics.interactive = true;


    this.content2d1 = new PIXI.Container();
	_stage.content2d1.addChild(this.content2d1);
	
	this.graphics1 = new PIXI.Graphics();
    this.content2d1.addChild(this.graphics1);

   /* this.ddd=function(){
    	if(self._offset!=0){
    		console.warn("====",self.arrPosit1[2].y)
    		
    	}
    }

    this.arrPosit1[2]=new PositionFun(0,0,this.ddd)*/

    var sahh=0
    this.aVKol
    this.arrVorur = [new Position(), new Position(), new Position(), new Position(), new Position(), new Position(), new Position(), new Position()];

    this.onDragStart=function(e){
    	if(_stage.par.sobSP!=undefined)_stage.par.sobSP("downSten",self,e)
    }

    this.graphics.interactive = true;            
    this.graphics.on('mousedown', this.onDragStart);




    this.alpha=_stage._alpha;    
    this.colorP=_stage._colorP;
    this.colorP1=_stage._colorP1;


	this.draw1 = function () {
		sahh=0
		this.plusVor(-this.arrPosit[2].x,this.arrPosit[2].y)
		this.plusVor(-this.arrPosit[1].x,this.arrPosit[1].y)
		this.plusVor(-this.arrPosit[0].x,this.arrPosit[0].y)

		this.plusVor(this.arrPosit1[5].x+this._distans,this.arrPosit1[5].y)
		this.plusVor(this.arrPosit1[4].x+this._distans,this.arrPosit1[4].y)
		this.plusVor(this.arrPosit1[3].x+this._distans,this.arrPosit1[3].y)

		this.plusVor(this.arrPosit1[2].x+this._distans,this.arrPosit1[2].y)		
		this.plusVor(this.arrPosit1[1].x+this._distans,this.arrPosit1[1].y)
		this.plusVor(this.arrPosit1[0].x+this._distans,this.arrPosit1[0].y)

		this.plusVor(-this.arrPosit[5].x,this.arrPosit[5].y)
		this.plusVor(-this.arrPosit[4].x,this.arrPosit[4].y)
		this.plusVor(-this.arrPosit[3].x,this.arrPosit[3].y)

	
		this.graphics.clear();
		this.graphics.beginFill(this._offset ==0 ? this.colorP : this.colorP1, this.alpha);
		this.graphics.moveTo(this.arrVorur[0].x,this.arrVorur[0].y);
		for (var i = 0; i < this.aVKol; i++) {
			this.graphics.lineTo(this.arrVorur[i].x,this.arrVorur[i].y);
		}
		this.graphics.lineTo(this.arrVorur[0].x,this.arrVorur[0].y);


		this.graphics1.clear();				
		for (var i = 0; i < this.aVKol; i++) {	
			this.graphics1.lineStyle(20, 0x000000, 1);
			this.graphics1.moveTo(this.arrVorur[i].x,this.arrVorur[i].y);
			if(i!=this.aVKol-1)this.graphics1.lineTo(this.arrVorur[i+1].x,this.arrVorur[i+1].y);
			else this.graphics1.lineTo(this.arrVorur[0].x,this.arrVorur[0].y);
		}
	}


	this.plusVor = function (_x,_y) {		
		if(sahh==0){
			this.arrVorur[sahh].set(_x,_y)
			
			sahh++;
		}else{
			//if(this.idArr==16)trace(sahh+"==",_x,_y,"::",this.arrVorur[sahh-1].x,this.arrVorur[sahh-1].y)
			if(this.arrVorur[sahh-1].x!=_x||this.arrVorur[sahh-1].y!=_y){			
				if(this.arrVorur[0].x!=_x||this.arrVorur[0].y!=_y)
				if(sahh<this.arrVorur.length){
					this.arrVorur[sahh].set(_x,_y)					
					sahh++;
					this.aVKol=sahh
				}

			}
		}
	}




	this.dragPost=function(){		
		this.content2d.x=this.position.x;
		this.content2d.y=this.position.y;
		this.content2d.rotation=this._rotation;

		this.content2d1.x=this.position.x;
		this.content2d1.y=this.position.y;
		this.content2d1.rotation=this._rotation;

		this.draw1();


		this.stage.render();
	}


	var bb;
	var sten;
	var pp,pp1
	this.korectOffset=function(){
		if(this.sUi!=-1){
			bb=false;
			this.offset=0
			if(sten!=undefined)if(sten.idUi==this.sUi)if(sten.life==true){				
				bb=true;
			}
			if(bb==false){
				if(sten==undefined){
					for (var i = 0; i < _stage.arrSplice.length; i++) {
						if(_stage.arrSplice[i].life==false)continue;

						if(_stage.arrSplice[i].idUi==this.sUi){
							sten=_stage.arrSplice[i]
							bb=true;
						}
					}
				}
			}

			if(bb==true){
				pp=this.delph/2-sten.delph/2
				//pp1=sten.delph/2

				this.offset+=this._bChaz ? pp : -pp
				//this.offset+=this._bChaz1 ? pp1 : -pp1

				
			}
		
		}
	}

}
SpliceSten.prototype = Object.create(Splice.prototype);
SpliceSten.prototype.constructor = SpliceSten;

SpliceSten.prototype.getObj = function () {
	var o = Splice.prototype.getObj.call(this);
	o.type = this.type;
	//o.windows = this.windows.getObj();
	o.colorSten = this.colorSten;
	o.height = this.height;
	o.sUi=this.sUi;	
	o.offset=this.offset;
	o.bChaz=this.bChaz;
	return o;
};
SpliceSten.prototype.setObj = function (o) {
	Splice.prototype.setObj.call(this, o);
	//if (o.windows !== undefined) this.windows.setObj(o.windows);
	if (o.boolText!== undefined)  this.boolText=o.boolText;
	if (o.height!== undefined)  this.height=o.height;
	if (o.col3d!== undefined ) this.col3d=o.col3d;
	if (o.idUi!== undefined ) this.idUi=o.idUi;
	if (o.sUi!== undefined ) this.sUi=o.sUi;	
	if (o.offset!== undefined ) this.offset=o.offset;
	if (o.bChaz!== undefined ) this.bChaz=o.bChaz;	
	
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

			if(this._life==true)this.stage.content2d1.addChild(this.content2d1);
			else if(this.content2d1.parent!=undefined)this.content2d1.parent.removeChild(this.content2d1);
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

	offset: {
		set: function (value) {
			if (this._offset === value) return;
			this._offset = value;	
		
			this._setAllParam('offset', this._offset);
			if(this.funDragMenu!=undefined)this.funDragMenu();
			this.stage.render()
		},
		get: function () { return this._offset; }
	},
	
	bChaz: {
		set: function (value) {
			if (this._bChaz === value) return;
			this._bChaz = value;	
		
			this._setAllParam('bChaz', this._bChaz);
			if(this.funDragMenu!=undefined)this.funDragMenu();
			this.stage.render()
		},
		get: function () { return this._bChaz; }
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
