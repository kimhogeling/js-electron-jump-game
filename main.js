'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

// Prevent the window for being closed at JS garbage collection
// by keeping a reference in the global scope.
let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 320, height: 222 });
    mainWindow.loadURL('file://' + __dirname + '/gulped/index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

// Create window when electron is done initializating
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// For OS X: re-create window when dock icon is clicked and no windows are open
app.on('activate', () => {
    !mainWindow && createWindow()
})
