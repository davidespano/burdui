window.onload = function(){
    const screen = document.getElementById("screen");
    const app = new burdui.App(screen, document.getElementById("root").buiView);
    app.start();
};