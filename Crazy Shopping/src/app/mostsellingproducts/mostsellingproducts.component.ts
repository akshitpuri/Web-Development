import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mostsellingproducts',
  templateUrl: './mostsellingproducts.component.html',
  styleUrls: ['./mostsellingproducts.component.css']
})
export class MostsellingproductsComponent implements OnInit {

  subcatid:string="";
  msg: any;
  allproducts: any[];
  config: any;
  collection = { count: 60, data: [] };
  uname: string;
  constructor(private route:ActivatedRoute , private myhttp:HttpClient) { 
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  ngOnInit() {
    this.fetchproducts();   
  }
  fetchproducts(){
    // this.uname=(sessionStorage.getItem("uname"));
    this.myhttp.get("http://localhost:3000/api/getmostsellingproducts?selleruname="+sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
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
