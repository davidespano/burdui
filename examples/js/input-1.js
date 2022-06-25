window.onload = function(){
    const screen = document.getElementById("screen");
    const app = new burdui.App(screen, document.getElementById("root").buiView);

    const loginBtn = document.getElementById('login').view;
    const loginLabel = document.getElementById('loginLabel').view;    
    const edad1 = document.getElementById('edad1').view;
    const edad2 = document.getElementById('edad2').view;
    const edad3 = document.getElementById('a').view;
    const edad4 = document.getElementById('b').view;
    const usr = document.getElementById('usr').view;
    const psw = document.getElementById('psw').view;
    let elementos = document.getElementsByTagName("bui-radiobutton");
    
    loginBtn.addEventListener(burdui.EventTypes.mouseDown, function(source, args){
       loginBtn.setBackgroundColor("#8b0000");
       loginBtn.invalidate();
        
    });
     let getselect= function(source){      
        for (let i=0;i<elementos.length;i++){
                if(source.name===elementos[i].view.name && source!==elementos[i].view){ 
               
                   if(elementos[i].view.getSelect()===1){
                        desSelect(elementos[i].view);    
                        elementos[i].view.invalidate();                                     
                   }    
             }
        } 
        Select(source);
        source.invalidate();
    };
    loginBtn.addEventListener(burdui.EventTypes.mouseUp, function(source, args){
        loginBtn.setBackgroundColor("#b70718");
        loginBtn.invalidate();
    });
   loginBtn.addEventListener(burdui.EventTypes.mouseClick, function(source, args){
        
        loginLabel.setText("Autenticato!");
        
        loginLabel.invalidate();
    });

    let getFocus = function(source, args){
        source.setBorderColor("#1589ff");
        source.invalidate();
    };
    let lostFocus = function (source, args){
        
        source.setBorderColor("#666666");
        source.invalidate();
    };
    let keyDown = function (source, args){
        source.setText(source.getText() + args.key);
        source.invalidate();
    };
       let Select = function (source){
        source.setSelect(1);
        source.setBackgroundColor("#000000");   
    };
       let desSelect = function (source){
        source.setSelect(0);
        source.setBackgroundColor("#ffffff");
    };
    usr.addEventListener(burdui.EventTypes.lostFocus, lostFocus);
    usr.addEventListener(burdui.EventTypes.getFocus, getFocus);
    psw.addEventListener(burdui.EventTypes.lostFocus, lostFocus);
    psw.addEventListener(burdui.EventTypes.getFocus, getFocus);
    usr.addEventListener(burdui.EventTypes.keyDown, keyDown);
    psw.addEventListener(burdui.EventTypes.keyDown, keyDown);
    edad1.addEventListener(burdui.EventTypes.mouseUp, getselect);
    edad2.addEventListener(burdui.EventTypes.mouseUp, getselect);
    edad3.addEventListener(burdui.EventTypes.mouseUp, getselect);
    edad4.addEventListener(burdui.EventTypes.mouseUp, getselect);


    app.start();


};