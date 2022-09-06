import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  date: any;
  orderid: any;
  orders: any[];
  msg: string;
  constructor(private route:ActivatedRoute, private myhttp:HttpClient) { }
  ngOnInit() {
    this.route.queryParams.subscribe(args => {
      this.orderid = args.orderid;
      this.date = args.date;
    })
    this.fetchorderdetails();
  }
  fetchorderdetails()
  {
    this.myhttp.get("http://localhost:3000/api/getorderdetailsbyuser?orderid=" + this.orderid,{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
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



