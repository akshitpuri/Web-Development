import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-showcat',
  templateUrl: './showcat.component.html',
  styleUrls: ['./showcat.component.css']
})
export class ShowcatComponent implements OnInit {

  allcat:any[];
  catid:string="";
  msg: any;
  constructor(private myhttp:HttpClient,myrouter:Router) {
    console.log("con running");
    myrouter.events.subscribe(event=>{ if (event instanceof NavigationEnd){
      this.ngOnInit();  
    }
    })
  }
  ngOnInit() {
    this.fetchcatid();
  }
  fetchcatid(){
    this.myhttp.get("http://localhost:3000/api/getcat",{responseType:"json"}).subscribe(
      (response:any[])=>{
        // alemrt(response[1]["catname"]);
        if(response.length>0)
          this.allcat=response;
        else 
          this.msg="No categories Found";
        // this.catid=this.cat[0]["catid"];
      },
      (error)=>{
        this.msg=error;
      }
    )
  }

}
