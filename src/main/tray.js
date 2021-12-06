const { Tray, Menu, nativeImage } = require("electron")
const path = require("path")

function buildMenu(app, win) {
  function quit() {
    app.exit(0)
  }

  function restore() {
    win.show()
  }

  return Menu.buildFromTemplate([
    { label: "Options", click: () => restore(), type: "normal" },
    { type: "separator" },
    { label: "Quit", click: () => quit(), type: "normal" }
  ])
}

function addToTray(app, win) {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, "../assets/tray.png")
  )
  const tray = new Tray(icon.resize({ height: 20, width: 20 }))
  const menu = buildMenu(app, win)
  tray.setToolTip("MQTT Notify")
  tray.setTitle("Title")
  tray.setContextMenu(menu)
  return tray
}

module.exports = { addToTray }