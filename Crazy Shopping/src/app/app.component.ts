import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crazy Shopping';
  utype:string="normal";

  constructor(private router:Router)
  {
    router.events.subscribe(event=> {
      if (event instanceof NavigationEnd) {
      this.ngOnInit();
      }
    })
  }
  ngOnInit() {
    this.utype=sessionStorage.getItem("utype");
  }
}
