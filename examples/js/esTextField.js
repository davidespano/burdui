window.onload = function () {
    const screen = document.getElementById("screen");

    let root = new burdui.StackPanel;
    root.setBounds(new burdui.Bounds(0, 0, 800, 600))
        .setPadding(5)
        .setStyle("vertical");

    let text1 = new burdui.TextField();
    text1.setBounds(new burdui.Bounds(0, 0, 75, 40))
        .setBackgroundColor("#ffffff")
        .setBorderColor("#cb3234")
        .setBorderLineWidth(1)
        .setTextColor("#000000")
        .setFont("20px Arial");

    let text2 = new burdui.TextField();
    text2.setBounds(new burdui.Bounds(0, 0, 75, 40))
        .setBackgroundColor("#ffffff")
        .setBorderColor("#cb3234")
        .setBorderLineWidth(1)
        .setTextColor("#000000")
        .setFont("20px Arial");

    let text3 = new burdui.TextField();
    text3.setBounds(new burdui.Bounds(0, 0, 75, 40))
        .setBackgroundColor("#ffffff")
        .setBorderColor("#cb3234")
        .setBorderLineWidth(1)
        .setTextColor("#000000")
        .setFont("20px Arial");

    root.addChild(text1)
        .addChild(text2)
        .addChild(text3);

    const app = new burdui.App(screen, root);
    app.start();
}