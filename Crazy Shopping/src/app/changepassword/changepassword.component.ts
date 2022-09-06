import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { text } from '@angular/core/src/render3';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  curpass:string;
  newpass:string;
  cnewpass:string;
  msg:string="";
  constructor(private myhttp:HttpClient) { }
  ngOnInit() {
    
  }
  ons1click(){
    if(this.newpass==this.cnewpass){
    var reqparms={un:sessionStorage.getItem("uname"),cpass:this.curpass,newp:this.newpass};
    this.myhttp.put("http://localhost:3000/api/changepassword",reqparms,{responseType:"json"}).subscribe(
    (res)=>{
      if(res["nModified"]>0)
        this.msg="successfully changed";
      else  
        this.msg="you enter wrong password";
    },

    (error)=>{
      this.msg=error;
    }
    )
  }else{
    this.msg="passwords do not match";
  }
}

  }

