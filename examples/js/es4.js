window.onload = function(){
    // get the canvas element
    const screen = document.getElementById("screen");

    // creating the view tree
    let root = new burdui.GridPanel;
    root.setBounds(new burdui.Bounds(0,0,1024,768))
        .setRows(4)
        .setCols(3)
        .setPadding(10);

    let button1 = new burdui.Button();
    button1.setBounds(new burdui.Bounds(100,100, 250, 75))
        .setBackgroundColor("#99ff99")
        .setBorderRounded(10)
        .setBorderColor("#004d00")
        .setBorderLineWidth(3)
        .setFont("25px Arial")
        .setText("Pulsante uno")
        .setTextColor("#004d00");

    let button2 = new burdui.Button();
    button2.setBounds(new burdui.Bounds(100,100, 250, 75))
        .setBackgroundColor("white")
        .setBorderRounded(10)
        .setBorderColor("black")
        .setBorderLineWidth(3)
        .setFont("25px Arial")
        .setText("Pulsante due")
        .setTextColor("black");

    let button3 = new burdui.Button();
    button3.setBounds(new burdui.Bounds(100,100, 250, 75))
        .setBackgroundColor("#f7736a")
        .setBorderRounded(10)
        .setBorderColor("#800800")
        .setBorderLineWidth(3)
        .setFont("25px Arial")
        .setText("Pulsante tre")
        .setTextColor("#800800");

    // adding the two views as children of the root panel
    root.addChild(button1, 0, 0, 1, 1)
        .addChild(button2, 1, 0, 2, 3)
        .addChild(button3, 3, 1, 1, 2);

    const app = new burdui.App(screen, root);
    app.start();

};