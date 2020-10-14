

export class PGrid  {
    constructor(cont,wh,rwh) {
    	this.type="PGrid";
    	
        var self = this;
        this.texture = PIXI.Texture.from('resources/image/fill.png');
        //this._scaleGrid = this.texture ? this.texture.baseTexture.width : 100;

        //var scale = 100 / 256;

        this.wh = wh;
        trace(this.wh)

        var sprit = new PIXI.extras.TilingSprite(this.texture, this.wh, this.wh);
        //sprit.anchor.set(0.5, 0.5);
        cont.addChild(sprit);
        var scx = (100 / 256)  /(rwh/100);
        sprit.tileScale.set(scx, scx);

        sprit.position.x=-this.wh/2
        sprit.position.y=-this.wh/2
       // this.scaleGrid = function () {
            // приведение размера к масштабу от размера текущей текстуры
            //v = v //> 100 ? v : 100;
            //this._scaleGrid = v;
            //var scx = rwh / 256;
            //sprit.tileScale.set(scx, scx);
            //sprit.tilePosition.set(v * 0.5, v * 0.5);
       /* };
        this.scaleGrid();*/

       /* var self=this;
        //this.texture = PIXI.utils.TextureCache['resources/image/fill.png'];// PIXI.Texture.fromImage('resources/fill.png');
       // this._scaleGrid = this.texture ? this.texture.baseTexture.width : 100;
        var texture = PIXI.Texture.from('resources/image/fill.png')
        var scale = 100 / 256;

        this.wh = 5000;

        this.graphics = new PIXI.Graphics();
        cont.addChild(this.graphics)
        this.graphics.beginFill(0x00ff00, 0.3);    
        this.graphics.drawCircle(0,0,100);

        //trace(this.texture)
        var sprit = new PIXI.extras.TilingSprite(texture, wh, 20000);
        sprit.anchor.set(0.5, 0.5);
        cont.addChild(sprit);


        this.scaleGrid = function (v) {
            // приведение размера к масштабу от размера текущей текстуры
            v = v > 100 ? v : 100;
            this._scaleGrid = v;
            var scx = this._scaleGrid / sprit.texture.width;
            sprit.tileScale.set(scx, scx);
            sprit.tilePosition.set(v * 0.5, v * 0.5);
        };
        this.scaleGrid(100);*/
    }
}  

