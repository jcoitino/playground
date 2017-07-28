let myDiv = document.createElement("div");
myDiv.setAttribute("id", "my-div");
myDiv.style.position = "absolute";
myDiv.style.top = "100px";
myDiv.style.left = "100px";
myDiv.style.width = "100px";
myDiv.style.height = "100px";
myDiv.style.background = "blue";

let myParent = document.querySelector("#output");
myParent!.appendChild(myDiv);

myDiv.style.top = "200px";
myDiv.style.left = "200px";
myDiv.style.width = "200px";
myDiv.style.height = "200px";
myDiv.style.background = "red";

myDiv.addEventListener("mouseover", () => {
    myDiv.style.opacity = "0.2";
    myDiv.style.background = "blue";
    myDiv.style.border = "10px dashed red";
    myDiv.style.borderRadius = "50%";
    myDiv.style.cursor = "pointer";
});

myDiv.addEventListener("mouseout", () => {
    myDiv.style.opacity = "1.0";
    myDiv.style.background = "red";
    myDiv.style.border = "none";
    myDiv.style.borderRadius = "0";
    myDiv.style.cursor = "default";
});

myDiv.addEventListener("mousedown", (e: MouseEvent) => {
    myDiv.style.cursor = "move";
    let moveHandler = (e: MouseEvent) => {
        myDiv.style.top = `${myDiv.offsetTop + e.movementY}px`;
        myDiv.style.left = `${myDiv.offsetLeft + e.movementX}px`;
    };

    let endHandler = () => {
        myDiv.style.cursor = "pointer";
        myParent!.removeEventListener("mousemove", moveHandler);
        myParent!.removeEventListener("mouseup", endHandler);
    }

    myParent!.addEventListener("mousemove", moveHandler);
    myParent!.addEventListener("mouseup", endHandler);
});
