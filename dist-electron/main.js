import { app, BrowserWindow, ipcMain, Menu } from "electron"
import { fileURLToPath } from "node:url"
import path from "node:path"
const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, "..")
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"]
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron")
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist")
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST
let win
let userInfoWindow = null
function createWindow() {
  Menu.setApplicationMenu(null)
  win = new BrowserWindow({
    width: 1080,
    minWidth: 1080,
    height: 750,
    minHeight: 750,
    resizable: false,
    icon: path.join(process.env.VITE_PUBLIC, "logo.jpg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      // devTools: true,
    },
    frame: false,
  })
  win.setMovable(true)
  win.webContents.on("did-finish-load", () => {
    win == null
      ? void 0
      : win.webContents.send(
          "main-process-message",
          /* @__PURE__ */ new Date().toLocaleString(),
        )
  })
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"))
  }
}
function createUserInfoWindow() {
  if (userInfoWindow && !userInfoWindow.isDestroyed()) {
    userInfoWindow.focus()
    return
  }
  userInfoWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    resizable: false,
    icon: path.join(process.env.VITE_PUBLIC, "logo.jpg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    frame: false,
    parent: win || void 0,
    // 设置父窗口
    modal: false,
    // 非模态窗口
  })
  if (VITE_DEV_SERVER_URL) {
    userInfoWindow.loadURL(`${VITE_DEV_SERVER_URL}#/userinfo`)
  } else {
    userInfoWindow.loadFile(path.join(RENDERER_DIST, "index.html"), {
      hash: "/userinfo",
    })
  }
  userInfoWindow.on("closed", () => {
    userInfoWindow = null
  })
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
    win = null
  }
})
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
ipcMain.on("window-close", () => {
  const win2 = BrowserWindow.getFocusedWindow()
  win2 == null ? void 0 : win2.close()
})
ipcMain.on("window-minimize", () => {
  const win2 = BrowserWindow.getFocusedWindow()
  win2 == null ? void 0 : win2.minimize()
})
ipcMain.on("open-userinfo-window", () => {
  createUserInfoWindow()
})
app.whenReady().then(createWindow)
export { MAIN_DIST, RENDERER_DIST, VITE_DEV_SERVER_URL }
