import { app, BrowserWindow, ipcMain } from 'electron';
import { enable, initialize } from '@electron/remote/main';
import { Env } from './core/env';
import path from 'path';

export const runApp = () => {
  const createWindow = async () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        allowRunningInsecureContent: true,
        preload: path.join(__dirname, 'preload.js'),
        webSecurity: false,
      },
    });

    // And load the app.
    if (Env.isDevMode) {
      while (true) {
        try {
          await mainWindow.loadURL('http://localhost:4200');
          break;
        } catch (e) {
          // console.error(e);
          console.log('Angular is not available yet!');
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }
    } else {
      const file = path.resolve(Env.appPathResources, 'angular-app/index.html');
      await mainWindow.loadFile(file);
    }

    mainWindow.webContents.openDevTools();
  };

  const createHandlers = () => {
    ipcMain.handle('getAppName', () => {
      return `Hello from Electron - ${Env.appName} v${Env.appVersion}`;
    });
  };

  initialize();

  // Enables electron remote
  app.on('browser-window-created', (_, window) => {
    enable(window.webContents);
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', async () => {
    createHandlers();
    await createWindow();
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // Handles when creating second instance of app
  app.on('second-instance', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      BrowserWindow.getAllWindows().forEach((it) => it.restore());
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.
};
