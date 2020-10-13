





export class DebbugPixi  {
    constructor() {
        var self=this
        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';

        this._width=100;
        this._height=100;
        this._active=true;

        this.stage = new PIXI.Container();
        this.content2d = new PIXI.Container();
        this.stage.addChild(this.content2d);

        this.renderer = new PIXI.autoDetectRenderer(this._width, this._height, {antialias: true, transparent: true, preserveDrawingBuffer: true });
       // this.renderer= new PIXI.Renderer(this._width, this._height/*, {antialias: true, transparent: true, preserveDrawingBuffer: true }*/);

       /* this.renderer= new PIXI.Application({
            width: 800, height: 600
        });*/
        this.renderer.view.style.position = 'fixed';
        
        //var t = new PIXI.ticker.Ticker();
        this.div.appendChild(this.renderer.view);


        this.deb = new Deb(this);


        this.tick = function () {
            
            if(self._active==false) return;  
            //trace("##")          
            //self.renderer.resolution = window.devicePixelRatio * self.resolution;// ставим разрешение рендера (соотношение пикселей)
            self.renderer.render(self.stage);
            
        }

       // t.add(this.tick, this);

       // t.start();

        this.sizeWindow = function(w,h){            
            if(w){
                self._width=w;
                self._height=h;
            }
            trace(self._width+"  "+self._height)

            if(self.renderer){
                //var precresol = self.resolution;// запоминаем предыдущее разрешение пикселей рендера
                self.renderer.view.style.width = self._width + 'px';
                self.renderer.view.style.height = self._height + 'px';                
                
                //self.renderer.resolution = 1;// перед изменение размера в дефолт
                
                self.renderer.resize(self._width, self._height);
                //self.renderer.resolution = precresol;// ставим обратно разрешение
            }                      
        }

    }  
    set width(v) {
        if(this._width!=v){
            this._width = v;            
            this.sizeWindow() 
        }       
    }   
    get width() { return  this._width;}  

    set height(v) {
        if(this._height!=v){
            this._height = v;            
            this.sizeWindow(); 
        }       
    }   
    get height() { return  this._height;}
} 

export class Deb  {
    constructor(par) {
        var self=this;        
        this.par=par;
        this.content2d = new PIXI.Container();
        this.par.content2d.addChild(this.content2d);
        this.graphics = new PIXI.Graphics();
        this.content2d.addChild(this.graphics);



        this.clear=function(){
            this.graphics.clear();
        }

        var x,y,w,h,color,radius,alpha
        this.drawPoint=function(_x,_y,_color,_radius,_alpha){
            x=_x||0;
            y=_y||0;
            color=_color||0xff0000;
            radius=_radius||5;
            alpha=_alpha||0.5;

            
            this.graphics.lineStyle(1, color, alpha);
            this.graphics.beginFill(color, alpha*0.8);
            this.graphics.drawCircle(x-radius/2,y-radius/2,radius);

        }


        this.drawRect=function(_x,_y,_w,_h,_color,_radius,_alpha){
            x=_x||0;
            y=_y||0;
            w=_w||5;
            h=_h||5;
            color=_color||0xff0000;
            radius=_radius||5;
            alpha=_alpha||0.5;
            this.graphics.lineStyle(1, color, alpha);
            this.graphics.beginFill(color, alpha*0.8);
            this.graphics.drawRect(x,y,w,h,radius);
        }

    }
}




