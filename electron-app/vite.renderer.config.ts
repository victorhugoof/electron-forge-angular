import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  root: '../angular-app/dist/angular-app/browser', // Usa a pasta do Angular como o frontend
  build: {
    outDir: '../electron-app/renderer', // Copia o build Angular para dentro da Electron
  },
  // server: {
  //   port: 4200,
  // },
});
