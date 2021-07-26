import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styles: [
  ]
})
export class AuthNavComponent implements OnInit {
  
  public items: any[] = [
    {
      name: 'Home',
      link: '/'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
