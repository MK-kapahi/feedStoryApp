import { Component } from '@angular/core';
import { FireBaseService } from 'src/app/service/fire-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public firebase : FireBaseService){}
}
