// @ts-expect-error -> In vite there are no types for the following line. Electron forge error
import started from 'electron-squirrel-startup';
import { app } from 'electron';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
} else {
  const gotTheLock = app.requestSingleInstanceLock();
  if (gotTheLock) {
    (async () => {
      const { runApp } = await import('./app');
      runApp();
    })();
  } else {
    app.quit();
  }
}
