const { app, BrowserWindow } = require("electron")
const { notify } = require("./notify")
const { addToTray } = require("./tray")

let trayIcon = null

function bindWindowListeners(win) {
  win.on("close", (event) => {
    event.preventDefault();
    win.hide()
  })

  return win
}

function createWindow() {
  const opts = {
    autoHideMenuBar: true,
    height: 480,
    width: 640,
    // show: false
  }
  const win = new BrowserWindow(opts)
  // win.loadFile("src/assets/index.html")
  win.loadURL("http://localhost:3000")

  if (!app.isPackaged) { // dev
    win.webContents.openDevTools({ mode: "detach" })
  }

  return bindWindowListeners(win)
}

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})

if (process.platform === "win32") {
  // Required by Windows 10 to see notifications
  app.setAppUserModelId(process.execPath)
}

app
  .whenReady()
  .then(createWindow)
  .then(win => {
    trayIcon = addToTray(app, win)
    notify("Title", "Details")
  })