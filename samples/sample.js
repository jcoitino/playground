"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// sample code
const React = require("react");
const ReactDom = require("react-dom");
const MobX = require("mobx");
const MobXReact = require("mobx-react");
// BoxModel (observable)
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
    resizeBy(scaleW, scaleH) {
        this.w *= scaleW;
        this.h *= scaleH;
    }
}
tslib_1.__decorate([MobX.observable], BoxModel.prototype, "id", void 0);
tslib_1.__decorate([MobX.observable], BoxModel.prototype, "x", void 0);
tslib_1.__decorate([MobX.observable], BoxModel.prototype, "y", void 0);
tslib_1.__decorate([MobX.observable], BoxModel.prototype, "w", void 0);
tslib_1.__decorate([MobX.observable], BoxModel.prototype, "h", void 0);
tslib_1.__decorate([MobX.observable], BoxModel.prototype, "c", void 0);
tslib_1.__decorate([MobX.action], BoxModel.prototype, "changeColor", null);
tslib_1.__decorate([MobX.action], BoxModel.prototype, "moveBy", null);
tslib_1.__decorate([MobX.action], BoxModel.prototype, "resizeBy", null);
// BoxView (React renderer)
let BoxView = MobXReact.observer((props) => {
    const o = props.model;
    const p = { style: { position: "absolute", background: o.c, top: o.y, left: o.x, width: o.w, height: o.h } };
    return React.createElement("div", p, null);
});
// ScreebModel (observable)
class ScreenModel {
    constructor(boxes) {
        this.boxes = boxes;
    }
    addBox(box) {
        this.boxes.push(box);
    }
}
tslib_1.__decorate([MobX.observable], ScreenModel.prototype, "boxes", void 0);
tslib_1.__decorate([MobX.action], ScreenModel.prototype, "addBox", null);
// ScreenView (React renderer)
let ScreenView = MobXReact.observer((props) => {
    console.log(`render... ${executions++}`);
    let b = props.model.boxes;
    let c = b.map(boxModel => React.createElement(BoxView, { key: boxModel.id, model: boxModel }));
    return React.createElement("div", null, c);
});
let executions = 0;
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
