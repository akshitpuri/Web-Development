import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  alladdress: any[]=[];
  uname: string;
  msg:string;
  default:number;
  constructor(private route:ActivatedRoute , private myhttp:HttpClient) { }
  ngOnInit() {
    // this.route.queryParams.subscribe(params=>{
    //   // this.a=params["subcatid"];
    //   // alert(this.subcatid);
    // })
    this.uname=sessionStorage.getItem("uname");
    this.fetchaddress();
  }
  setdefault(id){
    // alert(parseInt(sessionStorage.getItem("default")));
    this.default=parseInt(sessionStorage.getItem("default")) +1;
    sessionStorage.setItem("default",this.default.toString());
    sessionStorage.setItem("defaultid",id);
    var reqparms={id:id,default:this.default};
    this.myhttp.put("http://localhost:3000/api/updatedefault",reqparms,{responseType:"json"}).subscribe(
    (res)=>{
      this.fetchaddress();

      // if(res["nModified"]>0)
      //   this.msg="successfully changed";
      // else  
      //   this.msg="you enter wrong password";
    },
    (error)=>{
      this.msg=error;
    }
    )}
    // doubt nouw make update ap
  deleteaddress(id){
    var yes=confirm("Are You sure  to Delete the Address ");
    // prompt("thankyoi");For inputting strings
    if(yes){
      this.myhttp.delete("http://localhost:3000/api/deleteaddress?id="+id,{responseType:'text'}).subscribe(
        (res)=>
        {
          // alert(res);
          this.fetchaddress();
        },
        (error)=>{
          alert(error);
        }
      )
  }
}
  fetchaddress(){
    this.myhttp.get("http://localhost:3000/api/getaddress?uname="+this.uname,{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0)
          this.alladdress=response;
        else 
          this.msg="";
      },
      (error)=>{
        this.msg=error;
      }
    )
  }
}

