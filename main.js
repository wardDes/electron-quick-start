// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  /*
    Added show and backgroundColor props to 
    Browser window
  */
  mainWindow = new BrowserWindow({
    show: false,// DEFAULT: true
    // need to clear background to make transparent window
    //backgroundColor: '#FFF',// DEFAULT: '#FFF'
    width: 800,// DEFAULT: 800
    height: 600,// DEFAULT: 600
    minWidth: 800,// DEFAULT: 0
    maxWidth: 1024,// DEFAULT: UNLIMITED
    minHeight: 600,// DEFAULT: 0
    maxHeight: 768,// DEFAULT: UNLIMITED
    resizable: true,// DEFAULT: true
    movable: true,// DEFAULT: true
    alwaysOnTop: false,// DEFAULT: false
    //title: "Goodybe, Moon?", // DEFAULT: f"Electron"
    frame: true, // DEFAULT: true
    //: 'hidden-inset', // DEFAULT: 'default', FOR MACS ONLY
    transparent: true, // DEFAULT: false,  on Windows OS ONLY IF FRAME SET TO false
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })


  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Wait for 'ready-to-show' to display our window
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
