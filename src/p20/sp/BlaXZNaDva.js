



import { LineRange } from './LineRange.js';
import { Position } from './Calc.js';
/**
* Данные для определения пересечений линий
* @class
*/
export function BlaXZNaDva (_otstup) {
	this.otstup = _otstup || 50;
	this.tip = 0;// Линия 1 круг
	this.p = new Position();
	this.p1 = new Position();
	this.p2 = new Position();
	this.maxp = new Position();
	this.maxp1 = new Position();
	this.maxSp1 = new Position();
	this.maxp2 = new Position();
	this.p3 = new Position();
	this.dist01 = 0;
	this.dist12 = 0;

	this.p4 = new Position();
	this.lineRange = new LineRange(20);
	this.lineRange1 = new LineRange(20);

	this.angel = 0;
	var maxR = 20000;
	var dd;
	this.restertTip = function (_tip, p, p1, p2) {

		this.tip = _tip;
		if (_tip == 0) {	// даюе линию со всеми потрахами
			this.p.setPoint(p);
			this.p1.setPoint(p1);
			this.p2.setPoint(p2);
			this.angel = calc.getAngle(p, p1);
			calc.getVector(maxR, this.angel + Math.PI, this.maxp);
			this.maxp.x += p.x;
			this.maxp.y += p.y;

			calc.getVector(this.otstup, this.angel, this.maxp1);
			this.maxp1.x += p1.x;
			this.maxp1.y += p1.y;

			this.dist01 = calc.getDistance(this.p, this.p1);
			this.dist12 = calc.getDistance(this.p1, this.p2);

			calc.getVector(maxR, this.angel, this.maxSp1);
			this.maxSp1.x += p1.x;
			this.maxSp1.y += p1.y;

			dd = calc.getDistance(this.p1, this.p2);
			aa = calc.getAngle(this.p1, this.p2);
			calc.getVector(dd * 2, aa, this.p3);
			this.p3.x += this.p.x;
			this.p3.y += this.p.y;

			// расчитываем от назад
		}
		if (_tip == 1) {

			this.dist12 = Math.abs(p1);
			if (p2 != undefined) {
				// this.lineRange.setLR(p);
				this.lineRange.p.setPoint(p.p1);
				this.lineRange.p1.setPoint(p.p);
				this.lineRange.p2.setPoint(p.p2);
				this.lineRange.updateFromCurvature(this.lineRange.getCurrentCurvature());

				this.lineRange1.p.setPoint(p.p1);
				this.lineRange1.p1.setPoint(p.p);
				this.lineRange1.p2.setPoint(p.p2);
				this.lineRange1.updateFromCurvature(this.lineRange1.getCurrentCurvature());

				// this.lineRange1.setLR(this.lineRange);

				this.lineRange.moveLineRange(p1);

			} else {
				this.lineRange.setLR(p);
				this.lineRange.moveLineRange(p1);
				this.lineRange1.setLR(p);
			}
		}
	};

	var aa;
	this.dragOtstup = function (num) {
		if (this.tip == 0) {
			calc.getVector(num, this.angel, this.maxp1);
			this.maxp1.x += this.p1.x;
			this.maxp1.y += this.p1.y;
		}
	};


	/*this.drawDebag = function (_par, color, color2) {
		console.warn("drawDebag")
		if (!this.debug) return;
		if (this.tip == 0) {
			_par.dLine(this.p, this.maxp, color2);
			_par.dLine(this.p1, this.maxp1, color2);
			_par.dLine(this.maxSp1, this.maxp1, color2, 0.5);

			_par.dLine(this.p, this.p3, color, 3.5);


			_par.dLine(this.p, this.p1, color);
			_par.dLine(this.p1, this.p2, color);
			_par.dPoint(this.p, 1, color);
			_par.dPoint(this.p1, 1, color);
			_par.dPoint(this.p2, 1, color);
		}
		if (this.tip == 1) {
			_par.dPoint(this.lineRange.pOCent, 1, color);
			_par.dPoint(this.lineRange.pOCent, this.lineRange.radius, color);

			_par.dPoint(this.lineRange.p, 3, color);
			_par.dPoint(this.lineRange.p1, 4, color);
			_par.dPoint(this.lineRange.p2, 5, color);

			_par.dPoint(this.lineRange1.p, 3, color);
			_par.dPoint(this.lineRange1.p1, 4, color);
			_par.dPoint(this.lineRange1.p2, 5, color);


			_par.dLine(this.lineRange1.p, this.lineRange.p, color);
		}
	};*/

}
