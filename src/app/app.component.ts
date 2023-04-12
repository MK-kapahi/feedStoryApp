import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'feedStoryApp';

  loading$: Observable<boolean> = of(false);
  loading = false;

  constructor(private router: Router) {
  } 
}
