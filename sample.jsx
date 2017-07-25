"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { __decorate } = require("tslib");
// sample code
const { createElement } = require("react");
const { render } = require("react-dom");
const { action, observable } = require("mobx");
const { observer } = require("mobx-react");
// Observable BoxModel
class BoxModel {
    constructor(id, x, y, w, h, c) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }
    changeColor(color) {
        this.c = color;
    }
    moveBy(deltaX, deltaY) {
        this.x += deltaX;
        this.y += deltaY;
    }
    resizeBy(deltaW, deltaH) {
        this.w *= deltaW;
        this.h *= deltaH;
    }
}
__decorate([observable], BoxModel.prototype, "id", void 0);
__decorate([observable], BoxModel.prototype, "x", void 0);
__decorate([observable], BoxModel.prototype, "y", void 0);
__decorate([observable], BoxModel.prototype, "w", void 0);
__decorate([observable], BoxModel.prototype, "h", void 0);
__decorate([observable], BoxModel.prototype, "c", void 0);
__decorate([action], BoxModel.prototype, "changeColor", null);
__decorate([action], BoxModel.prototype, "moveBy", null);
__decorate([action], BoxModel.prototype, "resizeBy", null);
// Observable BoxesModel
class BoxesModel {
    constructor(boxes) {
        this.boxes = boxes;
    }
    addBox(box) {
        this.boxes.push(box);
    }
}
__decorate([observable], BoxesModel.prototype, "boxes", void 0);
__decorate([action], BoxesModel.prototype, "addBox", null);
// React Renderer Box
let Box = observer((props) => {
    const o = props.model;
    const p = { style: { position: "absolute", background: o.c, top: o.y, left: o.x, width: o.w, height: o.h } };
    return createElement("div", p, null);
});
// React Renderer Boxes
let executions = 0;
let Boxes = observer((props) => {
    console.log(`render... ${executions++}`);
    let b = props.model.boxes;
    let c = b.map(model => createElement(Box, { key: model.id, model }));
    return createElement("div", null, c);
});
// Observable instance
let model = new BoxesModel([
    new BoxModel("#1", 100, 100, 100, 100, "red"),
    new BoxModel("#2", 100, 300, 100, 100, "green"),
    new BoxModel("#3", 300, 100, 100, 100, "blue"),
]);
// DOM Rendering
let boxes = createElement(Boxes, { model }, null);
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
