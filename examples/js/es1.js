window.onload = function(){
    // get the canvas element
    const screen = document.getElementById("screen");

    // creating the view tree
    let root = new burdui.View();
    root.setBounds(new burdui.Bounds(0,0,1024,768));

    let view1 = new burdui.View();
    view1.setBounds(new burdui.Bounds(100,100, 200, 200));

    let view2 = new burdui.View();
    view2.setBounds(new burdui.Bounds(500, 100, 100, 100));

    // adding the two views as children of the root panel
    root.addChild(view1);
    root.addChild(view2);

    const app = new burdui.App(screen, root);
    app.start();

};