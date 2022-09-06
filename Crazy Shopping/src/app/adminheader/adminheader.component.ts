import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

  name:string;
  productsincart:string="0";
  vis:boolean;
    constructor(private myrouter:Router ){ 
      console.log("con running");
    myrouter.events.subscribe(event=>{ if (event instanceof NavigationEnd){
      this.ngOnInit();  
    }
    
    })
    myrouter.events.subscribe(event=>{ if (event instanceof NavigationStart) {
      this.ngOnInit();  
    }
    
    })

  }
  ngOnInit() {
    if(sessionStorage.getItem("productsincart")!=null)
      this.productsincart=sessionStorage.getItem("productsincart");
    console.log("ngonit running");
    if(sessionStorage.getItem("name")!=null){
      this.name =sessionStorage.getItem("name");
      this.vis=false
    }
    else{
      this.name="Guest";
      this.vis=true;}
  }
  onlogout(){
    sessionStorage.clear();
    this.myrouter.navigateByUrl('logout');
  }

}
