import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

interface ElectronApi {
  getAppName: () => Promise<string>;
}

@Injectable({ providedIn: 'root' })
export class ElectronService {
  getAppName() {
    return of(undefined).pipe(switchMap(() => fromPromise(this.getElectron().getAppName())));
  }

  private getElectron(): ElectronApi {
    return (window as any).electron;
  }
}
