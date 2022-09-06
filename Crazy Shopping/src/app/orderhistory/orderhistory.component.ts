import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  orders: any[];
  msg: string;
  utype: string;
  visible:boolean=false;
  newstatus: any[]=[""];n
  constructor(private myhttp: HttpClient) { }

  ngOnInit() {
    this.utype=sessionStorage.getItem("utype");
    if(this.utype=="normal")
      this.fetchorders();
    else if(this.utype=="admin")
      this.fetchallorders();
  }
 
  updatestatus(id,i) {
    let vals={newstatus:this.newstatus[i],id:id};
    this.myhttp.put("http://localhost:3000/api/updateStatus", vals, {responseType:"text"}).subscribe(
      (response)=>
      {
        if(this.utype=="normal")
        this.fetchorders();
      else if(this.utype=="admin")
        this.fetchallorders();
          this.msg=response;
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  fetchallorders(){
    this.visible=true;
    this.myhttp.get("http://localhost:3000/api/getallorders",{responseType:"json"}).subscribe(
      (response:any[])=>{
        if(response.length>0){
          this.orders=response;
          for(let i=0;i<response.length;i++){
            this.newstatus[i]="";
          }
          // for(let i =0; i != this.orders.length; i++) {
          //   this.status.push(this.orders[i].status);
          // }
        }
        else{
          this.msg="No Orders found";
        }

      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  fetchorders()
  {
    this.visible=false;
    this.myhttp.get("http://localhost:3000/api/getOrdersByUser?uname=" + sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
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

