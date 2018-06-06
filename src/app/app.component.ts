import { Component, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private translate: TranslateService,
    private element: ElementRef,
    private overlayContainer: OverlayContainer,
    private breakpointObserver: BreakpointObserver
  ) {
    translate.setDefaultLang('en');
  }

  onSetStyle(event) {
    this.element.nativeElement.className = '';
    this.overlayContainer.getContainerElement().className = '';
    this.element.nativeElement.classList.add(event);
    this.overlayContainer.getContainerElement().classList.add(event);
  }
}
