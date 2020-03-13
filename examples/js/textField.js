window.onload = function(){
    // get the canvas element
    const screen = document.getElementById("screen");

    // creating the view tree
    let root = new burdui.StackPanel;
    root.setBounds(new burdui.Bounds(0, 0, 1024, 500))
        .setStyle("vertical")
        .setPadding(10);

    let textField1 = new burdui.TextField(undefined, "Text1");
    textField1.setBounds(new burdui.Bounds(100, 100, 250, 75))
        .setBorderColor("#004d00")
        .setBorderLineWidth(1)
        .setFont("25px Arial")
        .setTextColor("#004d00");

    let textField2 = new burdui.TextField(undefined, "Text2");
    textField2.setBounds(new burdui.Bounds(100, 100, 250, 75))
        .setBorderColor("black")
        .setBorderLineWidth(1)
        .setFont("25px Arial")
        .setTextColor("black");

    let textField3 = new burdui.TextField(undefined, "Text3");
    textField3.setBounds(new burdui.Bounds(100, 100, 250, 75))
        .setBorderColor("#eeee00")
        .setBackgroundColor("red")
        .setBorderLineWidth(2)
        .setFont("25px Arial")
        .setTextColor("white");

    // adding the views as children of the root panel
    root.addChild(textField1)
        .addChild(textField2)
        .addChild(textField3);

    const app = new burdui.App(screen, root);
    app.start();

};