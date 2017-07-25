// sample code
import { createElement } from "react";
import { render } from "react-dom";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
// Observable BoxModel
class BoxModel {
    @observable public id: string;
    @observable public x: number;
    @observable public y: number;
    @observable public w: number;
    @observable public h: number;
    @observable public c: string;
    constructor(id: string, x: number, y: number, w: number, h: number, c: string) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }
    @action changeColor(color: string) {
        this.c = color;
    }
    @action moveBy(deltaX: number, deltaY: number) {
        this.x += deltaX;
        this.y += deltaY;
    }
    @action resizeBy(deltaW: number, deltaH: number) {
        this.w *= deltaW;
        this.h *= deltaH;
    }
}
// Observable BoxesModel
class BoxesModel {
    @observable boxes: BoxModel[];
    constructor(boxes: BoxModel[]) {
        this.boxes = boxes;
    }
    @action addBox(box: BoxModel) {
        this.boxes.push(box);
    }
}
// React Renderer BoxView
let BoxView = observer((props: { model: BoxModel }) => {
    const o = props.model;
    const p = { style: { position: "absolute", background: o.c, top: o.y, left: o.x, width: o.w, height: o.h } };
    return createElement("div", p, null);
});
// React Renderer BoxesView
let executions = 0;
let BoxesView = observer((props: { model: BoxesModel }) => {
    console.log(`render... ${executions++}`);
    let b = props.model.boxes;
    let c = b.map(model => createElement(BoxView, { key: model.id, model }));
    return createElement("div", null, c);
});
// Observable model instance
let model = new BoxesModel([
    new BoxModel("#1", 100, 100, 100, 100, "red"),
    new BoxModel("#2", 100, 300, 100, 100, "green"),
    new BoxModel("#3", 300, 100, 100, 100, "blue"),
]);
// DOM Rendering
let boxes = createElement(BoxesView, { model }, null);
let output = document.getElementById("output");
render(boxes, output);
// Calling actions
debugger;
model.boxes[0].changeColor("yellow");
for (let s of [100, 100]) {
    model.boxes[0].moveBy(s, s);
}
model.boxes[1].resizeBy(2, 1);
model.boxes[2].resizeBy(1, 2);
model.addBox(new BoxModel("#4", 100, 100, 200, 200, "maroon"));
