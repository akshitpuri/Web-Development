import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {

  subcatid:string="";
  msg: any;
  allproducts: any[];
  config: any;
  pname:string;
  collection = { count: 60, data: [] };
  constructor(private route:ActivatedRoute , private myhttp:HttpClient) { 
     //Create dummy data
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.pname=params["pname"];
      // alert(this.subcatid);
    })
    alert(this.pname);
    if(this.pname==null)
    this.fetchproducts();
    else
    this.fetchsearchproducts();
  }
  fetchsearchproducts(){
    // alert("n");
    this.myhttp.get("http://localhost:3000/api/searchproduct?pname="+this.pname,{responseType:"json"}).subscribe(
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
  fetchproducts(){
    this.myhttp.get("http://localhost:3000/api/getallproducts",{responseType:"json"}).subscribe(
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
