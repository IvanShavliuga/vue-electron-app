'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    fullscreenable: false,
    frame: false,
    // icon: path.join(__static, 'icon.png'),
    resizable: false,
    height: 500,
    useContentSize: true,
    width: 500
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
/* ipcMain.on('toggle-minToTray', (event, arg) => {
  if (arg) {
    createTray()
  } else {
    tray.destroy()
  }
}) */

ipcMain.on('window-close', (event, arg) => {
  console.log('enter')
  mainWindow.close()
})
/*
ipcMain.on('window-minimize', (event, arg) => {
  if (arg) {
    mainWindow.hide()
  } else {
    mainWindow.minimize()
  }
}) */

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
