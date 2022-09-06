import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showsubcat',
  templateUrl: './showsubcat.component.html',
  styleUrls: ['./showsubcat.component.css']
})
export class ShowsubcatComponent implements OnInit {
  catid:string="";
  msg: any;
  allsubcat: any[];
  constructor(private route:ActivatedRoute , private myhttp:HttpClient) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.catid=params["catid"];
    })
    this.fetchsubcatid();
  }
  fetchsubcatid(){

    this.myhttp.get("http://localhost:3000/api/getsubcat?catid="+this.catid,{responseType:"json"}).subscribe(
      (response:any[])=>{
        // alemrt(response[1]["catname"]);
        if(response.length>0)
          this.allsubcat=response;
        else 
          this.msg="No Subcategories Found";
        // this.catid=this.cat[0]["catid"];
      },
      (error)=>{
        this.msg=error;
      }
    )
  }

}
