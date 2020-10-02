
import { MLeft } from './MLeft.js';
import { MDragScane } from './MDragScane.js';
import { MObject } from './MObject.js';

export class Menu  {
    constructor(fun) {    	
		this.type="Menu";		
		var self=this;
		this.fun=fun;

		this.wh=48;
		this.otstup=2;
		this.otstup1=10;
		window.dcmParam = new DCM();//интерфейс
		dcmParam.activButton="#f28044";

	    this.dCont=new DCont(document.body);	

	    var array=[];
	    this.array=array
	    array.push(new MStart(this, 0));	
	    this.array[this.array.length]=this.mLeft=new MLeft(this, function(s,p){             
           	if(s=="index")self.mLeft.index=p;
        });

		this.array[this.array.length]=this.mDragScane=new MDragScane(this, function(s,p){             
           	
        });
	   
		this.array[this.array.length]=this.mObject = new MObject(this,function(s,p){
           // self.fun(s,p)
        });

		this.setP20=function(p20){this.mDragScane.setP20(p20)}


	    this.object;
	    this.setObject=function(object){
	    	this.object=object;
	    	let p=0;	    
	    	for (var i = array.length - 1; i >= 0; i--) {
	    		if(array[i].testObj)if(array[i].testObj(object)==true){	    		
	    			p=i;
	    			break;
	    		}	    			
	    	}	    	
	    	this.openMenu(p);
	    }

	    this.openMenu=function(p){
			for (var i = 0; i < array.length; i++) {
				if(array[i].dCont==undefined)continue;				
	    		if(i==p)array[i].dCont.visible = true;
	    		else array[i].dCont.visible = false;
	    	}
	    	
	    } 
	    this.openMenu(0);

		this.setApi=function(s,p,p1){
			if(s=="activObject"){
				this.setObject(p);
			}
	    } 

	    this.setObj=function(o){	    	
	    	let s=JSON.stringify(o);
	    	if(array[0].check.value==true){
	    		s=JSON.stringify(o, null, '\t');
	    	}
	        array[0].textArea.value=s;
            
        }

        this.setArrObj=function(o){
        	let s=JSON.stringify(o);
        	array[0].textArea.value=s;
        	this.mDragScane.redrag();
        }

      /*  var honeyTest;
        this.test2 = function(obj,scan){
        	var wind=new DWindow(this.dCont, 800, 0,"тест второй сцены и событий");
    		wind.width=300;
    		wind.height=300;
    		wind.x=document.documentElement.clientWidth-wind.width
    		//this.w.dragBool=false;
    		//this.w.hasMinimizeButton=false;
    		var textArae=new DTextArea(wind.content,2,wind.height-104,"",function(){

    		})
    		textArae.width=wind.width-4
    		textArae.height=100

    		honeyTest=new Honeycomb('resources/font/helvetiker_bold.typeface.json',function(s,p,p1){    			
    			if(s=="complit"){   				
					honeyTest.setObj(obj);
					honeyTest.sizeWindow(wind.width, wind.height-104);
    			}
    			textArae.text=s+" "+p+"\n"+textArae.text;
    		},
    		'{"ambient":{"works":true,"active":true,"color":"#48f813","intensity":0.79},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#f62c73","bias":0.001,"intensity":0.22,"radius":1,"bAlphaForCoating":false,"fixation":false,"rotationX":0,"rotationZ":0,"distance":0,"cubWidth":500,"cubHeight":500,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":true,"color":"#080808","link":"null","rotZ":0,"radius":1000,"x":204,"y":0,"z":0},"mirror":{"works":true,"link":"null","exposure":-1,"gamma":-1},"visi3D":{"works":true,"alwaysRender":false,"fov":45,"far":45000,"minZum":0,"maxZum":20000,"zume":250,"minRotationX":2.5,"maxRotationX":0,"debug":false,"isDragPan":true,"rotationX":0,"rotationZ":0}}'
    		);
    		
    		wind.content.div.appendChild(honeyTest.div); //приатачиваем див там 3д и соты
        }*/

        this.upDate=function(){
        	if(honeyTest){
        		honeyTest.upDate()
        	}
        }


	    this.sizeWindow=function(w,h,s){
	    	if(s==undefined)s=1
	    	for (var i = array.length - 1; i >= 0; i--) {
	    		if(array[i].sizeWindow)array[i].sizeWindow(w,h,s);
	    	}
	    }
	}
} 


export class MStart  {
    constructor(par, idArr) {
    	this.type="MStart";
		var self=this;
		this.par=par
		this.idArr=idArr

		this.dCont=new DCont(par.dCont);	

		this.w=new DPanel(this.dCont, 2, 2);
    	this.w.height=par.wh+2*this.par.otstup;


    	//SceneSB
    	this.menuScene=undefined;
    	
    	
    	this.opentScane=function(){
    		bopent.visible=false
    		var oo=self.par.fun("returnHoneycomb");
			self.menuScene = new MenuScene(self.w.content, oo.visi3D, function(s,p){ trace(s,p)});
			self.menuScene.sceneSB.setObj(JSON.parse(oo.jsonCamera))
			self.menuScene.setObj();	
    	}
 




  

	    var b = new DButton(this.w, 204, 2, "set",function(){
	        let o=JSON.parse(self.textArea.value);
	        self.par.fun("setObj",o);
	    })
	    b.width=b.height=par.wh-2;

	    var b1 = new DButton(this.w, 204+par.wh+2, 2, "get",function(){
	     
	        var oo=self.par.mDragScane.p20.getObj()
	        trace(oo)
	        self.textArea.value=JSON.stringify(oo)
	    })
	    b1.width=b1.height=par.wh-2;	

	    var b2 = new DButton(this.w, 204+(par.wh+2)*2, 2, "rect",function(){
	        self.par.mDragScane.redrag();
	    })
	    b2.width=b2.height=par.wh-2;

	    this.textArea=new DTextArea(this.w, 2, 2, "null",function(){
	        
	    });
	    this.textArea.width=200;
	    this.textArea.fontSize=8;
	    this.textArea.height=par.wh-2;

		


	    



	    this.setObject=function(object){	    	
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
    		this.w.width=w-par.otstup*2;
    	}
    }
}
