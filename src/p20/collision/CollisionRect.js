

import { CollisionDetection } from './CollisionDetection.js';

/**
 * Класс управляющий коллизиями
 * @class
 * @return {object} Созданный блок.
*/

export function CollisionRect () {
	var self = this;

    this.funDell;

	this.world = new RectCollis(0, 0, 400, 300);

	if (calcColis == undefined) new CalcColis();

	this.colozi = new CollisionDetection();
	this.colozi.bigBox = this.world;
	
	this.colozi.fun = function (i) {
		if (self.funDell != undefined)self.funDell(i);
	};

	var arrRect = [];
	this.arrRect = arrRect;

	var p;
	this.addRect = function (r) {
		
		p = 9999999;

		for (var i = 0; i < arrRect.length; i++) {

			if (arrRect[i].idRandom == r.idRandom) {

				p = i;

				break;
			}
		}

		if (p == 9999999) {
			
			r.rectartID();

			arrRect.push(r);

			this.colozi.arrBox.push(r.rectCollisMeshdy);
			this.colozi.activBox = r.rectCollisMeshdy;

			var b = this.colozi.correct();

			if (!b) {
				self.removeRect(r);
			}

			return b;
		}
	};

	this.removeRect = function (r, bool) {

		p = 9999999;

		for (var i = 0; i < arrRect.length; i++) {

			if (arrRect[i].idRandom == r.idRandom) {

				p = i;

				break;
			}
		}

		if (p != 9999999) {

			this.colozi.arrBox.splice(p, 1);

			p = arrRect.splice(p, 1);

			if (bool == undefined) this.removeRect(p, true);
		}
	};

	this.addRectStatic = function (blok) {

		for (var i = 0; i < this.colozi.hideBox.length; i++) {

			if (this.colozi.hideBox[i] == blok) {
				return;
			}
		}

		this.colozi.hideBox.push(blok);
	};

	this.removeRectStatic = function (blok) {

		for (var i = 0; i < this.colozi.hideBox.length; i++) {

			if (this.colozi.hideBox[i] == blok) {

				this.colozi.hideBox.splice(i, 1);

				return;
			}
		}
	};

	this.clearNa = function () {

		if (arrRect.length != 0) {

			for (var i = 0; i < arrRect.length; i++) {

				calcColis.isState(this.world, arrRect[i]);
				calcColis.isState(arrRect[i], this.world);
			}
		}
	};

	this.update = function () {
		this.colozi.updateWorld();
	};

	this.testRect = function (r) {
		return this.colozi.redactBox(r.rectCollisMeshdy);
	};

	this.isCollisionBigBox = function (r) {
		return this.colozi.isCollisionBigBox(r.rectCollisMeshdy);
	};

	this.clear = function () {
		while (this.arrRect.length !== 0) {
			this.removeRect(this.arrRect[this.arrRect.length - 1]);
		}
	}

}

CollisionRect.prototype = {
	set width (v) {
		this.world.width = v;
		this.clearNa();
	},
	get width () {
		return this.world.width;
	}
};

/** @module planer */

/**
 * Вспомогательнфй класс для сохранения размеров колизий
 * @class
*/

function RectCollisMeshdy (_x, _y, _width, _height, fun) {
	this._x = _x || 0;
	this._y = _y || 0;

	this.width = _width || 100;
	this.height = _height || 100;
	this.fun = fun;
}

RectCollisMeshdy.prototype = {
	set x (v) {
		this._x = v;
		if (this.fun) this.fun();
	},
	get x () {
		return this._x;
	},

	set y (v) {
		this._y = v;
		if (this.fun) this.fun();
	},
	get y () {
		return this._y;
	}
};

/** @module planer */

/**
 * Колизии
 * @class
 * @return {object} Созданный блок.
*/

export function RectCollis (_x, _y, _width, _height, fun) {
	var self = this;
	this.fun = fun;

	this.x = _x || 0;
	this.y = _y || 0;

	this.sx = _x || 0;
	this.sy = _y || 0;

	this.width = _width || 100;
	this.height = _height || 100;
	this.position = new PositionCollis(0, 0, function () {

		self.rectCollisMeshdy.x = this.x + self.sx;
		self.rectCollisMeshdy.y = this.y + self.sy;
		self.rectCollisMeshdy.width = self.width;
		self.rectCollisMeshdy.height = self.height;
	});

	this.__x = _x || 0;
	this.__y = _y || 0;

	this.rectCollisMeshdy = new RectCollisMeshdy(this.x, this.y, this.width, this.height, function () {

		self.__x = self.rectCollisMeshdy.x - self.sx;
		self.__y = self.rectCollisMeshdy.y - self.sy;

		if (self.fun)self.fun();
	});


	this.arrKri = [0, 0, 0, 0];
	this.kolPoint = 0;
	this.peresek = false;

	this.idRandom = Math.random();
	this.rectartID = function () { this.idRandom = Math.round(Math.random() * 10000000000000000) / 10000000000000000; };
	this.parent;

	this.set = function (r) {

		this.x = r.x;
		this.y = r.y;

		this.width = r.width;
		this.height = r.height;

		this.position.x = r.position.x;
		this.position.y = r.position.y;
		this.idRandom = r.idRandom;
	};

	var p = new PositionCollis();
	this.getPoint = function (num) {
		if (num == 0)p.set((this.__x), this.y + this.position.y);
		if (num == 1)p.set((this.__x + this.width), this.y + this.position.y);
		if (num == 2)p.set((this.__x + this.width), this.y + this.position.y + this.height);
		if (num == 3)p.set((this.__x), this.y + this.position.y + this.height);

		if (num == 4)p.set((this.__x), this.y + this.position.y);
		return p;
	};
}

/** @module planer */

/**
 * Вспомогательнфй класс для сохранения позиций колизий
 * @class
*/

function PositionCollis (_x, _y, fun) {
	this._x = _x || 0;
	this._y = _y || 0;
	this.fun = fun;
	this.set = function (_x, _y) {
		this.x = _x;
		this.y = _y;
	};
}

PositionCollis.prototype = {
	set x (v) {
		this._x = v;
		if (this.fun) this.fun();
	},
	get x () {
		return this._x;
	},

	set y (v) {
		this._y = v;
		if (this.fun) this.fun();
	},
	get y () {
		return this._y;
	}
};


/** @module planer */

/**
 * @see {CalcColis}
 * @global
*/

var calcColis;

/**
 * Вспомогательнфй класс для расчетов колизий
 * @class
*/

function CalcColis () {

	calcColis = this;
	// Получение угла между двумя точками градусы
	this.getAngle = function (a, b) {
		return Math.atan2(b.y - a.y, b.x - a.x);
	};

	// получить дистанцию между точками
	this.getDistance = function (p1, p2) {
		if (!p1 || !p2) return 0;
		return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
	};

	this.getVector = function (length, angle) {
		var point = new THREE.Vector2(0, 0);
		point.x = Math.abs(length) * Math.cos(angle);
		point.y = Math.abs(length) * Math.sin(angle);
		return point;
	};

	// поверяем находится ли вторый прямоугольник в первом
	this.isPutIn = function (r1, r2) {

		if ((r1.x + r1.position.x <= r2.x + r2.position.x) && (r1.x + r1.position.x + r1.width >= r2.x + r2.position.x + r2.width)) {
			
            if ((r1.y + r1.position.y <= r2.x + r2.position.y) &&
                (r1.y + r1.position.y + r1.height >= r2.y + r2.position.y + r2.height)
			) {
				return true;
			}
		}

		return false;
	};


	var sah, ii;

	// находиться ли точка в ректе
	this.isPointInRect = function (p, r) {

		if ((p.x > r.x + r.position.x) && (p.x < r.x + r.position.x + r.width)) {

			if ((p.y > r.y + r.position.y) && (p.y < r.y + r.position.y + r.height)) {

				return 1;
			}
		}

		return 0;
	};

	// во внутрь смещение второго треугольника относительно первого
	this.rectInRect = function (r1, r2) {

		sah = 0;

		for (ii = 0; ii < 4; ii++) {
			if (r2.arrKri[ii] == 1)sah++;
		}

		if (r1.width < r2.width) return false;
		if (r1.height < r2.height) return false;
		if ((sah == 1) || (sah == 2)) { } else return false;

		if (sah == 1) { // то в углы
			if ((r2.arrKri[0] == 1)) {
				r2.position.x = r1.x - r1.position.x - r2.x + r1.width - r2.width;
				r2.position.y = r1.y - r1.position.y - r2.y + r1.height - r2.height;
			}
			if ((r2.arrKri[1] == 1)) {
				r2.position.x = r1.x - r1.position.x - r2.x;// +r1.width-r2.width;
				r2.position.y = r1.y - r1.position.y - r2.y + r1.height - r2.height;
			}
			if ((r2.arrKri[2] == 1)) {
				r2.position.x = r1.x - r1.position.x - r2.x;// +r1.width-r2.width;
				r2.position.y = r1.y - r1.position.y - r2.y;// +r1.height-r2.height;
			}
			if ((r2.arrKri[3] == 1)) {
				r2.position.x = r1.x - r1.position.x - r2.x + r1.width - r2.width;
				r2.position.y = r1.y - r1.position.y - r2.y;// +r1.height-r2.height;
			}

		}

		if (sah == 2) { // то в стороны
			if ((r2.arrKri[0] == 1) && (r2.arrKri[1] == 1)) {
				r2.position.y = r1.y - r1.position.y - r2.y + r1.height - r2.height;
			}
			if ((r2.arrKri[1] == 1) && (r2.arrKri[2] == 1)) {
				r2.position.x = r1.x - r1.position.x - r2.x;
			}

			if ((r2.arrKri[2] == 1) && (r2.arrKri[3] == 1)) {
				r2.position.y = r1.y - r1.position.y - r2.y;
			}
			if ((r2.arrKri[3] == 1) && (r2.arrKri[0] == 1)) {
				r2.position.x = r1.x - r1.position.x - r2.x + r1.width - r2.width;
			}
		}

		return true;
	};

	var v = new PositionCollis();
	var v1 = new PositionCollis();
	var v2 = new PositionCollis();
	var v3 = new PositionCollis();
	this.isLineRect = function (r1, r2) {
		var i, j, pp;
		for (i = 0; i < 4; i++) {

			v.x = r1.getPoint(i).x;
			v.y = r1.getPoint(i).y;
			v1.x = r1.getPoint(i + 1).x;
			v1.y = r1.getPoint(i + 1).y;

			for (j = 0; j < 4; j++) {
				v2.x = r2.getPoint(j).x;
				v2.y = r2.getPoint(j).y;
				v3.x = r2.getPoint(j + 1).x;
				v3.y = r2.getPoint(j + 1).y;

				pp = this.getPointOfIntersection(v, v1, v2, v3);

				if (pp != null) {
					if (this.testRadom(r1, r2) == false) {
						return true;
					}
				}
			}
		}

		return false;
	};


	this.testRadom = function (r1, r2) {

		if (r1.getPoint(0).x > r2.getPoint(0).x) {
			if (this.numOkr(r1.getPoint(0).x) == this.numOkr(r2.getPoint(1).x)) {
				return true;
			}
		}

		if (r1.getPoint(1).y > r2.getPoint(1).y) {
			if (this.numOkr(r1.getPoint(0).y) == this.numOkr(r2.getPoint(2).y)) {
				return true;
			}
		}

		if (this.numOkr(r1.getPoint(1).x) == this.numOkr(r2.getPoint(0).x)) {
			return true;
		}

		if (this.numOkr(r1.getPoint(2).y) == this.numOkr(r2.getPoint(0).y)) {
			return true;
		}
		return false;
	};


	// проверяем пересечений
	var d, da, db, ta, tb, dx, dy, distans, angel;
	var rez = new PositionCollis(0, 0);
	this.getPointOfIntersection = function (p1, p2, p3, p4) {

		d = (p1.x - p2.x) * (p4.y - p3.y) - (p1.y - p2.y) * (p4.x - p3.x);
		da = (p1.x - p3.x) * (p4.y - p3.y) - (p1.y - p3.y) * (p4.x - p3.x);
		db = (p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x);

		ta = da / d;
		tb = db / d;

		if (ta >= 0 && ta <= 1 && tb >= 0 && tb <= 1) {
			dx = p1.x + ta * (p2.x - p1.x);
			dy = p1.y + ta * (p2.y - p1.y);
			rez.x = dx;
			rez.y = dy;

			return rez; // точка пересечения
		}

		return null;
	};

	this.isState = function (r1, r2) {

		var rez = 0;
		r2.kolPoint = 0;

		for (var i = 0; i < 4; i++) {
			r2.arrKri[i] = this.isPointInRect(r2.getPoint(i), r1);
			if (r2.arrKri[i] == 1)r2.kolPoint++;
		}

		if (r2.kolPoint != 0)rez = 1;
		if (r2.kolPoint == 4)rez = 2;

		return rez;
	};


	this.numOkr = function (n) {
		return Math.round(n * 1) / 1;
	};
}
