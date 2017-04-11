const electron = require('electron')
const BrowserWindow = electron.BrowserWindow

const {app, globalShortcut} = require('electron')

const path = require('path')
const url = require('url')
const exec = require('child_process').exec

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  var screenElectron = electron.screen;
  console.log(screenElectron)

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 2400, height: 1180, frame: false})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  globalShortcut.register('R', () => {
    console.log('CommandOrControl+R is pressed')
    mainWindow.reload()
  })

  globalShortcut.register('Q', () => {
    console.log('CommandOrControl+Q is pressed')
    mainWindow.close()
  })

  globalShortcut.register('H', () => {
    console.log('CommandOrControl+H is pressed')
    exec('./scripts/hook.sh', (err, stdout, stderr) => {
      if (err) {
        console.error(err)
      } else {
        console.log(stdout)
        console.log(stderr)
        //mainWindow.reload()
      }
    })
  })

  globalShortcut.register('ESC', () => {
    console.log('CommandOrControl+Q is pressed')
    mainWindow.close()
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
