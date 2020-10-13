
//import { TriangulateShape } from './TriangulateShape.js';
import { SpliceSten } from './SpliceSten.js';
import { SpPointSten } from './SpPointSten.js';
import { SpDebugPixi } from './SpDebugPixi.js';
//import { Pol3D } from './Pol3D.js';
import { SpStage } from './../sp/SpStage.js';
import {  Calc } from './../Calc.js';


import {  SPLineWord } from './SPLineWord.js';
/**
* Мир для сращалок дорог
* @class
* @extends SpStage
*/
export function SpStageSten (par, pm) {
	SpStage.call(this);
	var self = this;
	this.type = 'SpStageSten';
	this.pm=par.pm;
	this.par=par;
	this.tipSplice = 'SpliceSten';
	this.tipPoint = 'SpPointSten';
	this.fun = null;
	

	this._color="#47aec8";
	this._colorP=0x47aec8;
	this._colorP1=0x47aec8;

	this._alpha=1;

	//this._mashtab = 1;
	this._amSten=false;
	this._amPoint=false;
	this._amPol=false;
	this._activMouse=false;

	this._activeSten=-1;
	this._activePoint=-1;
	this._activePol=-1;
	this._height = 300;




	this.boolText = true;
	this.content2d = new PIXI.Container();
	this.content2d1 = new PIXI.Container();

	this.content2dPoint = new PIXI.Container();

	
	this.cont2dLine = new PIXI.Container();

	this.debugPixi = new SpDebugPixi();
	//this.spCalc.setDebug(this.debugPixi);

	this.cont2dDebug = new PIXI.Container();
	this.cont2dDebug.addChild(this.debugPixi.content2d);




	this.lineWord=new SPLineWord(this);


	


	this.colorT=new THREE.Color()
	this.convertC=function(c,a){
		this.colorT.set(c)
		if(a!=undefined){

			this.colorT.r*=a[0]
			this.colorT.g*=a[1]
			this.colorT.b*=a[2]
		}
		trace(this.colorT)
		return this.colorT.getHex()
	}





	
	this.getPoint=function(){ return new SpPointSten(this);}
	this.getSplice=function(){ 
	
		return new SpliceSten(this);
	}/**/
	//this.getPol=function(){ return new Pol3D(this);}


	this.arrFun=[];
	this.arrObj=[];
	

	
	this.render=function(){
		//self.pm.visi3D.intRend=1
		if(this.par.renderDebag)this.par.renderDebag()		
	}

	
		





	this.addObjFun=function(o){
		for (let i = 0; i < this.arrObj.length; i++) {
			if(this.arrObj[i].idRandom==o.idRandom){
				return;
			}
		}
		this.arrObj.push(o);
	}

	this.doRender=function(){

		if(self.arrObj.length==0)return false;	
		//this.debugPixi.clearD();

		for (let i = 0; i < self.arrObj.length; i++) {
			self.arrObj[i].dragPost();
			
		}
		self.arrObj.length=0;

		return true;	
	}

	
}
SpStageSten.prototype = Object.create(SpStage.prototype);
SpStageSten.prototype.constructor = SpStageSten;

SpStageSten.prototype.getObj = function (_activ) {
	var o = SpStage.prototype.getObj.call(this, _activ);	
	o.color=this._color;
	o.alpha=this._alpha;
	o.lineWord=this.lineWord.getObj()
	
	return o;
};
SpStageSten.prototype.setObj = function (o) {	
	SpStage.prototype.setObj.call(this, o);
	if(o.color)this.color=o.color
	if(o.alpha)this.alpha=o.alpha	
	if(o.lineWord)this.lineWord.setObj(o.lineWord)
};



SpStageSten.prototype.craetSplice1 = function () {	
	var s=SpStage.prototype.craetSplice1.call(this);	
	s.col3d=this.col3d;//сторона стенки
	s.col3d1=this.col3d1;//сторона стенки
	s.activMouse=this._amSten;
	s.boolText=this.boolText;
	return s
};

SpStageSten.prototype.craetPoint = function () {	
	var s=SpStage.prototype.craetPoint.call(this);
	s.activMouse=this._amPoint;	
	return s
};


SpStageSten.prototype.craetPol = function () {	
	var s=SpStage.prototype.craetPol.call(this);
	s.activMouse=this._amSten;
	s.col3d2=this.col3d2;
	return s
};




Object.defineProperties(SpStageSten.prototype, {
	color: {
		set: function (value) {	
				
			this._color = value;
			
			this._colorP=this.convertC(value)
			this._colorP1=this.convertC(value,[0.8,0.8,0.8])
			for (var i = 0; i < this.arrSplice.length; i++) {
				this.arrSplice[i].colorP = this._colorP;
				this.arrSplice[i].colorP1 = this._colorP1;				
				this.arrSplice[i].draw1();
			}
		},
		get: function () {
			
		 	return this._color;
		}
	},

	alpha: {
		set: function (value) {			
			this._alpha = value;
			for (var i = 0; i < this.arrSplice.length; i++) {
				this.arrSplice[i].alpha = this._alpha;
				this.arrSplice[i].draw1();
			}
		},
		get: function () { return this._alpha; }
	},




	height: {
		set: function (value) {			
			this._height = value;
			for (var i = 0; i < this.arrSplice.length; i++) {
				this.arrSplice[i].height = this._height;
			}

			for (var i = 0; i < this.arrPoint.length; i++) {
				if (!this.arrPoint[i].life) continue;					
				this.arrPoint[i].dragGG();								
			}

		},
		get: function () { return this._height; }
	},




	amSten: {
		set: function (value) {
			if(this._amSten != value){
				this._amSten = value;
				for (var i = 0; i < this.arrSplice.length; i++) {
					if (!this.arrSplice[i].life) continue;	
					this.arrSplice[i].activMouse =  value;
									
				}
			}
		},
		get: function () { return this._amSten; }
	},
	

	amPoint: {
		set: function (value) {
			if(this._amPoint != value){
				this._amPoint = value;
				for (var i = 0; i < this.arrPoint.length; i++) {
					if (!this.arrPoint[i].life) continue;					
					this.arrPoint[i].activMouse =  value;								
				}
			}
		},
		get: function () { return this._amPoint; }
	},

	amPol: {
		set: function (value) {
			if(this._amPol != value){
				this._amPol = value;
				for (var i = 0; i < this.arrPol.length; i++) {
					if (!this.arrPol[i].life) continue;				
					this.arrPol[i].activMouse = value;
									
				}
			}
		},
		get: function () { return this._amPol; }
	},

	activMouse: {
		set: function (value) {			
			this._activMouse= value;
			this.amPol= value;	
			this.amPoint= value;	
			this.amSten= value;	
		},
		get: function () { return this._activMouse; }
	},



	



	activeSten: {
		set: function (value) {
			
			this._activeSten = value;
			for (var i = 0; i < this.arrSplice.length; i++) {
				if (!this.arrSplice[i].life) continue;	
				if(i==this._activeSten){
					this.arrSplice[i].active = true;
				}else{
					this.arrSplice[i].active = false;
				}				
			}
		},
		get: function () { return this._activeSten; }
	},


	activePoin: {
		set: function (value) {
			
			this._activePoin = value;
			for (var i = 0; i < this.arrPoint.length; i++) {
				if (!this.arrPoint[i].life) continue;	
				if(i==this._activePoin){
					this.arrPoint[i].active = true;
				}else{
					this.arrPoint[i].active = false;
				}				
			}
		},
		get: function () { return this._activePoin; }
	},
	activePol: {
		set: function (value) {
			
			this._activePol = value;
			for (var i = 0; i < this.arrPol.length; i++) {
				if (!this.arrPol[i].life) continue;	
				if(i==this._activePol){
					this.arrPol[i].active = true;
				}else{
					this.arrPol[i].active = false;
				}				
			}
		},
		get: function () { return this._activePol; }
	},	

});
