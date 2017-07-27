const { app, BrowserWindow } = require('electron');
const { join } = require('path');
const { format } = require('url');

let win = null;
let url = format({ pathname: join(__dirname, 'index.html'), protocol: 'file:', slashes: true });

function createWindow() {
    if (win === null) {
        win = new BrowserWindow({});
        win.maximize();
        win.loadURL(url);
        win.webContents.openDevTools({ mode: "bottom" });
        win.on('closed', () => win = null);
    }
}

app.on('ready', createWindow);
app.on('activate', createWindow);
app.on('window-all-closed', () => app.quit());
