import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElectronService } from './services/electron.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
})
export class AppComponent {
  readonly electronService = inject(ElectronService);
  readonly title = signal('');

  constructor() {
    this.electronService
      .getAppName()
      .pipe(takeUntilDestroyed())
      .subscribe((name) => this.title.set(name));
  }
}
