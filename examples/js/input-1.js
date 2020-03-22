window.onload = function(){
    const screen = document.getElementById("screen");
    const app = new burdui.App(screen, document.getElementById("root").buiView);

    const loginBtn = document.getElementById('login').view;
    const loginLabel = document.getElementById('loginLabel').view;
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

    app.start();


};