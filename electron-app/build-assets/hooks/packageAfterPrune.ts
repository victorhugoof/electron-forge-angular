import * as fs from 'fs/promises';
import * as path from 'path';

export async function packageAfterPrune(platform: string, arch: string, buildPath: string) {
  try {
    // extract resources
    console.log(`[${platform}-${arch}] Extracting resources from asar`);
    const foldersForMoveOutOfAsar = [
      {
        source: path.resolve(__dirname, '../../../angular-app/dist/angular-app/browser'),
        target: path.resolve(buildPath, '../angular-app'),
      },
    ];
    for (const it of foldersForMoveOutOfAsar) {
      const source = it.source;
      const target = it.target;
      await fs.cp(source, target, { recursive: true });
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}
