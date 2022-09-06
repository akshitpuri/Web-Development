import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {

  subcatid:string="";
  msg: any;
  allproducts: any[];
  constructor(private route:ActivatedRoute , private myhttp:HttpClient) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.subcatid=params["subcatid"];
      // alert(this.subcatid);
    })
    this.fetchproducts();
  }
  fetchproducts(){

    this.myhttp.get("http://localhost:3000/api/getproducts?subcatid="+this.subcatid,{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0)
          this.allproducts=response;
        else 
          this.msg="No Products Found";
      },
      (error)=>{
        this.msg=error;
      }
    )
  }


}
