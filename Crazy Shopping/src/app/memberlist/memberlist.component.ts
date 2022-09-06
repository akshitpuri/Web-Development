import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {

  constructor( private myhttp:HttpClient) { }
msg:string;
userlist:any[];
  ngOnInit() {
    this.fetchmembers();
  }
  fetchmembers(){
      this.myhttp.get("http://localhost:3000/api/memlist",{responseType:"json"}).subscribe(
        (response:any[])=>{
          if(response.length>0){
            this.userlist=response;
          }
          else{
            this.msg="no records found"
          }
        },
        (error)=>{
          this.msg=error;
        }
      )  
  }
ons1click(id:string){
  var yes=confirm("Are You sure  to Delete the Record of the User ");
  // prompt("thankyoi");For inputting strings
  if(yes){
    this.myhttp.delete("http://localhost:3000/api/delmemb?id="+id,{responseType:'text'}).subscribe(
      (res)=>
      {
        alert(res);
        this.fetchmembers();
      },
      (error)=>{
        alert(error);
      }
    )
    
  }
 
}
}
