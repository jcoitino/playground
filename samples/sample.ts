// sample code
import * as React from "react";
import * as ReactDom from "react-dom";
import * as MobX from "mobx";
import * as MobXReact from "mobx-react";
// BoxModel (observable)
class BoxModel {
    @MobX.observable public id: string;
    @MobX.observable public x: number;
    @MobX.observable public y: number;
    @MobX.observable public w: number;
    @MobX.observable public h: number;
    @MobX.observable public c: string;
    constructor(id: string, x: number, y: number, w: number, h: number, c: string) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }
    @MobX.action public changeColor(color: string) {
        this.c = color;
    }
    @MobX.action public moveBy(deltaX: number, deltaY: number) {
        this.x += deltaX;
        this.y += deltaY;
    }
    @MobX.action public resizeBy(scaleW: number, scaleH: number) {
        this.w *= scaleW;
        this.h *= scaleH;
    }
}
// BoxView (React renderer)
let BoxView = MobXReact.observer((props: BoxViewProps) => {
    const o = props.model;
    const p = { style: { position: "absolute", background: o.c, top: o.y, left: o.x, width: o.w, height: o.h } };
    return React.createElement("div", p, null);
});
interface BoxViewProps {
    model: BoxModel
}
// ScreebModel (observable)
class ScreenModel {
    @MobX.observable public boxes: BoxModel[];
    constructor(boxes: BoxModel[]) {
        this.boxes = boxes;
    }
    @MobX.action public addBox(box: BoxModel) {
        this.boxes.push(box);
    }
}
// ScreenView (React renderer)
let ScreenView = MobXReact.observer((props: ScreenViewProps) => {
    console.log(`render... ${executions++}`);
    let b = props.model.boxes;
    let c = b.map(boxModel => React.createElement(BoxView, { key: boxModel.id, model: boxModel }));
    return React.createElement("div", null, c);
});
let executions = 0;
interface ScreenViewProps {
    model: ScreenModel
}
// Observable model instance
let box1 = new BoxModel("#1", 100, 100, 100, 100, "red");
let box2 = new BoxModel("#2", 100, 300, 100, 100, "green");
let box3 = new BoxModel("#3", 300, 100, 100, 100, "blue");
let myScreen = new ScreenModel([box1, box2, box3]);
// DOM Rendering
let screen = React.createElement(ScreenView, { model: myScreen }, null);
let output = document.getElementById("output");
ReactDom.render(screen, output);
// Calling actions
debugger;
box1.changeColor("yellow");
box1.moveBy(100, 100);
box1.moveBy(100, 100);
box2.resizeBy(2, 1);
box3.resizeBy(1, 2);
let box4 = new BoxModel("#4", 100, 100, 200, 200, "maroon");
myScreen.addBox(box4);
