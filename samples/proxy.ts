let out = document.querySelector("#output") as HTMLElement;
out.style.overflow = "auto";
out.style.fontSize = "24px";
let log = (m: any, ...args: any[]) => {
    console.log(m, ...args);
    let pre = document.createElement("pre") as HTMLElement;
    pre.textContent = m;
    args.forEach(a => pre.textContent += `${a}`);
    out.appendChild(pre);
}
let o = {
    a: "a string",
    b: 123,
    c: new Date(),
    f: (x: number, y: number) => x + y,
};
let h = {
    has: (t, p) => {
        log(`[PROXY HANDLER] target has property '${p}': ${typeof t[p]}`);
        return p in t;        
    },
    get: (t, p) => {
        log(`[PROXY HANDLER] get target property '${p}': ${typeof t[p]}`);
        return t[p];
    },
    set: (t, p, v) => {
        log(`[PROXY HANDLER] set target property '${p}' <- `, v, " : ", typeof v);
        t[p] = v;
        return true;
    },
};
let p = new Proxy(o, h);

// has
log("a" in p);
log("b" in p);
log("c" in p);
log("d" in p);
log("f" in p);

// get
log(p.a);
log(p.b);
log(p.c);
log(p.d);
log(p.f);
log(p.f(3, 5));

// set
p.a = "A new string";
p.b = 456;
p.c = new Date();
p.d = ["a new property", "array", 789];
p.f = (x: number, y: number) => x * y;
log(p.a);
log(p.b);
log(p.c);
log(p.d);
log(p.f);
log(p.f(3, 5));
