import packageJson from '../../../package.json';
import path from 'path';
import { app as electronApp, App } from 'electron';

export abstract class Env {
  readonly isDevMode!: boolean;
  readonly appName!: string;
  readonly appVersion!: string;
  readonly appPathData!: string;
  readonly appPathResources!: string;

  public static readonly get: Env = (() => {
    const app: App =
      electronApp ||
      (() => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          return require('@electron/remote').app;
        } catch (e) {
          console.error(e);
        }
      })();

    const isProdMode = process.env.NODE_ENV === 'production' || app.isPackaged;
    const isDevMode = !isProdMode;

    const appName = app.getName() || packageJson.name;
    const appPathData = app.getPath('userData') || path.resolve(__dirname, 'user_data');

    return {
      isDevMode: isDevMode,
      appName: appName,
      appVersion: app.getVersion() || packageJson.version,
      appPathData: appPathData,
      appPathResources: (() => {
        const baseDir = app.isPackaged ? process.resourcesPath : __dirname;
        return path.resolve(baseDir);
      })(),
    };
  })();

  public static get isDevMode() {
    return this.get.isDevMode;
  }

  public static get appName() {
    return this.get.appName;
  }

  public static get appVersion() {
    return this.get.appVersion;
  }

  public static get appPathData() {
    return this.get.appPathData;
  }

  public static get appPathResources() {
    return this.get.appPathResources;
  }
}
