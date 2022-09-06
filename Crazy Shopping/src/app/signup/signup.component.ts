import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name:string;
  phone:string;
  un:string;
  pass:string;
  cpass:string;
  msg:string;
  gender:string;
  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
  }
  ons1click(){
    var vals={nm:this.name,ph:this.phone,gen:this.gender,uname:this.un,pass:this.pass,utype:"normal"};
    this.myhttp.post("http://localhost:3000/api/signup",vals,{responseType:"text"}).subscribe(
      (response)=>{
        this.msg=response;
      }
    ),
    (error)=>{
      this.msg=error;
    }
  }

}
