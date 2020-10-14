



/*
import { Menu } from './menu/Menu.js';
import { Home } from './floor/Home.js';

import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';
import { SceneSB } from '../libMy/visi3D/SceneSB.js';

import { Grid } from './fManager/Grid.js';
import { FManager } from './fManager/FManager.js';*/

import { P20 } from './p20/P20.js';
import { Menu} from './p20/menu/Menu.js';
    
import { VisiPixi } from './libMy/VisiPixi.js';

export class Glaf  {
  	constructor(par) {  		
  		this.type="Glaf";
  		var self=this;
        this.par=par;

        this.dCont=new DCont(document.body);

        this.visiPixi=new VisiPixi();             
        this.cont2d = new PIXI.Container();
        this.content2d = new PIXI.Container();
        
        this.visiPixi.content2d.addChild(this.cont2d); 
        this.cont2d.addChild(this.content2d); 


        this.p20=new P20(this,function(s,p,p1){
            trace(s,p,p1);      
            if(s=="complit"){           
                return;
            }
        });
        //document.body.appendChild(this.p20.div); //приатачиваем див там 3д и соты

        this.menu=new Menu(this,function(s,p,p1){     
            trace(s,p,p1);
            self.p20.setArrObj(p);
        });
        this.menu.setP20(this.p20);



        //ап дете сцена деленая на 2 в мейне
        this.update = function () {
            
            this.visiPixi.render()
        }

        //расчет окна
        this.sizeWindow = function(w,h,s){              
            this.scale=s;
            this.dCont.scale=s;
            this.menu.sizeWindow(w,h,s);
            this.p20.sizeWindow(w,h,s);           
        }

  		
/*
        this.content3d = new THREE.Object3D();
        this._index=-1;
        this._tipVisi=-1;
        this._tipDrav=-1;
        this._id=-1;

        this.idBool=false;
        this.idArr=[53]
        this.whSize=10000;

        this.mobile= dcmParam.mobile
        this.scale=1;
		this.dCont=undefined;
        this.main=main
        this.par=main
        this.otstup=5;
        this._free=true;
        this.dCont=new DCont(document.body);        
        this.dCV=new DCont(); 
        //new DButton(main.contentHTML,0,0,"this.down") 

        this.saveLoacal=new SaveLoacal(this)
        this.saveProdukt=new SaveProdukt(this)

        this.ser = window.location.href;
        var arrParams = this.ser.split("?");   
        var aa=arrParams[0].split("index");

        this.resurs="resources/";         
        new Calc();    

        //порезаный от пикси вювер
        this.visi3D = new MVisi3D(main.contentHTML, null, dcmParam.mobile, true, false, true, true);     
        this.visi3D.yes3d = true;           
        this.visi3D.groupObject.add(this.content3d);


        //ловим и откидываем на сцену изменение камеры
        this.visi3D.fun_rotationZ = function () { 

            //trace(self.visi3D.rotationX, self.visi3D.rotationZ, "   ",self.visi3D.zume)
        }

        this.rec=function(c){            
            if(c.parent)this.rec(c.parent)
        }
        this.rec(self.content3d)

        //хрень принемашка ресурсов и настроек камеры для 
        this.sceneSB=new SceneSB(this.visi3D);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (main.objectBase.scene[this.sceneSB.array[i].name] === undefined) {
                main.objectBase.scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(main.objectBase.scene[this.sceneSB.array[i].name]);
        }
        //this.visi3D.zume=2500


        //this.visi3D.yVerh=-266
        this.linkGrid='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAACIJJREFUeNrs2LFqpVAUhtF9BztRQfBJ0qbMC085kGpIm3cIBNIcEI5inammSJVBcOCevVZ3y/+q8LFvb+8fnxERyzzFvStrDVtsseV7zy+vX34/PT54LrbYkmTLXz8CAEhHAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAD8o27bj2bG2GKLLeeUtXouttiS7Nt3AQCAjBeAcegjImKZp2ZG2WKLLTn3eMdsscUFAAAQAACAAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAFyt2/ajmTG22GLLOWWtnosttiT79l0AACDjBWAc+oiIWOapmVG22GJLzj3eMVtscQEAAAQAACAAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAV+u2/WhmjC222HJOWavnYostyb59FwAAyHgBGIc+IiKWeWpmlC222JJzj3fMFltcAAAAAQAACAAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAMDVum0/mhljiy22nFPW6rnYYkuyb98FAAAyXgDGoY+IiGWemhlliy225NzjHbPFFhcAAEAAAAACAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAA/rPbz1+/P/0NAOACAAAIAABAAAAAd+/29v7xGRGxzNPdjylrDVtsseV7zy+vX34/PT54LrbYkmSLCwAAJCYAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAV+i2/WhmjC222HJOWavnYostyb59FwAAyHgBGIc+IiKWeWpmlC222JJzj3fMFltcAAAAAQAACAAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAMDVum0/mhljiy22nFPW6rnYYkuyb98FAAAyXgDGoY+IiGWemhlliy225NzjHbPFFhcAAEAAAAACAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAcLVu249mxthiiy3nlLV6LrbYkuzbdwEAgIwXgHHoIyJimadmRtliiy0593jHbLHFBQAAEAAAgAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAABcrdv2o5kxtthiyzllrZ6LLbYk+/ZdAAAg4wVgHPqIiFjmqZlRtthiS8493jFbbHEBAAAEAAAgAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAFfrtv1oZowttthyTlmr52KLLcm+fRcAAEjoDwAAAP//AwAT1Vc6wfzoWQAAAABJRU5ErkJggg=='
        this.grid=new Grid(this.whSize,this.whSize/100,this.linkGrid,0.7)
        this.grid.position.z=5

        this.content3d.add(this.grid);        
        this.visi3D.objShadow(this.grid,true);

        this.home=new Home(this, this.visi3D, main.objectBase, function(s,p){            
            if(s=="indexFloor"){
                self.fManager.addFloor(self.home.array[p]);
                for (var i = 0; i < self.home.array.length; i++) {
                    if(i==p){
                        self.home.array[i].active=true;
                        self.fManager.sobIndex[self.fManager.index].setActive()                    
                    }else{                    
                        self.home.array[i].active=false;
                    }
                }
            }
        });





        this.fManager=new FManager(this, function(s,p){

        });
        this.fManager.planDrag.setTextur(this.grid.texture);
        trace(">>>>>>>>>>>>",this.home.array[0])
        this.fManager.addFloor(this.home.array[0]);




        this.menu=new Menu(this,function(s,p){            
            if(s=="index"){
                self.index=p;
                self.saveLoacal.save()
            }
            if(s=="tipVisi"){
                self.tipVisi=p;
                self.saveLoacal.save()
            }
            if(s=="tipDrav"){
                self.tipDrav=p;
                self.saveLoacal.save()
            }

            if(s=="saveProdukt"){
                self.saveProdukt.saveProdukt(p)               
            }
            if(s=="saveThisProdukt"){
                self.saveProdukt.saveProdukt(p, this._id) 
            }

            if(s=="openId"){
                self.openId(p)               
            }

        });
        this.fManager.addMenu(this.menu.mObject)

        this.dCont.add(this.dCV)

        //великая грабля с событиями 
        var visi3DEM=undefined
        var dcmParamEM=undefined
        this.touchmove=function(e){            
            e.preventDefault();            
            if(e.target===self.visi3D.position3d.div)visi3DEM(e)            
            
            dcmParamEM(e) 
                    
            e.stopPropagation();
        }        
        if (dcmParam.mobile==true){ 
            visi3DEM=this.visi3D.getFunMouseMove()
            dcmParamEM =  global.dcmParam.getFunMouseMove()          
            window.addEventListener('touchmove', self.touchmove, { passive: false, capture: true });            
        }


        this.openId = function (id) {            
            $.ajax({
                url: "save/"+id+"/config.json",
                success: function function_name(data) {                         
                    var oo;
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        oo = conf;
                    } else oo = data;                    

                    self.idBool=false;
                    for (var i = 0; i < self.idArr.length; i++) {

                        if(self.idArr[i]*1==id*1){

                            self.idBool=true;
                        }
                    }
                    self.home.clear()
                    self.home.setObj(oo) 
                    self.id=id;
                                                
                },
                error:function function_name(data) {
                    console.error("Что то случилось с конфигом")
                }
            });

        }

       setTimeout(function() {
            
            if(self.saveProdukt.php.id!=null)self.openId(self.saveProdukt.php.id)
       }, 30); 


*/
  		

      
       // this.saveLoacal.init();
  	}

  /*  set id(value) {
        if(this._id!=value){
            this._id= value;
            
            this.menu.id=value;
            var s=this.saveProdukt.php.server+"?id="+this._id;
            window.history.pushState("p3d", "p3d:"+this._id, s); 
           

              
        }
    }    
    get id() { return  this._id;}



    set index(value) {
        if(this._index!=value){
            this._index= value;
            this.home.index=value;
            this.fManager.index= value;  
            this.menu.mLeft.index=value;    
        }
    }    
    get index() { return  this._index;}

    set tipVisi(value) {
        if(this._tipVisi!=value){
            this._tipVisi= value;
            this.home.tipVisi=value; 
            this.menu.mLeft.tipVisi=value;
              
        }
    }    
    get tipVisi() { return  this._tipVisi;}

    set tipDrav(value) {
        if(this._tipDrav!=value){
            this._tipDrav= value;
            this.home.tipDrav=value; 
            this.fManager.tipDrav= value;  
            this.menu.mLeft.tipDrav=value; 
            
        }
    }    
    get tipDrav() { return  this._tipDrav;}*/    
}
/*
export class SaveLoacal  {
    constructor(par) {         
        this.type="SaveLoacal";
        this.par=par;
        this.localStorage=this.par.par.localStorage

        this.init=function(){
            if(this.localStorage.object.objSave==undefined)this.localStorage.object.objSave={}
            if(this.localStorage.object.objSave.index==undefined) this.localStorage.object.objSave.index=3;
            if(this.localStorage.object.objSave.tipVisi==undefined) this.localStorage.object.objSave.tipVisi=1; 
            if(this.localStorage.object.objSave.tipDrav==undefined) this.localStorage.object.objSave.tipDrav=1; 


            this.par.index=this.localStorage.object.objSave.index
            this.par.tipVisi=this.localStorage.object.objSave.tipVisi
            this.par.tipDrav=this.localStorage.object.objSave.tipDrav
        }

        this.save=function(){
            for(var s in this.localStorage.object.objSave){
                this.localStorage.object.objSave[s]=this.par[s]                
            }
            this.localStorage.save();
        }
    }
}

export class SaveProdukt  {
    constructor(par) { 
        var self=this        
        this.type="SaveProdukt";
        this.par=par;
        var php=new Php();
        this.php=php

        var object, strJson
        var id;
        var fun;
        var base64; 

        
        if(par.par.debug){
            var ccc;
            var ss='{"visi3D":{"xVerh":0,"yVerh":-166,"zVerh":0,"rotationX":0.7100000000000001,"rotationZ":0.21,"zume":842.1472800000001},"array":[{"sp":{"type":"SpStageSten","tipPoint":"SpPointSten","tipSplice":"SpliceSten","arrPoint":[{"type":"SpPointSten","idArr":0,"position":{"x":-444.41159134444115,"y":-199.38860684901556,"z":0}},{"type":"SpPointSten","idArr":1,"position":{"x":-432.9,"y":-4.9,"z":0}}],"arrSplice":[{"type":"SpliceSten","idArr":0,"delph":20,"tip":0,"position":{"x":-432.9,"y":-4.9,"z":0},"position1":{"x":-444.41159134444115,"y":-199.38860684901556,"z":0},"connected":{"arr":["69561418-28A8-4392-AF5F-397D3316C6F5"],"arr1":["69561418-28A8-4392-AF5F-397D3316C6F5"]},"uuid":"69561418-28A8-4392-AF5F-397D3316C6F5","windows":{"arr":[]},"boolText":true,"height":300,"col3d":"m_1","col3d1":"m_1"}],"arrPol":[]},"bazaMod":{"arrBlok":[{"id":17,"width":70,"depth":2,"height":70,"position":{"x":-428.17223656682387,"y":206.88871377823818,"z":-94.27024733896148},"rotation":1.6299163786475503,"vubor":[{"index":0,"keyName":"mat_001_"},{"index":0,"keyName":"mat_002_"}]}]},"podloshka":{"visible":true,"x":0,"y":0,"z":-3,"scale":100,"alpha":100,"rotation":0,"link":"null"}},{"sp":{"type":"SpStageSten","tipPoint":"SpPointSten","tipSplice":"SpliceSten","arrPoint":[{"type":"SpPointSten","idArr":0,"position":{"x":-52.251874999824395,"y":-244.7645598948502,"z":0}},{"type":"SpPointSten","idArr":1,"position":{"x":167.9,"y":-213.9,"z":0}},{"type":"SpPointSten","idArr":2,"position":{"x":313.2,"y":5.8,"z":0}},{"type":"SpPointSten","idArr":3,"position":{"x":240.9,"y":160.3,"z":0}}],"arrSplice":[{"type":"SpliceSten","idArr":0,"delph":20,"tip":0,"position":{"x":167.9,"y":-213.9,"z":0},"position1":{"x":-52.251874999824395,"y":-244.7645598948502,"z":0},"connected":{"arr":["A8696306-D146-4695-9ABC-AC9EAEE2F55C","630BC07E-CEAE-482E-BA52-906DE6E997B0"],"arr1":["A8696306-D146-4695-9ABC-AC9EAEE2F55C"]},"uuid":"A8696306-D146-4695-9ABC-AC9EAEE2F55C","windows":{"arr":[]},"boolText":true,"height":300,"col3d":"m_1","col3d1":"m_1"},{"type":"SpliceSten","idArr":1,"delph":20,"tip":0,"position":{"x":313.2,"y":5.8,"z":0},"position1":{"x":167.9,"y":-213.9,"z":0},"connected":{"arr":["630BC07E-CEAE-482E-BA52-906DE6E997B0","AC4C4C7C-A590-4665-89A4-CD5DD1519ED1"],"arr1":["A8696306-D146-4695-9ABC-AC9EAEE2F55C","630BC07E-CEAE-482E-BA52-906DE6E997B0"]},"uuid":"630BC07E-CEAE-482E-BA52-906DE6E997B0","windows":{"arr":[]},"boolText":true,"height":300,"col3d":"m_1","col3d1":"m_1"},{"type":"SpliceSten","idArr":2,"delph":20,"tip":0,"position":{"x":240.9,"y":160.3,"z":0},"position1":{"x":313.2,"y":5.8,"z":0},"connected":{"arr":["AC4C4C7C-A590-4665-89A4-CD5DD1519ED1"],"arr1":["630BC07E-CEAE-482E-BA52-906DE6E997B0","AC4C4C7C-A590-4665-89A4-CD5DD1519ED1"]},"uuid":"AC4C4C7C-A590-4665-89A4-CD5DD1519ED1","windows":{"arr":[]},"boolText":true,"height":300,"col3d":"m_2","col3d1":"m_2"}],"arrPol":[]},"bazaMod":{"arrBlok":[{"id":21,"width":155,"depth":132,"height":73,"position":{"x":142.01880509786173,"y":-9.766889680240394e-14,"z":-72.13839275500618},"rotation":-0.9864790808913022,"vubor":[{"index":0,"keyName":"iz"},{"index":0,"keyName":"mat_003"},{"index":0,"keyName":"iz1"},{"index":0,"keyName":"mat_004"}]}]},"podloshka":{"visible":true,"x":0,"y":0,"z":-3,"scale":100,"alpha":100,"rotation":0,"link":"null"}},{"sp":{"type":"SpStageSten","tipPoint":"SpPointSten","tipSplice":"SpliceSten","arrPoint":[],"arrSplice":[],"arrPol":[]},"bazaMod":{"arrBlok":[]},"podloshka":{"visible":true,"x":0,"y":0,"z":-3,"scale":100,"alpha":100,"rotation":0,"link":"null"}},{"sp":{"type":"SpStageSten","tipPoint":"SpPointSten","tipSplice":"SpliceSten","arrPoint":[],"arrSplice":[],"arrPol":[]},"bazaMod":{"arrBlok":[]},"podloshka":{"visible":true,"x":0,"y":0,"z":-3,"scale":100,"alpha":100,"rotation":0,"link":"null"}}]}'
            var h;
            var ccc;
            var str="";
            var b=new DButton(par.dCV,10,37,"g",f=>{
                ccc=par.home.getObj();          
                str=JSON.stringify(ccc)            
                input.text=str
            })
            b.width  = b.height=20 

            var h=new DButton(par.dCV,30,37,"s",f=>{
                ccc= JSON.parse(input.text)               
                par.home.setObj(ccc)
            })
            h.width  = h.height=20
            var input=new DInput(par.dCV,60,37,ss,f=>{                    
                
            })
            input.width  = 50;
            input.height=20;
        }

       
          

       


        this.grtMaxPlus = function(f){  
            var l = '../save/';  
            php.load({tip:"getDiractFiles", dir:l},function(e){                    
                    var rez=1
                    var aa=[];
                    var a=e.split(",");
                    for (var i = 1; i < a.length; i++) {
                        aa.push(a[i]*1)
                    }
                    for (var i = 0; i < aa.length; i++) {
                        if(aa[i]>=rez)rez=aa[i]+1
                    }
                    f(rez)

                }
            )
        }




        this.bool=false

        this.saveProdukt=function(f,_id){
            this.bool=false
            fun=f
            object=self.par.home.getObj();            
            strJson  =JSON.stringify(object);

            if(_id!=undefined){
                this.bool=true
                id=_id;
                self.saveProdukt2()
                return
            }

            
            

           // id=new Date().getTime()
            self.grtMaxPlus(function(num){
                id=num;
                self.saveProdukt1()
            })
        }
           
        this.saveProdukt1=function(){   

            php.load({tip: 'mkdir', dir: '../save/'+id}, function (e) { 
                self.saveProdukt2()
            })
        }

        this.saveProdukt2=function(){ 
            var l = '../save/'+id+"/config.json";  
            php.load({tip:"saveJSON", link:l, text:strJson},function(e){
                //self.saveLoad()
                self.savePic()
                var ll = '../save/'+id+"/icon.png"
                php.savePhoto(ll, base64, function () {                
                    fun(php.server+"?id="+id)
                    sizeWindow(); 
                    par.menu.mProdject.plusId(id);
                    par.id=id
                });
            });
        }


        var _xVerh,_yVerh,_zVerh,zume
        this.savePic=function(){
            this.par.grid.visible=false;

            this.par.fManager.planDrag.mesh.visible=false

            this.par.visi3D.utility.focus.active=true;
            this.par.visi3D.utility.focus.targetObject=this.par.home.array[0].content3d  
            self.par.visi3D.utility.focus.upDate();

            _xVerh=this.par.visi3D._xVerh;
            _yVerh=this.par.visi3D._yVerh;
            _zVerh=this.par.visi3D._zVerh;
            zume=this.par.visi3D.zume;




            var d=this.par.visi3D.utility.debug;
            this.par.visi3D.utility.debug=false;

            var sk=this.par.visi3D.utility.sky.active;
            this.par.visi3D.utility.sky.active=false;


            var alpha=true;
            var color=0xffffff;

            if(this.par.visi3D.alpha==false){
                alpha=false;            
                this.par.visi3D.renderer.setClearColor(color, 1);
            }

            var ww=this.par.visi3D._width
            var hh=this.par.visi3D._height
            
            this.par.visi3D.sizeWindow(0,0,256,256)
            this.par.visi3D.render();

            base64 = this.par.visi3D.renderer.domElement.toDataURL("image/png");

            
            this.par.visi3D.sizeWindow(0,0,ww,hh)
            this.par.visi3D.utility.debug=d

            this.par.visi3D.utility.sky.active=sk

            if(alpha==false){
                this.par.visi3D.renderer.setClearColor(this.par.visi3D.color, 1);                
            }
            self.par.visi3D.utility.focus.active=false;  
            this.par.grid.visible=true; 



            this.par.visi3D.zume=zume;
            this.par.visi3D.xVerh=_xVerh;
            this.par.visi3D.yVerh=_yVerh;
            this.par.visi3D.zVerh=_zVerh;
            this.par.fManager.planDrag.mesh.visible=true; 
                     

        }      
    }
}



*/






