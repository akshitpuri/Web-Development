import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css']
})
export class OrdersummaryComponent implements OnInit {
  orderdet:any[];
  msg:string;
  orderno:string;
  cart:any[]=[];
  orditems:any[]=[];
  updatestock:any[]=[];
  seller: any;
  updatetrend: any[]=[];
  constructor(private myhttp:HttpClient,private router:Router) { }
  ngOnInit() {
    this.fetchorderdetails();
  }
  fetchorderdetails(){
    this.myhttp.get("http://localhost:3000/api/getordernum?uname=" + sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0){
          this.orderno=response[0]["_id"];
          this.fetchcart(); 
        } 
        else
        {
          this.msg="No records found";
        }
      },
      (error)=>
      {
        this.msg=error;
      }
    ) 
  }
  fetchcart(){
    this.myhttp.get("http://localhost:3000/api/getcartitems?uname=" + sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0){
          this.cart=response;
          this.orderitems();
        } 
        else
        {
          this.msg="No records found";
        }
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  orderitems(){
   
  
    for(let x=0;x<this.cart.length;x++){
      let vals={orderid:this.orderno,pid:this.cart[x]["pid"],pname:this.cart[x]["pname"],pprice:this.cart[x]["pprice"],pqty:this.cart[x]["pqty"],ptotal:this.cart[x]["ptotal "],ppic:this.cart[x]["ppic"], uname:sessionStorage.getItem("uname"),selleruname:this.cart[x]["selleruname"]};
      this.orditems.push(vals);
    }
    this.myhttp.post("http://localhost:3000/api/orderitems",this.orditems,{responseType:"text"}).subscribe(
        (response)=>
        {
          this.updatestockdb();
        },
        (error)=>
        {
          this.msg=error;
        }
      )
  }

  updatestockdb()
  {
    for(let x=0;x<this.cart.length;x++)
    {
      let vals2={pid:this.cart[x]["pid"],pqty:this.cart[x]["pqty"]}
      this.updatestock.push(vals2);
    }
    this.myhttp.put("http://localhost:3000/api/updatestock",this.updatestock,{responseType:"text"}).subscribe(
        (response)=>
        {
          this.updatetrenddb();
        },
        (error)=>
        {
          this.msg=error;
        }
      )
  }
  updatetrenddb(){
    for(let x=0;x<this.cart.length;x++)
    {
      let vals2={pid:this.cart[x]["pid"]}
      this.updatetrend.push(vals2);
    }
    this.myhttp.put("http://localhost:3000/api/updatetrend",this.updatetrend,{responseType:"text"}).subscribe(
        (response)=>
        {
          this.ondel();
        },
        (error)=>
        {
          this.msg=error;
        }
      )
  }
  ondel()
  {
    //alert(id);
    this.myhttp.delete("http://localhost:3000/api/emptycart?uname="+sessionStorage.getItem("uname") ,{responseType:"text"}).subscribe(
      (response)=>
      {
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
 

}
