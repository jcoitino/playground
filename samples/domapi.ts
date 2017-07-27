debugger;

let myDiv = document.createElement("div");
myDiv.style.position = "absolute";
myDiv.style.top = "100px";
myDiv.style.left = "100px";
myDiv.style.width = "100px";
myDiv.style.height = "100px";
myDiv.style.background = "blue";

let myParent = document.querySelector("#output") as HTMLDivElement;
myParent.appendChild(myDiv);