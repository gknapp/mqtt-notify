const { Notification } = require("electron")

function notify(title, body = "") {
  new Notification({ title, body }).show()
}

module.exports = { notify }