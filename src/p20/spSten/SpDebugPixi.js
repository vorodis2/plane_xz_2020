

export class SpDebugPixi  {
    constructor() {
    	this.type="SpDebugPixi";
    	var self=this;
    	this.content2d = new PIXI.Container();




    	this.contentDebag = new PIXI.Container();
		this.content2d.addChild(this.contentDebag);
		//this.contentDebag.position.y = -200;

		var g = new PIXI.Graphics();
		this.content2d.addChild(g);

    	this.debagLine = function (p, p1, color, wL) {
			//if (this.debagOk(aP) == false) return;
			this.graphics = new PIXI.Graphics();
			this.contentDebag.addChild(this.graphics);
			if (color == undefined)color = 0xFF0000;
			if (wL == undefined)wL = 10;
			this.graphics.lineStyle(wL, color, wL);
			this.graphics.moveTo(p.x, p.y);
			this.graphics.lineTo(p1.x, p1.y);
		};


		this.debagPoint = function (p, r, color, wL, a) {		
			this.graphics = new PIXI.Graphics();
			this.contentDebag.addChild(this.graphics);
			r = r || 50;
			if (color == undefined)color = 0xFF0000;
			wL = wL || 10;

			this.graphics.lineStyle(10, color, wL);
			this.graphics.beginFill(color, a==undefined ? 1: a);
			this.graphics.drawCircle(p.x, p.y, r);
		};


		this.clearD = function () {
			g.clear();
		};
		this.clear = function () {
			g.clear();
		};

		this.dLine = function (p, p1, color, wL) {
			//if (this.debagOk(aP) == false) return;
			if (color == undefined)color = 0xFF0000;
			if (wL == undefined)wL = 10;
			g.endFill();
			g.lineStyle(wL, color, wL);
			g.moveTo(p.x, p.y);
			g.lineTo(p1.x, p1.y);
			g.endFill();
		};
		this.dPoint = function (p, r, color, wL) {
			//if (this.debagOk(aP) == false) return;
			r = r || 50;
			if (r > 1000000) {
				console.warn('Большой круг рисовать не буду', r);
				return;
			}
			if (color == undefined)color = 0xFF0000;
			wL = wL || 10;
			g.lineStyle(10, color, wL);
			g.drawCircle(p.x, p.y, r);
			g.endFill();
		};


		this.dLinePosition = function (p, color) {
			var rr = 20.5;
			g.lineStyle(rr, color, rr);

			g.moveTo(p.p.x, p.p.y);
			g.lineTo(p.p1.x, p.p1.y);
			g.moveTo(p.p1.x, p.p1.y);
			g.lineTo(p.p2.x, p.p2.y);

			g.beginFill(color, 0.3);
			g.drawCircle(p.p.x, p.p.y, rr);
			g.drawCircle(p.p1.x, p.p1.y, rr);
			g.drawCircle(p.p2.x, p.p2.y, rr);
			g.endFill();
		};

		this.dRect = function (r, color, wL) {
			//if (this.debagOk(aP) == false) return;
			r = r || 50;
			if (r > 1000000) {
				console.warn('Большой круг рисовать не буду', r);
				return;
			}
			if (color == undefined)color = 0xFF0000;
			wL = wL || 10;
			let ww=r.w  ==undefined ? r.width : r.w
			let hh=r.h  ==undefined ? r.height : r.h

			let p={x:r.x,y:r.y};
			let p1={x:r.x+ww,y:r.y};
			let p2={x:r.x+ww,y:r.y+hh};
			let p3={x:r.x,y:r.y+hh};
			this.dLine(p,p1, color, wL)
			this.dLine(p1,p2, color, wL)
			this.dLine(p2,p3, color, wL)
			this.dLine(p3,p, color, wL)
		
		};

    }
}



