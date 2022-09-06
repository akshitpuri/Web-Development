import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{Router} from '@angular/router'
// import { Server } from 'http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor( private myhttp:HttpClient,private myrouter:Router  ) { }
un:string;
pass:string;
msg:string;
name:string;
usertype:string;
  ngOnInit() {
  }
  ons1click(){
    var params={un:this.un,pass:this.pass};
    this.myhttp.post("http://localhost:3000/api/login",params,{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0){
          this.name=response[0]["name"];
          this.un=response[0]["username"];
          this.usertype=response[0]["usertype"];
          // changed nm to name
          sessionStorage.setItem("name",this.name);
          sessionStorage.setItem("uname",this.un);
          sessionStorage.setItem("default","0");
          sessionStorage.setItem("utype",this.usertype);


          if(this.usertype=="admin")
            this.myrouter.navigateByUrl('adminhome');
          else
            this.myrouter.navigateByUrl('sitehome');
       }
        else  
          this.msg="incorrect username and password"
      },
    (error)=>{
      this.msg=error;
    })
  }
}
