import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[];
  arr10: any[]=[1,2,3,4,5,6,7,8,9,10];
  grandtotal:number=0;
  msg: any;
  qty:number[]=[];
  visibility: boolean=true;
  totalitems: any;

  constructor(private myhttp:HttpClient,private route:ActivatedRoute,private myroute:Router) { }

  ngOnInit() {
    this.fetchcart();
  }
  // oncheckout(){
  //   this.route.url
  // }
  removecartitem(cartid){
    this.myhttp.delete("http://localhost:3000/api/deletecartitem?cartid="+cartid,{responseType:'text'}).subscribe(
      (res)=>
      {
        this.fetchcart();
      },
      (error)=>{
        alert(error);
      }
    )
  }
  onchangeqty(cartid,index,price){
    var reqparms={uname:sessionStorage.getItem("uname"),cartid:cartid,pqty:this.qty[index],ptotal:this.qty[index]*price};
    this.myhttp.put("http://localhost:3000/api/updatecart",reqparms,{responseType:"json"}).subscribe(
    (res)=>{
      if(res["nModified"]>0){
        this.fetchcart();
      }
    },
    (error)=>{
      this.msg=error;
    }
    )
  }
  fetchcart(){
    this.myhttp.get("http://localhost:3000/api/getcartitems?uname="+sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
      (response:any[])=>{
        this.cart=response;
        console.log(this.cart);
        if(response.length==0)this.visibility=false;
        else this.visibility=true;
        this.totalitems=0;
        this.grandtotal=0;
        for(let i=0;i<response.length;i++){
          this.qty[i]=this.cart[i]["pqty"];
          this.totalitems+=this.cart[i]["pqty"];
          this.grandtotal+=this.cart[i]["ptotal"];
          sessionStorage.setItem("billtotal",this.grandtotal.toString());
        }
        sessionStorage.setItem("productsincart",this.totalitems);
        // this.catid=this.cat[0]["catid"];
      },
      (error)=>{
        this.msg=error;
      }
    )
    
  }
}
