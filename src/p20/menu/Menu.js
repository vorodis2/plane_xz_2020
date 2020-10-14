
import { MLeft } from './MLeft.js';
import { MDragScane } from './MDragScane.js';
import { MObject } from './MObject.js';
import { MGridDrag } from './MGridDrag.js';


import { LocalStorage } from './LocalStorageE6.js';

export class Menu  {
    constructor(par,fun) {    	
		this.type="Menu";		
		var self=this;
		this.par=par;
		this.fun=fun;

		this.wh=48;
		this.otstup=12;
		this.otstup1=10;
		this.sizeMax=4000;

		dcmParam.activButton="#f28044";
		this._menuIndex=-1;

	    this.dCont=new DCont(this.par.dCont);




	    this.localStorage=par.par.localStorage;//new LocalStorage(function(){},"planer2020")

	    trace("this.localStorage",this.localStorage)
	    
	    this.array=[]

	    //подрубаем div2d// драгер XY// колесико
	    


		this.array[this.array.length] = this.mGridDrag = new MGridDrag(this, function(s,p){             
           	
        });

      /*  this.array[this.array.length] = this.mKrai = new MKrai(this, function(s,p){             
           	
        });*/



	    this.array[this.array.length]=this.sStart=new MStart(this, function(s,p){             
           	if(s=="index")self.menuIndex=p;
        });

        


	    this.array[this.array.length]=this.mLeft=new MLeft(this, function(s,p){             
           	if(s=="index")self.menuIndex=p;
        });

		this.array[this.array.length]=this.mDragScane=new MDragScane(this, function(s,p){             
           	
        });
	   
		this.array[this.array.length]=this.mObject = new MObject(this,function(s,p){
           // self.fun(s,p)
        });


		this.setP20=function(p20){
			this.p20=p20;
			this.mDragScane.setP20(p20)
		}


	    this.object;
	    this.setObject=function(object){
	    	this.object=object;

	    	let p=0;	    
	    	for (var i = this.array.length - 1; i >= 0; i--) {
	    		if(this.array[i].testObj)if(this.array[i].testObj(object)==true){	    		
	    			p=i;
	    			break;
	    		}	    			
	    	}	    	
	    	this.openMenu(p);
	    }

	    /*this.openMenu=function(p){
			for (var i = 0; i < this.array.length; i++) {
				if(this.array[i].dCont==undefined)continue;				
	    		if(i==p)this.array[i].dCont.visible = true;
	    		else this.array[i].dCont.visible = false;
	    	}
	    	
	    } 
	    this.openMenu(0);*/

		this.setApi=function(s,p,p1){
			if(s=="activObject"){
				this.setObject(p);
			}
	    } 

	    this.setObj=function(o){
	    	this.sStart.setObj(o)    	
	    	
            
        }

        this.setArrObj=function(o){
        	this.sStart.setArrObj(o)       	
        	this.mDragScane.redrag();
        }



       /* this.upDate=function(){
        	if(honeyTest){
        		honeyTest.upDate()
        	}
        }*/


	    this.sizeWindow=function(w,h,s){
	    	if(s==undefined)s=1	    	
	    	for (var i = this.array.length - 1; i >= 0; i--) {
	    		if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s);
	    	}
	    }
	    this.menuIndex=0;
	}

	set menuIndex(value) {		
        if(this._menuIndex!=value){
            this._menuIndex= value;
            this.mLeft.index=value;
            this.mDragScane.menuIndex= value;
        }
    }    
    get menuIndex() { return  this._menuIndex;}
} 


export class MStart  {
    constructor(par, idArr) {
    	this.type="MStart";
		var self=this;
		this.par=par
		this.idArr=idArr

		this.dCont=new DCont(par.dCont);	
		

		this.w=new DPanel(this.dCont, this.par.otstup, this.par.otstup);
    	this.w.height=par.wh+2*this.par.otstup;

		this.dCont1=new DCont(this.w);
    	self.input=undefined;
    	//SceneSB
    	this.menuScene=undefined;
    	
    	self.localStorage=this.par.localStorage
    	this.opentScane=function(){
    		bopent.visible=false
    		var oo=self.par.fun("returnHoneycomb");
			self.menuScene = new MenuScene(self.w.content, oo.visi3D, function(s,p){ trace(s,p)});
			self.menuScene.sceneSB.setObj(JSON.parse(oo.jsonCamera))
			self.menuScene.setObj();	
    	}
 


    	this.init1=function(){
    		var w=0
    		var b = new DButton(this.dCont1, w, this.par.otstup, "M",function(){		       
    			self.par.mObject.setObject(self.par.p20.sp)
		    })
		    b.width=b.height=par.wh;
		    w+=par.wh+2
    		this.dCont1.width=w+this.par.otstup;
    	}
		this.init1()





    	

  		
    	this.init=function(){
		    var b = new DButton(this.w, 204, this.par.otstup, "set",function(){
		        let o=JSON.parse(self.textArea.value);
		        self.par.fun("setObj",o);

		    })
		    b.width=b.height=par.wh;

		    var b1 = new DButton(this.w, 204+par.wh+this.par.otstup, this.par.otstup, "get",function(){
		     
		        var oo=self.par.mDragScane.p20.getObj()
		        
		        self.textArea.value=JSON.stringify(oo)
		    })
		    b1.width=b1.height=par.wh;	

		    var b2 = new DButton(this.w, 204+(par.wh+this.par.otstup)*2, this.par.otstup, "rect",function(){
		        self.par.mDragScane.redrag();
		    })
		    b2.width=b2.height=par.wh;

		    var b3 = new DButton(this.w, 204+(par.wh+this.par.otstup)*3, this.par.otstup, "save",function(){
		        self.par.localStorage.object.model=self.par.mDragScane.p20.getObj();
		        self.par.localStorage.save();
		    })
		    b3.width=b3.height=par.wh;

		    this.textArea=new DTextArea(this.w, this.par.otstup, this.par.otstup, "null",function(){
		        
		    });
		    this.textArea.width=200-this.par.otstup*2;
		    this.textArea.fontSize=8;
		    this.textArea.height=par.wh;

		    
		    if(this.startObj!=undefined){
		    	trace(this.startObj)
		    }

		    setTimeout(function() {
	    		if(self.par.localStorage.object.model){	    			
		        	self.par.fun("setObj",self.par.localStorage.object.model);
		        	self.par.mDragScane.redrag();
	    		}
	    	}, 100);

    	}




		
    	this.setObj=function(o){
	    	if(self.textArea==undefined)return   	
	    	let s=JSON.stringify(o);
	    	
	    	if(self.check.value==true){
	    		s=JSON.stringify(o, null, '\t');
	    	}	    	
	        self.textArea.value=s;
            
        }

        this.startObj=undefined
	    this.setArrObj=function(o){
	    	this.startObj=o;	    	
         	if(self.textArea==undefined)return;  
        	let s=JSON.stringify(o);
        	self.textArea.value=s;
        	
        }



	    this.setObject=function(object){
	    	if(self.textArea==undefined)return
	    	this.object=self.par.fun("returnScane");
	    	self.input.value=self.object.startVisi;	    	
	    	if(self.input.value == "null"){
	    		bGetScane.text="<"
	    	}else{
	    		bGetScane.text="x"
	    	}
	    	self.par.fun("index",-1);
	    	rot.value=this.object.time;
	    }
    	

    	this.sizeWindow=function(w,h,s){
    		//trace(w,h,s,par.otstup)
    		this.w.width=w/s-par.otstup*2;    		
    		this.dCont1.x =this.w.width-this.dCont1.width
    		
    	}


    /*	this.boolCTRL=false
		this.keydown=function(event){
			
	        if(event.keyCode==17)self.boolCTRL=true

	        if(event.keyCode==81&&self.boolCTRL)  {
            	self.localStorage.object.debug=!self.localStorage.object.debug;
	            self.localStorage.save();
	            location.href=location.href;
	        }            
	    }
	    this.keyup=function(event){
	        if(event.keyCode==17)self.boolCTRL=false
	    }

	    window.addEventListener( 'keydown', this.keydown );    
	    window.addEventListener( 'keyup', this.keyup );  */



	    if(self.localStorage.object.debug&& self.localStorage.object.debug==true){
	    	trace("%%%%%%%%%%%%%%%%%%%%%%%")
	    	this.init()

	    }
    }
}
