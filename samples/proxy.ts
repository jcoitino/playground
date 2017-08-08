// Helper (output and log)
let out = document.querySelector("#output") as HTMLElement;
out.style.overflow = "auto";
out.style.background = "black";
out.style.color = "white";
out.style.fontSize = "24px";
let log = (m: any, ...args: any[]) => {
    console.log(m, ...args);
    let pre = document.createElement("pre") as HTMLElement;
    pre.textContent = m;
    args.forEach(a => pre.textContent += `${a}`);
    out.appendChild(pre);
};
// Target object to be proxied
let o = {
    a: "a string",
    b: 123,
    c: new Date(),
    f: (x: number, y: number) => x + y,
};
// Proxy handler to intercept acces to proxied object
let h = {
    get: (t, p) => {                                        log(`[PROXY HANDLER] get '${p}'`);
        return Reflect.get(t, p);
    },
    set: (t, p, v) => {                                     log(`[PROXY HANDLER] set '${p}' = [${v}]`);
        return Reflect.set(t, p, v);
    },
    has: (t, p) => {                                        log(`[PROXY HANDLER] has '${p}'`);
        return Reflect.has(t, p);
    },
    deleteProperty: (t, p) => {                             log(`[PROXY HANDLER] delete '${p}'`);
        return Reflect.deleteProperty(t, p);
    },
    defineProperty: (t, p, d) => {                          log(`[PROXY HANDLER] defineProperty '${p}'`);
        return Reflect.defineProperty(t, p, d);
    },
    getOwnPropertyDescriptor: (t, p) => {                   log(`[PROXY HANDLER] getOwnPropertyDescriptor '${p}'`);
        return Reflect.getOwnPropertyDescriptor(t, p);
    },
    ownKeys: (t) => {                                       log(`[PROXY HANDLER] ownKeys`);
        return Reflect.ownKeys(t);
    },
    getPrototypeOf: (t) => {                                log(`[PROXY HANDLER] getPrototypeOf`);
        return Reflect.getPrototypeOf(t);
    },
    setPrototypeOf: (t, p) => {                             log(`[PROXY HANDLER] setPrototypeOf`);
        return Reflect.setPrototypeOf(t, p);
    },
    isExtensible: (t) => {                                  log(`[PROXY HANDLER] isExtensible`);
        return Reflect.isExtensible(t);
    },
    preventExtensions: (t) => {                             log(`[PROXY HANDLER] preventExtensions`);
        return Reflect.preventExtensions(t);
    },
    // when target is a class or constructor function and new instance is created
    construct: function (t, args, n) {                      log(`[PROXY HANDLER] construct`);
        return Reflect.construct(t, args, n);
    },
    // when target is a function and is executed
    apply: (t, thisArg, args) => {                          log(`[PROXY HANDLER] apply`);
        return Reflect.apply(t, thisArg, args);
    },
};
// The Proxy (target and handler must be provided)
let p = new Proxy(o, h);
// HAS
log("HAS PROPERTIES:");
log("===============");
log("a" in p);
log("b" in p);
log("c" in p);
log("d" in p);
log("f" in p);
// GET
log("GET PROPERTIES:");
log("===============");
log(p.a);
log(p.b);
log(p.c);
log(p.d);
log(p.f);
log(p.f(3, 5));
// SET
log("SET PROPERTIES:");
log("===============");
p.a = "A new string";
p.b = 456;
p.c = new Date();
p.d = ["a new property", "array", 789];
p.f = (x: number, y: number) => x * y;
log("GET PROPERTIES:");
log("===============");
log(p.a);
log(p.b);
log(p.c);
log(p.d);
log(p.f);
log(p.f(3, 5));
// IN
log("ITERATE PROXY PROPERTIES:");
log("=========================");
for (let ppt in p) {
    // NOOP
}
log("ITERATE PROXY PROPERTIES:");
log("=========================");
for (let ppt in p) {
    let val = p[ppt];
    if (val instanceof Object) {
        log(ppt, " = [", val, "] : ", typeof val, " (", Reflect.getPrototypeOf(val).constructor.name, ")");
    } else {
        log(ppt, " = [", val, "] : ", typeof val);
    }
}
