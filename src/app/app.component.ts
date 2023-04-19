import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'feedStoryApp';

  constructor(private spinnerService: NgxSpinnerService) {
  } 
  ngOnInit(): void {
  
  }
  }
