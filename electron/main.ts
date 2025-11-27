import { app, BrowserWindow, ipcMain } from "electron"
// import { createRequire } from 'node:module'
import { fileURLToPath } from "node:url"
import path from "node:path"
import { Menu } from "electron"

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..")

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"]
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron")
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist")

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST

let win: BrowserWindow | null
let userInfoWindow: BrowserWindow | null = null

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
  //控制台启用
  // win.webContents.openDevTools()

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"))
  }
}

// 创建用户信息窗口
function createUserInfoWindow() {
  // 如果窗口已存在，则聚焦该窗口
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
    parent: win || undefined, // 设置父窗口
    modal: false, // 非模态窗口
  })

  // 加载用户信息页面（这里可以根据需要加载不同的路由）
  if (VITE_DEV_SERVER_URL) {
    userInfoWindow.loadURL(`${VITE_DEV_SERVER_URL}#/userinfo`)
  } else {
    userInfoWindow.loadFile(path.join(RENDERER_DIST, "index.html"), {
      hash: "/userinfo",
    })
  }

  // 窗口关闭时清理引用
  userInfoWindow.on("closed", () => {
    userInfoWindow = null
  })

  // 可选：启用开发者工具
  // userInfoWindow.webContents.openDevTools()
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
    win = null
  }
})

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
ipcMain.on("window-close", () => {
  const win = BrowserWindow.getFocusedWindow()
  win?.close()
})
ipcMain.on("window-minimize", () => {
  const win = BrowserWindow.getFocusedWindow()
  win?.minimize()
})

// 监听打开用户信息窗口的请求
ipcMain.on("open-userinfo-window", () => {
  createUserInfoWindow()
})

app.whenReady().then(createWindow)
