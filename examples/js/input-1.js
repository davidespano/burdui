window.onload = function(){
    const screen = document.getElementById("screen");
    const app = new burdui.App(screen, document.getElementById("root").buiView);

    const loginBtn = document.getElementById('login').view;
    const loginLabel = document.getElementById('loginLabel').view;
    const usr = document.getElementById('usr').view;
    const psw = document.getElementById('psw').view;
    loginBtn.addEventListener(burdui.EventTypes.mouseDown, function(source, args){
       loginBtn.setBackgroundColor("#8b0000");
       loginBtn.invalidate();
    });
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
    usr.addEventListener(burdui.EventTypes.lostFocus, lostFocus);
    usr.addEventListener(burdui.EventTypes.getFocus, getFocus);
    psw.addEventListener(burdui.EventTypes.lostFocus, lostFocus);
    psw.addEventListener(burdui.EventTypes.getFocus, getFocus);
    //usr.addEventListener(burdui.EventTypes.keyDown, keyDown);
    //psw.addEventListener(burdui.EventTypes.keyDown, keyDown);


    app.start();


};