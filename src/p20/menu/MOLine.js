

import { MOBaza } from './MOBaza.js';

export class MOLine extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="MOLine";
        this.typeNa="SPLine";
  		var self=this;

        
       
  
        this.dCont=new DCont(par.dCont);        
        this.button=undefined;
        this.slid
        this.slid1
        this.postIn=function(){
           
            this.window.title="SPLine";

            var yy=this.otstup1;


            this.button=new DButton(this.window.content,this.otstup1,yy,"",function(){
                self.object.clear()
            },"resources/image/p0.png");
            this.button.width=this.button.height=this.wh;



            yy+=(this.otstup1+this.wh)

            this.slid=new DSliderBig(this.window.content, this.otstup1,yy, function(s){ 
                self.object.otstup=self.slid.value         
            }, "otstup",  -2000, 2000);
            this.slid.width=this.width-this.otstup1*2;
            this.slid.okrug=1;



            yy+=50
 

            this.window.height=yy+32;





        }        
        
        this.drag=function(){
            self.slid.value=self.object.otstup; 

        }



       

        this.postSO=function(){ 
            this.object.funDragMenu=this.drag;
            this.window.title="SPLine "+this.object.idArr;
            this.drag();
        }
        this.clear=function(){
            if(this.object!=undefined){
                this.object.funDragMenu=undefined;
            }
            this.active=false
        }


        this.sizeWindow = function(w,h,s){ 
            this.dCont.x=w/s-this.width       
        }
  	}

  

}



export class DGSten extends DGallery {
    constructor(dCont, _x, _y, _fun, par) {  
        super(dCont, _x, _y, _fun);
        this.par=par
    

        this._index=-1;
        this._index1=-1;
        this.par=par
        var self=this

        // Функция клика по иконке
        this.downBtn = function (s,p) {
            if(s=="index")self.index = this.idArr; 
            if(s=="index1")self.index1 = this.idArr; 

            if(s=="indexBig"){
                self.index = this.idArr;
                self.index1 = this.idArr;
            } 
            
            self.obj = self.array[this.idArr].object;
            if (self.fun) self.fun(s,p);
        };


        this.createZamen=function(){ 
            var r=new DGBox(this.content, 0, 0, this.downBtn,  this);                 
            return r;
        }

        var aa=0.3
        this.dragIndex=function(){ 
            for (var i = 0; i < this.array.length; i++) {
                if(this._index1 == i||this._index == i){
                    if (this._index == i) {
                        this.array[i].activ = true;
                        this.array[i].setAct(0,true)                      
                        if (this._index1 != i)this.array[i].setAct(1,false)
                    }
                    if (this._index1 == i) {
                        this.array[i].activ = true;
                        this.array[i].setAct(1,true)  
                        if (this._index != i)this.array[i].setAct(0,false)
                    }

                }else {
                    this.array[i].activ = false;
                    this.array[i].setAct(0,false)
                    this.array[i].setAct(1,false)                   
                }
            } 

        }
    }

    set index(value) {   
        this._index = value;
        this.dragIndex()
    }    
    get index() { return  this._index;} 



    set index1(value) {      
        this._index1 = value;
        this.dragIndex()
    }    
    get index1() { return  this._index1;}


    
}
export class DGBox extends DBox {
    constructor(_cont, _x, _y, _fun,par) {  
        super(_cont, _x, _y, _fun);
        this.par=par
        this.dragPic=this.par.par.par.dragPic
        trace("adfs",this.dragPic)
        var self=this
        var otstup=2
        var wh=12
        var ab=[]
        ab[0]=new DButton(this.content,otstup,otstup,"",function(){
            self.fun("index");
        });
        ab[0].width=ab[0].height=wh;
        ab[0].borderRadius=wh;

        ab[1]=new DButton(this.content,44+otstup,otstup,"",function(){
            self.fun("index1");
        });
        ab[1].width=ab[1].height=wh;
        ab[1].borderRadius=wh;
        
        this.setAct=function(p,a){
            if(a==true){
                ab[p].alpha=1;
                ab[p].color=dcmParam.activButton;
            }else{
                ab[p].alpha=0.2;
                ab[p].color=dcmParam.color;
            }
        }


        this.down = function (e) {  
            
            if (self.fun) self.fun("indexBig");
        }
        this.drag = function (e) {
            
            var o=self.object;
            var l="resources/data/"+self.object.id+"/original.png";            
            self.dragPic.start(32, l, o); 
        }

        this.mouseDownNew = function (e) {
            self.dragPic.testDrag(5, self.down, self.drag);           
        };


        if(dcmParam.mobile==false){
            this.image.image.removeEventListener("mousedown", this.mouseDown)
            this.panel.div.removeEventListener("mousedown", this.mouseDown)
            }else{
            this.image.image.removeEventListener("touchstart", this.mouseDown)
            this.panel.div.removeEventListener("touchstart", this.mouseDown)
        }

        



        if(dcmParam.mobile==false){
            this.image.image.addEventListener("mousedown", this.mouseDownNew)
            this.panel.div.addEventListener("mousedown", this.mouseDownNew)
            }else{
            this.image.image.addEventListener("touchstart", this.mouseDownNew)
            this.panel.div.addEventListener("touchstart", this.mouseDownNew)
        }
    }
}

