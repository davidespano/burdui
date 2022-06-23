window.onload = function(){
    const screen = document.getElementById("screen");
    const app = new burdui.App(screen, document.getElementById("root").buiView);

    const loginBtn = document.getElementById('login').view;
    const loginLabel = document.getElementById('loginLabel').view;
    const EdadLabel = document.getElementById('edadLabel').view;
    const edad1 = document.getElementById('edad1').view;
    const edad2 = document.getElementById('edad2').view;
    const usr = document.getElementById('usr').view;
    const psw = document.getElementById('psw').view;
    loginBtn.addEventListener(burdui.EventTypes.mouseDown, function(source, args){
       loginBtn.setBackgroundColor("#8b0000");
       loginBtn.invalidate();
    });
        edad1.addEventListener(burdui.EventTypes.mouseUp, function(source, args){
            edad1.setSeleccionado(1);
            edad2.setSeleccionado(0);
            edad1.setBackgroundColor("#000000");             
            edad2.setBackgroundColor("#ffffff"); 
            EdadLabel.setText("Età                     "+ edad1.getText());
            EdadLabel.invalidate();
            edad1.invalidate();
            edad2.invalidate();
        
    });
      
        edad2.addEventListener(burdui.EventTypes.mouseUp, function(source, args){         
            edad2.setSeleccionado(1);
            edad1.setSeleccionado(0);
            edad2.setBackgroundColor("000000");           
            edad1.setBackgroundColor("#ffffff");
            EdadLabel.setText("Età                     "+ edad2.getText());
            EdadLabel.invalidate();
            edad1.invalidate();
            edad2.invalidate();
      
    });
    
    loginBtn.addEventListener(burdui.EventTypes.mouseUp, function(source, args){
        loginBtn.setBackgroundColor("#b70718");
        loginBtn.invalidate();
    });
    loginBtn.addEventListener(burdui.EventTypes.mouseClick, function(source, args){
        if(edad2.getSeleccionado()===1){
            loginLabel.setText("Autenticato!");
        }
        else{
             loginLabel.setText("Autenticazione -> È necessario avere più di 18 anni");           
        }
        
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
    usr.addEventListener(burdui.EventTypes.lostFocus, lostFocus);
    usr.addEventListener(burdui.EventTypes.getFocus, getFocus);
    psw.addEventListener(burdui.EventTypes.lostFocus, lostFocus);
    psw.addEventListener(burdui.EventTypes.getFocus, getFocus);
    usr.addEventListener(burdui.EventTypes.keyDown, keyDown);
    psw.addEventListener(burdui.EventTypes.keyDown, keyDown);


    app.start();


};