



export class SPLine  {
  	constructor(par,fun) {  		
  		this.type="SPLine";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this._life=true;

        this._otstup=500;
        this.sah=50;
        this.colol=0x3e575e
        this.colol_="#3e575e"
        this.array=[];
        trace("@@@@@@@@")

        this.content2d = new PIXI.Container();
        par.content2d.addChild(this.content2d);

        this.graphics = new PIXI.Graphics();
        this.content2d.addChild(this.graphics);


        this.text = new PIXI.Text('345634634',{ font: 'bold 200px Arial', fill: this.colol_, align: 'center' }); 
        this.content2d.addChild(this.text);
        



        //this.text.scale.x=this.text.scale.y=100

        this.clear = function () {
            this.life=false
        }


        this.drawposit = function () {
            self.drag();
        };

        this.position = new PositionFun(0, 0, this.drawposit);
        this.position1 = new PositionFun(0, 0, this.drawposit);
        

        var a,d
        this.drag = function () {
            a=calc.getAngle(this.position, this.position1);
            d=calc.getDistance(this.position, this.position1);


            this.content2d.x=this.position.x;
            this.content2d.y=this.position.y;
            this.content2d.rotation=a

     
            

            this.graphics.clear()

            this.graphics.lineStyle(10, this.colol, 1);

            this.graphics.moveTo(0,0); 
                  
            this.graphics.lineTo(0,this._otstup+(this._otstup>0 ? this.sah : -this.sah));
            this.graphics.moveTo(0,this._otstup);
            this.graphics.lineTo(d,this._otstup);

            this.graphics.moveTo(d,0);
            this.graphics.lineTo(d,this._otstup+(this._otstup>0 ? this.sah : -this.sah));

            this.text.text=""+Math.round(d);
            this.text.x=d/2-this.text.width/2;
            this.text.y=this._otstup;
            
            

        };


        this.setObj=function(o){
            this.position.set(o.position.x,o.position.y)
            this.position1.set(o.position1.x,o.position1.y)
            this.otstup=o.otstup
        }
        this.getObj=function(){
            var o={}
            o.position={x:this.position.x,y:this.position.y}
            o.position1={x:this.position1.x,y:this.position1.y}
            o.otstup=this.otstup
            return  o
        }

    }


    set otstup(value) {      
        if(this._otstup!=value){
            this._otstup= value;
            this.drag();
        }
    }    
    get otstup() { return  this._otstup;}


    set life(value) {      
        if(this._life!=value){
            this._life= value;

            if(this._life==true)this.par.content2d.addChild(this.content2d);
            else if(this.content2d.parent!=undefined)this.content2d.parent.removeChild(this.content2d); 
        }
    }    
    get life() { return  this._life;}
}