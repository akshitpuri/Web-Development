import { Component, OnInit } from '@angular/core';
import { StringifyOptions } from 'querystring';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name:string;
  productsincart:string="0";
  vis:boolean;
  allcat: any;
  msg: string;
  pname="";
    constructor(private myrouter:Router,private myhttp:HttpClient ){ 
      console.log("con running");
    myrouter.events.subscribe(event=>{ if (event instanceof NavigationEnd){
      this.ngOnInit();  
    }
    
    })

  }
  // searchhproduvt(){
  //   this.myrouter.navigate()
  // }
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
      this.fetchallcat();
  }
  fetchallcat()
  {
    this.myhttp.get("http://localhost:3000/api/getcat",{responseType:"json"}).subscribe(
      (response:[])=>
      {
        if(response.length>0)
        {
          this.allcat=response;
        }
        else
        {
          this.msg="No Categories";
        }

      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  onlogout(){
    sessionStorage.clear();
    this.myrouter.navigateByUrl('logout');
  }

}
