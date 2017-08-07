let myDiv = document.createElement("div");
myDiv.setAttribute("id", "my-div");
myDiv.style.position = "absolute";
myDiv.style.top = "100px";
myDiv.style.left = "100px";
myDiv.style.width = "100px";
myDiv.style.height = "100px";
myDiv.style.background = "blue";
console.log("STEP 1", myDiv.outerHTML);

let myParent = document.querySelector("#output") as HTMLElement;
myParent.appendChild(myDiv);
console.log("STEP 2", myParent.outerHTML);

myDiv.style.top = "200px";
myDiv.style.left = "200px";
myDiv.style.width = "200px";
myDiv.style.height = "200px";
myDiv.style.background = "red";
console.log("STEP 3", myDiv.outerHTML);

myDiv.addEventListener("mouseover", () => {
    myDiv.style.opacity = "0.2";
    myDiv.style.background = "blue";
    myDiv.style.border = "10px dashed red";
    myDiv.style.borderRadius = "50%";
    myDiv.style.cursor = "pointer";
    console.log("ON MOUSE OVER", myDiv.outerHTML);
});

myDiv.addEventListener("mouseout", () => {
    myDiv.style.opacity = "1.0";
    myDiv.style.background = "red";
    myDiv.style.border = "none";
    myDiv.style.borderRadius = "0";
    myDiv.style.cursor = "default";
    console.log("ON MOUSE OUT", myDiv.outerHTML);
});

myDiv.addEventListener("mousedown", (e: MouseEvent) => {
    let oldCursor = myDiv.style.cursor;
    myDiv.style.cursor = "move";

    let mouseMoveHandler = (e: MouseEvent) => {
        myDiv.style.top = `${myDiv.offsetTop + e.movementY}px`;
        myDiv.style.left = `${myDiv.offsetLeft + e.movementX}px`;
    };

    let mouseUpHandler = () => {
        myDiv.style.cursor = oldCursor;
        myParent.removeEventListener("mousemove", mouseMoveHandler);
        myParent.removeEventListener("mouseup", mouseUpHandler);
    };

    myParent.addEventListener("mousemove", mouseMoveHandler);
    myParent.addEventListener("mouseup", mouseUpHandler);
});
