import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-addressdetails',
  templateUrl: './addressdetails.component.html',
  styleUrls: ['./addressdetails.component.css']
})
export class AddressdetailsComponent implements OnInit {
  uname:string="";
  name:string="";
  phone:string="";
  pin:string="";
  streetaddress:string="";
  state:string="";
  city:string="";
  default:number=0;
  msg:string="";
  visible:boolean=true;
  constructor(private myhttp:HttpClient,private route :Router ,private router :ActivatedRoute,private _location: Location) { }
  
  ngOnInit() {
    this.router.queryParams.subscribe(params=>{
      // this.subcatid=params["subcatid"];
      // alert(this.subcatid);
      if(params["pid"]=="")
      this.filldetails();
    })
    this.default=parseInt(sessionStorage.getItem("default"))-1;
  }
  filldetails(){
    this.visible=false;
  }
  onupdateclick(){
    this.visible=true;
  }
  onaddclick(){
    var vals={uname:sessionStorage.getItem("uname"),name:this.name,phone:this.phone, pin:this.pin,streetaddress:this.streetaddress,state:this.state,city:this.city,default:this.default};
    this.myhttp.post("http://localhost:3000/api/addaddress",vals,{responseType:"text"}).subscribe(
      (response)=>{
        this.msg=response;
        if(sessionStorage.getItem("default")==null)
          sessionStorage.setitem("default","0");
        this._location.back();
      }
    ),
    (error)=>{
      this.msg=error;
    }
  }
}
