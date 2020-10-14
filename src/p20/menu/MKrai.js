



export class MKrai  {
  	constructor(par,fun) {  		
  		this.type="MKrai";
  		var self=this;
        this.par=par
        this.fun=fun

        this.otstup=par.otstup;
        this.otstup1=par.otstup1;
        this.wh=par.wh;

        this.sizeMax=400;//par.sizeMax

        this.dCont = new DCont(this.par.dCont); 
        this.dCont.x=this.otstup;
        this.dCont.y=this.otstup*4+this.wh

        this.panel = new DPanel(this.dCont,0,0);
        this.panel.height=this.wh/2;

        this.panel1 = new DPanel(this.dCont,0,0);
        this.panel1.width=this.wh/2;


        this.pan = new DPanel(this.dCont,0,0);
        this.pan.height=this.wh/2;
        this.pan.color='#dddddd' 
        this.pan.alpha=0.35

        this.pan1 = new DPanel(this.dCont,0,0);
        this.pan1.width=this.wh/2;
        this.pan1.color='#dddddd'
        this.pan1.alpha=0.35



        this.set= function(p,p1){ 
          
          
            let s=p.w/p1.w
            let xx=p.x-p1.x
            let ww=p.w-p1.w
            let pr=1//-xx/ww
            if(ww!=0)pr=-xx/ww
    

            this.pan.width=Math.round(s*this.panel._width)
            this.pan.x=(this.panel._width-this.pan._width)*pr;

          
          
            s=p.h/p1.h
            xx=p.y-p1.y
            ww=p.h-p1.h
            pr=1//-xx/ww
            if(ww!=0)pr=-xx/ww;           

            this.pan1.height=Math.round(s*this.panel1._height)
            this.pan1.y=(this.panel1._height-this.pan1._height)*pr;

            //this.pan.x=
        }




        this.sizeWindow = function(w,h,s){ 
            this.pan.y=this.panel.y=h+this.otstup
            this.panel.width=w; 

            this.pan1.x=this.panel1.x=w+this.otstup
            this.panel1.height=h;            
        }
    }
}
