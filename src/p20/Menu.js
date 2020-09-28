



export class Menu  {
    constructor(fun) {    	
		this.type="Menu";		
		var self=this;
		this.fun=fun;

		window.dcmParam = new DCM();//интерфейс

	    this.dCont=new DCont(document.body);	

	    var array=[];
	    array.push(new MStart(this, 0));	



	    this.object

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
	    		if(i==p)array[i].dCont.visible = true;
	    		else array[i].dCont.visible = false;
	    	}
	    	//if(array[p].setObject)array[p].setObject(this.object)
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

        }

        var honeyTest;
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
    		},/*,
    		scan*/
    		'{"ambient":{"works":true,"active":true,"color":"#48f813","intensity":0.79},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#f62c73","bias":0.001,"intensity":0.22,"radius":1,"bAlphaForCoating":false,"fixation":false,"rotationX":0,"rotationZ":0,"distance":0,"cubWidth":500,"cubHeight":500,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":true,"color":"#080808","link":"null","rotZ":0,"radius":1000,"x":204,"y":0,"z":0},"mirror":{"works":true,"link":"null","exposure":-1,"gamma":-1},"visi3D":{"works":true,"alwaysRender":false,"fov":45,"far":45000,"minZum":0,"maxZum":20000,"zume":250,"minRotationX":2.5,"maxRotationX":0,"debug":false,"isDragPan":true,"rotationX":0,"rotationZ":0}}'
    		//'{"ambient":{"works":true,"active":true,"color":"#ffffff","intensity":0.79},"shadow":{"works":true,"active":false,"mapSize":4096,"color":"#ffffff","bias":0.001,"intensity":0.22,"radius":1,"bAlphaForCoating":false,"fixation":false,"rotationX":0,"rotationZ":0,"distance":0,"cubWidth":500,"cubHeight":500,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":false,"color":"0xffffff","link":"null","rotZ":0,"radius":1000,"x":0,"y":0,"z":0},"mirror":{"works":true,"link":"null","exposure":-1,"gamma":-1},"visi3D":{"works":true,"alwaysRender":false,"fov":45,"far":45000,"minZum":0,"maxZum":20000,"zume":250,"minRotationX":2.5,"maxRotationX":0,"debug":false,"isDragPan":true,"rotationX":0,"rotationZ":0}}'
    		);
    		
    		wind.content.div.appendChild(honeyTest.div); //приатачиваем див там 3д и соты
        }

        this.upDate=function(){
        	if(honeyTest){
        		honeyTest.upDate()
        	}
        }


	    this.sizeWindow=function(w,h){
	    	for (var i = array.length - 1; i >= 0; i--) {
	    		if(array[i].sizeWindow)array[i].sizeWindow(w,h);
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

		this.w=new DWindow(this.dCont, 2, 2,"настройки");
    	this.w.width=200;
    	//this.w.dragBool=false;
    	this.w.hasMinimizeButton=false;

    	//SceneSB
    	this.menuScene=undefined;
    	
    	
    	this.opentScane=function(){
    		bopent.visible=false
    		var oo=self.par.fun("returnHoneycomb");

			self.menuScene = new MenuScene(self.w.content, oo.visi3D, function(s,p){ trace(s,p)});
			self.menuScene.sceneSB.setObj(JSON.parse(oo.jsonCamera))
			self.menuScene.setObj()	
    	}
    			
    	/*var bopent = new DButton(this.w, 170, 2, ">>",function(){
	        self.opentScane()
	    })
	    bopent.height=28
	   	bopent.width=28*/
    		
/*
	   	var b = new DButton(this.w.content, 202, -32, "initConfig.json",function(){
	        $.ajax({
                url: "initConfig.json",
                success: function function_name(data) {                         
                    var oo;
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        oo = conf;
                    } else oo = data;

                    self.par.fun("setObject", oo);
                }
            })
	    })
	    
	   	var b = new DButton(this.w.content, 302, -32, "initConfig1.json",function(){
	        $.ajax({
                url: "initConfig1.json",
                success: function function_name(data) {                         
                    var oo;
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        oo = conf;
                    } else oo = data;

                    self.par.fun("setObject", oo);
                }
            })
	    })

	    var b = new DButton(this.w.content, 402, -32, "initConfig2.json",function(){
	        $.ajax({
                url: "initConfig2.json",
                success: function function_name(data) {                         
                    var oo;
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        oo = conf;
                    } else oo = data;

                    self.par.fun("setObject", oo);
                }
            })
	    })*/


    	let y=2;

    	 
		


    	/*var b = new DButton(this.w.content, 2, y, "creatHoney",function(){
	        self.par.fun("creatHoney");
	    })
	    b.width=this.w.width-4;
    	y+=34;    	

	    var bGetScane = new DButton(this.w.content, (this.w.width-2)-b.height, y, "<",function(){
	        
	        if(this.text=="<"){
	        	let visi3D=self.par.fun("returnVisi3D");
	        	let s=JSON.stringify(visi3D.getObj());
	        	let s1=s.replace(/"/gi,'|');	        	
	        	self.object.startVisi=s1;
	        	self.input.value=self.object.startVisi;
	        	this.text="x";
	        	return
	        }
	        if(this.text=="x"){
	        	self.object.startVisi="null";
	        	self.input.value="null";
	        	this.text="<";
	        }
	    })
	    bGetScane.width=bGetScane.height;

	    this.input=new DInput(this.w.content, 2, y, "null",function(){
	        
	    });
	    this.input.width=-6+bGetScane.x;    

	    y+=34;*/
		
		/*var b = new DButton(this.w.content, 2, y, "get",function(){

	        self.par.fun("getObj");

	    });
	    b.width=(this.w.width-6)/2;*/

	    var b = new DButton(this.w.content, (this.w.width-6)/2+4, y, "set",function(){
	        let o=JSON.parse(self.textArea.value);
	        self.par.fun("setObj",o);
	    })
	    b.width=(this.w.width-6)/2;

		/*this.check = new DCheckBox(this.w.content, 4, y+6," ",function(){
	       	self.par.fun("getObj");
	    })*/

	    y+=34;

	    this.textArea=new DTextArea(this.w.content, 2, y, "null",function(){
	        
	    });
	    this.textArea.width=this.w.width-4;
	    this.textArea.height=600;

		

	    y+=this.textArea.height+2;

	    

	  /*  var rot = new DSliderBig(this.w.content, 2, y,function(){
	        self.object.time=this.value
	    }, "time", 0, 2000)
	    rot.width=this.w.width-6;
	    rot.okrug=1;	    
    	y+=50;*/




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




    	this.w.height=y+34;
    }
}
