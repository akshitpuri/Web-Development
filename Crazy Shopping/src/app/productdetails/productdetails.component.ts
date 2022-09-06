import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  msg: any;
  allproducts: any[];
  pid: any;
  productname:string;
  productpic:string;
  price:number;
  remprice:number;
  stock:number;
  description:string;
  discount:number;
  showstock:any[]=["1"];
  qty:number=1;
  uname: string;
  total:number;
  selleruname: any="";
  reviews:string[]=[];
  review:string="asdsa";
  rating:number=1;
  cart: any[];
  totalitems: any;
  constructor(private route:ActivatedRoute , private myhttp:HttpClient ,private myroute:Router) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.pid=params["pid"];
    })
    this.fetchproductdetail();
  }
  addtocart(){
    this.uname=sessionStorage.getItem("uname");
    if(this.uname==null){
      this.msg="Login First ";
      return ;
    }
    this.fetchcart();
    this.total=this.remprice*this.qty;
    var vals={pid:this.pid,pname:this.productname,pprice:this.remprice,pqty:this.qty,ptotal:this.total,ppic:this.productpic,uname:this.uname,selleruname:this.selleruname};
    this.myhttp.post("http://localhost:3000/api/addtocart",vals,{responseType:"text"}).subscribe(
      (response)=>{
        // this.msg=response;
        this.myroute.navigateByUrl("/cart");
      }
    ),
    (error)=>{
      this.msg=error;
    }
  }
  fetchcart(){
    this.myhttp.get("http://localhost:3000/api/getcartitems?uname="+sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
      (response:any[])=>{
        this.cart=response;
        console.log(this.cart);
        this.totalitems=this.qty;
        for(let i=0;i<response.length;i++){
          this.qty[i]=this.cart[i]["pqty"];
          this.totalitems+=this.cart[i]["pqty"];
        }
        sessionStorage.setItem("productsincart",this.totalitems);
        // this.catid=this.cat[0]["catid"];
      },
      (error)=>{
        this.msg=error;
      }
    )
    
  }
  fetchproductdetail(){
    this.myhttp.get("http://localhost:3000/api/productdetails?pid="+this.pid,{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0){
          this.description=response[0]["pdesc"];
          this.price=(response[0]["pprice"]);
          this.stock=response[0]["pstock"];
          this.productname=response[0]["pname"];
          this.productpic=response[0]["ppic"];
          this.discount=response[0]["pdiscount"];
          this.remprice=this.price*(1-this.discount/100);
          this.remprice= parseInt(this.remprice.toFixed(0));
          this.selleruname=response[0]["selleruname"];
          
          var val:number;
          this.showstock.splice(1,this.showstock.length);
          if(this.stock>5)
            val=5;
          else
            val=this.stock;
          for(var i=2;i<=val;i++){
            this.showstock.push(i);
          }
        }
        else 
          this.msg="No Products did not found";
      },
      (error)=>{
        this.msg=error;
      }
    )
    

  }

  addreview(){
    alert(this.review); 
    var body={review:this.review,rating:this.rating,uname:sessionStorage.getItem("uname"),prodid:this.pid}
    this.myhttp.post("http://localhost:3000/api/addreview",body,{responseType:"text"}).subscribe(
      (response)=>{
        this.msg=response;
      },
      (error)=>{
        this.msg=error;
      }
    )
  }

}
