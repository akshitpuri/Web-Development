import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  visibilityadd: boolean=false;
  uname: string="";
  alladdress: any[];
  msg: string;
  default:any=[];
  visibility:boolean=false;
  defaultid: string="";
  streetaddress: any;
  city: any;
  phone: any;
  pin: any;
  state: any;
  name: any;
  address:string="";
  paymentmode: any;
  cardno: any;
  companyname: any;
  holdername: any;
  expirydate: any;
  cvvno: any;
  constructor(private route:Router,private myhttp:HttpClient ,private router:ActivatedRoute) { }
  ngOnInit(){
    this.uname=sessionStorage.getItem("uname");
    this.fetchaddressbyuname();
    this.router.queryParams.subscribe(params=>{
      if(params!=null){
        this.defaultid=params["address"];
        this.fetchaddressbyid();
      }
      }) 
    
      // doubt name doesnt change in this nohing working here
      //   this.address=this.name+","+this.streetaddress+","+this.city+","+ this.state+","+this.pin+","+this.phone; even this
      // this.name=this.alladdress[0]["name"];
      // this.streetaddress=this.alladdress[0]["streetaddress"];
      // this.city=this.alladdress[0]["city"];
      // this.state=this.alladdress[0]["state"];
      // this.pin=this.alladdress[0]["pin"];
      // this.phone=this.alladdress[0]["phone"];
 
    
  }
  fetchaddressbyid(){
    this.myhttp.get("http://localhost:3000/api/getaddressbyid?id="+this.defaultid,{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0){
          this.alladdress=response;
          this.name=this.alladdress[0]["name"];
      this.streetaddress=this.alladdress[0]["streetaddress"];
      this.city=this.alladdress[0]["city"];
      this.state=this.alladdress[0]["state"];
      this.pin=this.alladdress[0]["pin"];
      this.phone=this.alladdress[0]["phone"];
      this.visibilityadd=true;
      this.address=this.name+","+this.streetaddress+","+this.city+","+ this.state+","+this.pin+","+this.phone;
     
        }
        else 
          this.msg="";
      },
      (error)=>{
        this.msg=error;
      }
    )
  }
  fetchaddressbyuname(){
    this.myhttp.get("http://localhost:3000/api/getaddress?uname="+this.uname,{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0){
          this.alladdress=response;
          this.name=this.alladdress[0]["name"];
      this.streetaddress=this.alladdress[0]["streetaddress"];
      this.city=this.alladdress[0]["city"];
      this.state=this.alladdress[0]["state"];
      this.pin=this.alladdress[0]["pin"];
      this.phone=this.alladdress[0]["phone"];
      this.visibilityadd=true;
      this.address=this.name+","+this.streetaddress+","+this.city+","+ this.state+","+this.pin+","+this.phone;
     
        }   
        else 
          this.msg="";
      },
      (error)=>{
        this.msg=error;
      }
    )
  }


  onclickop(){
    this.visibility=true;
  }
  onclickcod(){
    this.visibility=false;
  }
  onpayment(){
    let params = {billtotal:parseInt(sessionStorage.getItem("billtotal")),address:this.address ,uname:sessionStorage.getItem("uname"),paymentmode:this.paymentmode,cardno:this.cardno,companyname:this.companyname,holdername:this.holdername,expirydate:this.expirydate,cvvno:this.cvvno}
    this.myhttp.post("http://localhost:3000/api/order",params,{responseType:"text"}).subscribe(
      (response)=>
      {
        this.route.navigateByUrl("/ordersummary");
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }

  }

