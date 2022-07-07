window.onload = function(){
    const screen = document.getElementById("screen");
    const app = new burdui.App(screen, document.getElementById("root").buiView);

    const loginBtn = document.getElementById('login').view;
    const loginLabel = document.getElementById('loginLabel').view;    
    const edad1 = document.getElementById('edad1').view;
    const edad2 = document.getElementById('edad2').view;
    const a = document.getElementById('a').view;
    const b = document.getElementById('b').view;
    const c = document.getElementById('c').view;
    const usr = document.getElementById('usr').view;
    const psw = document.getElementById('psw').view;

    
    loginBtn.addEventListener(burdui.EventTypes.mouseDown, function(source, args){
       loginBtn.setBackgroundColor("#8b0000");
       loginBtn.invalidate();
        
    });

    a.addEventListener(burdui.EventTypes.mouseUp, function(source, args){
        a.seleccionar(source);
        a.invalidate();
    });
    b.addEventListener(burdui.EventTypes.mouseUp, function(source, args){
        b.seleccionar(source);
        b.invalidate();
    });
    c.addEventListener(burdui.EventTypes.mouseUp, function(source, args){
        c.seleccionar(source);
        c.invalidate();
    });
    edad1.addEventListener(burdui.EventTypes.mouseUp, function(source, args){
        edad1.seleccionar(source);
        edad1.invalidate();
    });
    edad2.addEventListener(burdui.EventTypes.mouseUp, function(source, args){
        edad2.seleccionar(source);
        edad2.invalidate();
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
    usr.addEventListener(burdui.EventTypes.lostFocus, lostFocus);
    usr.addEventListener(burdui.EventTypes.getFocus, getFocus);
    psw.addEventListener(burdui.EventTypes.lostFocus, lostFocus);
    psw.addEventListener(burdui.EventTypes.getFocus, getFocus);
    usr.addEventListener(burdui.EventTypes.keyDown, keyDown);
    psw.addEventListener(burdui.EventTypes.keyDown, keyDown);
    app.start();


};
