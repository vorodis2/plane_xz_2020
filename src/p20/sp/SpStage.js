

import { SpUtility } from './SpUtility.js';
import { SpCalc } from './SpCalc.js';
import { KorektSplice } from './KorektSplice.js';

import { Splice } from './Splice.js';
import { SpPol } from './SpPol.js';
import { SpPoint } from './SpPoint.js';
import { Rectangle, Calc, PositionFun, Position, LinePosition} from './Calc.js';
/**
* мир для сращалок
* Базовый класс мир управление для линий и точек
* @class
*/
export function SpStage () {
	var self = this;
	this.type = 'SpStage';

	this._delph = 20;

	/** Тип точек которые будут создаватся в этом мире new 'SpPoint'()
	* @member {string}
	*/
	this.tipPoint = 'SpPoint';

	/** Тип линий которые будут создаватся в этом мире new 'Splice'()
	* @member {string}
	*/
	this.tipSplice = 'Splice';

	/** буфер линий
	* @member {Array<Splice>}
	*/
	this.arrSplice = [];

	/** буфер точек
	* @member {Array<SpPoint>}
	*/
	this.arrPoint = [];

	/** буфер pol
	* @member {Array<SpPol>}
	*/
	this.arrPol = [];

	


	this.arrayClass = [];

	/** обекты которые создались в setObj
	* @member {Array<SpPoint | Splice>}
	*/
	this.arrCreat = [];
	this.arrClear = [];
	this.arrClearState = [];

	/** базовый конфиг который пришел в setConfig чтоб задать параметры для configData
	* @member {Object}
	*/
	this.objBase = undefined;

	/** текущая конфигурация линии
	* @member {ConfigDataSp}
	*/
	this.configData = {delph:20};

	/** Утилита для линий
	* @member {SpUtility}
	*/
	this.spUtility = new SpUtility();

	/** Расчитывает пересечения линий
	* @member {SpCalc}
	*/
	this.spCalc = new SpCalc();

	trace(window)
	window.calc=new Calc()
	window.PositionFun =PositionFun
	window.Position =Position
	window.Rectangle =Rectangle
	window.LinePosition = LinePosition



	/** Утилита с разными полезными функ для линии убрать паралели итд
	* @member {KorektSplice}
	*/
	this.korektSplice = new KorektSplice(this);

	this._activMouse = true;
	this._pointVisi = true;
	this._oporPointVisi = true;
	this._visiDimensioOnObj = false; // показать размер на объекте

	this.hesh = {};


	
	this.getPoint=function(){ return new SpPoint(this);}
	this.getSplice=function(){ return new Splice(this);}
	this.getPol=function(){ return new SpPol(this);}
	


	this.funUpdateUuid = function (olduid, newuid) {
		if (self.hesh[olduid]) {
			if (self.hesh[olduid] !== this) window.console.error('', self.hesh[olduid], this);
			delete (self.hesh[olduid]);
		}
		if (self.hesh[newuid]) {
			if (self.hesh[newuid] !== this) window.console.error('этот uuid уже испольузутся', self.hesh[newuid], this);
			delete (self.hesh[olduid]);
		}
		self.hesh[newuid] = this;
	};
}
SpStage.prototype = {
	// --------------------------метода точек--------------
	/**
	* Создать точку это мира(определенного типа this.tipPoint)
	* @return {SpPoint} точка
	*/
	craetPoint: function () {
		for (var i = 0; i < this.arrPoint.length; i++) {
			if (this.arrPoint[i].life == false) {
				this.arrPoint[i].life = true;
				return this.arrPoint[i];
			}
		}
		var comand = this.getPoint();//'new ' + this.tipPoint + '(this)';eval(comand)
		this.arrPoint.push(comand);
		this.arrPoint[this.arrPoint.length - 1].idArr = this.arrPoint.length - 1;
		return this.arrPoint[this.arrPoint.length - 1];
	},

	// --------------------------метода стен--------------
	/**
	* Создать линию это мира(определенного типа this.tipSplice)
	* @return {Splice} линия
	*/
	craetSplice1: function () {

		for (var i = 0; i < this.arrSplice.length; i++) {
			if (this.arrSplice[i].life == false) {
				this.arrSplice[i].life = true;								
				this.arrSplice[i].delph=this._delph;
				return this.arrSplice[i];
			}
		}
		var comand = this.getSplice();//'new ' + this.tipSplice + '(this)';
		this.arrSplice.push(comand)//eval(comand));
		this.arrSplice[this.arrSplice.length - 1].idArr = this.arrSplice.length - 1;
		this.arrSplice[this.arrSplice.length - 1].funUpdateUuid = this.funUpdateUuid;
		this.arrSplice[this.arrSplice.length - 1].restart();
		this.arrSplice[this.arrSplice.length - 1].delph=this._delph;
		this.hesh[this.arrSplice[this.arrSplice.length - 1].uuid] = this.arrSplice[this.arrSplice.length - 1];


		return this.arrSplice[this.arrSplice.length - 1];
	},

	craetSplice: function (obj, uuid) {
		return this.create(obj, uuid);
	},
	// получить по уникальном id
	create: function (obj, uuid) {
		obj = obj || {};
		uuid = uuid || obj.uuid;
		if (!uuid) return this.craetSplice1();
		if (!this.hesh[uuid]) {
			var newSp = this.craetSplice1();
			newSp.uuid = uuid;
		}
		if (obj) this.hesh[uuid].setObj(obj);
		return this.hesh[uuid];
	},

	craetPol: function () {
		
		for (var i = 0; i < this.arrPol.length; i++) {

			if (this.arrPol[i].life == false) {
				this.arrPol[i].life = true;					
				return this.arrPol[i];
			}
		}
		var comand = this.getPol();//'new ' + this.tipSplice + '(this)';		
		this.arrPol.push(comand)//eval(comand));
		this.arrPol[this.arrPol.length - 1].idArr = this.arrPol.length - 1;
		this.hesh[this.arrPol[this.arrPol.length - 1].uuid] = this.arrPol[this.arrPol.length - 1];	
		return this.arrPol[this.arrPol.length - 1];
	},


	
	render: function () {
	
	},	


	getIdPositon: function (p, arrUuidConect) {
		for (var i = 0; i < this.arrPoint.length; i++) {
			if (this.arrPoint[i].life != false) {
				if (calc.testPositPoint(this.arrPoint[i].position, p)) {
					if (haveConnect(this.arrPoint[i], arrUuidConect)) {
						return i;
					}
				}
			}
		}
		function haveConnect (p, _uuids) {
			if (!_uuids) return true;
			var arrSten = p.getConectedSten();
			for (var i = 0; i < arrSten.length; i++) {
				if (_uuids.indexOf(arrSten[i].uuid) !== -1) return true;
			}
			return false;
		}
		return -1;
	},

	getPointXY: function (p) {
		for (var i = 0; i < this.arrPoint.length; i++) {
			if (!this.arrPoint[i].life) continue;			
			if(Math.round(p.x)==Math.round(this.arrPoint[i].position.x)){
				if(Math.round(p.y)==Math.round(this.arrPoint[i].position.y)){
					return this.arrPoint[i]
				}
			}
		}

		var o = this.craetPoint();
		o.position.setPoint(p);
		return o

	},

	// обворачивает стенку в точки
	stenInPoint: function (sten) {
		var arr = sten.connected ? sten.connected.arr : undefined;
		var p = this.getIdPositon(sten.position, arr);
		var point;
		if (p == -1) {
			point = this.craetPoint();
		} else {
			point = this.arrPoint[p];
		}
		point.position.setPoint(sten.position);
		point.addSplice(sten, true);

		arr = sten.connected ? sten.connected.arr1 : undefined;
		p = this.getIdPositon(sten.position1, arr);
		if (p == -1) {
			point = this.craetPoint();
		} else {
			point = this.arrPoint[p];
		}
		point.position.setPoint(sten.position1);
		point.addSplice(sten, false);
	},
	/**
     * Получить конфиги живых обьектов на сцене
     * @param {Boolean||undefined} _activ - true -> получить конфиги активных, false -> не активных.
     * @return {Object} найденные обьекты.
    */
	getObj: function (_activ) {
		var o = {};
		o.type = this.type;
		o.tipPoint = this.tipPoint;
		o.tipSplice = this.tipSplice;
		o.arrPoint = [];
		o.arrSplice = [];
		o.arrPol = [];

		for (var i = 0; i < this.arrPoint.length; i++) {
			if (!this.arrPoint[i].life) continue;			
			o.arrPoint.push(this.arrPoint[i].getObj());
		}

		for (var i = 0; i < this.arrSplice.length; i++) {
			if (!this.arrSplice[i].life) continue;			
			o.arrSplice.push(this.arrSplice[i].getObj());
		}

		for (var i = 0; i < this.arrPol.length; i++) {
			if (!this.arrPol[i].life) continue;			
			o.arrPol.push(this.arrPol[i].getObj());
		}



		return o;
	},

	setObj: function (o) {
		// this.type = o.type;
		if (o.tipPoint != undefined) this.tipPoint = o.tipPoint;
		if (o.tipSplice != undefined) this.tipSplice = o.tipSplice;

		this.arrCreat.length = 0;

		var newObj;
		
		/*if (o.arrPoint != undefined) {
			for (var i = 0; i < o.arrPoint.length; i++) {
				newObj = this.craetPoint();
				newObj.setObj(o.arrPoint[i]);
				this.arrCreat.push(newObj);
			}
		}*/

		if (o.arrSplice != undefined) {
			for (var i = 0; i < o.arrSplice.length; i++) {
				newObj = this.craetSplice();
				newObj.setObj(o.arrSplice[i]);
				this.arrCreat.push(newObj);
			}
		}

		if (o.arrPol != undefined) {

			for (var i = 0; i < o.arrPol.length; i++) {
				newObj = this.craetPol();

				newObj.setObj(o.arrPol[i]);
				

			}

		}

		//if (o.spMousePrefix != undefined) this.spMouse.prefix = o.spMousePrefix;

		clearFreePoint(this.arrPoint);

		function clearFreePoint (arrPoint) {
			for (var i = 0; i < arrPoint.length; i++) {
				arrPoint[i].clearFree();
			}
		}

		for (var i = 0; i < this.arrPoint.length; i++) {
			if (!this.arrPoint[i].life) continue;			
			this.arrPoint[i].dragGG();
		}
	},

	clear: function () {		
		for (var i = 0; i < this.arrPoint.length; i++) {
			this.arrPoint[i].clear();
		}
		for (var i = 0; i < this.arrSplice.length; i++) {
			this.arrSplice[i].clear();
		}
		for (var i = 0; i < this.arrPol.length; i++) {
			this.arrPol[i].clear();
		}		
	},
};
// гет сет
Object.defineProperties(SpStage.prototype, {
	delph: {
		set: function (value) {			
			this._delph = value;			
		},
		get: function () { return this._delph; }
	},
});
