import {app as n, BrowserWindow as i, Menu as a} from "electron";
import {fileURLToPath as c} from "node:url";
import o from "node:path";

const s = o.dirname(c(import.meta.url));
process.env.APP_ROOT = o.join(s, "..");
const t = process.env.VITE_DEV_SERVER_URL, R = o.join(process.env.APP_ROOT, "dist-electron"),
    r = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = t ? o.join(process.env.APP_ROOT, "public") : r;
let e;

function l() {
    a.setApplicationMenu(null), e = new i({
        width: 1050,
        minWidth: 1050,
        height: 750,
        minHeight: 750,
        resizable: !1,
        icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
        webPreferences: {
            preload: o.join(s, "preload.mjs"),
            devTools: !0
        },
        frame: !1
    }), e.setMovable(!0), e.webContents.openDevTools(), e.webContents.on("did-finish-load", () => {
        e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
    }), t ? e.loadURL(t) : e.loadFile(o.join(r, "index.html"));
}

n.on("window-all-closed", () => {
    process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
    i.getAllWindows().length === 0 && l();
});
n.whenReady().then(l);
export {
    R as MAIN_DIST,
    r as RENDERER_DIST,
    t as VITE_DEV_SERVER_URL
};
