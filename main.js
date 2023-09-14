const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev =process.env.NODE_ENV === 'development' ? false : true;
const isMac = process.platform === 'darwin' ? true : false;

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Image Shrinker',
        width:  500,
        height: 600,
    });

    if(isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
});

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})