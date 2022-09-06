import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css']
})
export class SearchuserComponent implements OnInit {
  msg:string;
  un:string;
  name:string="a";
  phone:string="7";
  gender:string="m";
  userlist:any[];
  constructor( private myhttp:HttpClient,private myrouter:Router  ) { }

  ngOnInit() {
  }
  ons1click(){
    var params={uname:this.un};
    this.myhttp.get("http://localhost:3000/api/searchuser?un="+this.un,{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0){this.msg="f";
          this.userlist=response;
          this.name=this.userlist[0]["name"];
          this.phone=response[0]["phone"];
          this.gender=response[0]["gender"];
        }
        else  
          this.msg="incorrect Email";
      },
    (error)=>{
      alert(error);
      this.msg=error;this.msg="dd";
    })
    
  }
}
