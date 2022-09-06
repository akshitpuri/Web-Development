import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sellerorders',
  templateUrl: './sellerorders.component.html',
  styleUrls: ['./sellerorders.component.css']
})
export class SellerordersComponent implements OnInit {
  orders: any[];
  msg: string;
  utype: string;
  visible:boolean=false;
  newstatus: any[]=[""];
  uname: string;
  constructor(private myhttp: HttpClient) { }

  ngOnInit() {
    this.uname=sessionStorage.getItem("uname");

    this.fetchallordersbysellername();
  }
 
  fetchallordersbysellername(){
    // this.visible=false;
    this.myhttp.get("http://localhost:3000/api/getordersofseller?selleruname="+this.uname,{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0){
          this.orders=response;
        }
        else
        {
          this.msg="No details found";
        }
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  
}
