import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trendingproducts',
  templateUrl: './trendingproducts.component.html',
  styleUrls: ['./trendingproducts.component.css']
})
export class TrendingproductsComponent implements OnInit {

  subcatid:string="";
  msg: any;
  allproducts: any[];
  config: any;
  collection = { count: 60, data: [] };
  constructor(private route:ActivatedRoute , private myhttp:HttpClient) { 
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  ngOnInit() {
    this.fetchproducts();   
  }
  fetchproducts(){
    this.myhttp.get("http://localhost:3000/api/gettrendingproducts",{responseType:"json"}).subscribe(
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
