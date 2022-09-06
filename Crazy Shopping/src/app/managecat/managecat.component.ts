import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-managecat',
  templateUrl: './managecat.component.html',
  styleUrls: ['./managecat.component.css']
})
export class ManagecatComponent implements OnInit {
myfile:File;
cname:string;
cat:any[];
msg:string;
fsize=1;
ftype:string="s";
  catid: string;
  visible:boolean=true;
  picname: any;
  constructor(private myhttp:HttpClient,private router:Router) { }
  
  ngOnInit() {
    // this.router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd)
    // ).subscribe(() => {
      
    // });
    this.fetchcat();
  }

  ondelete(id){
    var yes=confirm("Are You sure  to Delete the Categories all products belonging to this category will automatically deleted ");
   if(yes){
    this.myhttp.delete("http://localhost:3000/api/delcat?id="+id,{responseType:'text'}).subscribe(
      (res)=>
      {
      },
      (error)=>{
        alert(error);
      }
    )
    this.myhttp.delete("http://localhost:3000/api/delsubcat?id="+id,{responseType:'text'}).subscribe(
      (res)=>
      {
      },
      (error)=>{
        alert(error);
      }
    )
    this.myhttp.delete("http://localhost:3000/api/delprod?id="+id,{responseType:'text'}).subscribe(
      (res)=>
      {
        alert(res);
        this.fetchcat();
        this.msg="succesfully deleted"
      },
      (error)=>{
        alert(error);
      }
    )
  }
}
  fetchcat(){
    this.myhttp.get("http://localhost:3000/api/getcat",{responseType:"json"}).subscribe(
      (response:any[])=>{
        this.cat=response;
        // this.catid=this.cat[0]["catid"];
      },
      (error)=>{
        this.msg=error;
      }
    )
  }
  fileselect(event){
    this.myfile=event.target.files[0];
  }
  onupdatetodb(){
      this.visible=true;
      var mydata =new FormData();
      mydata.append("catid",this.catid);

      if(this.myfile!=null){
        this.fsize=this.myfile.size;
        this.ftype=this.myfile.type;
        mydata.append("oldname",this.picname);
        mydata.append("photo",this.myfile);
        mydata.append("catname",this.cname);
      }
      else{
        mydata.append("catname",this.cname);
        mydata.append("oldname",this.picname);
      }
      this.myhttp.put("http://localhost:3000/api/updatecat",mydata,{responseType:"text"}).subscribe(
             (response)=>{
          this.msg=response;
          this.fetchcat();
        },
        (error)=>{
          this.msg=error;
        }
      )
    }
  
  
  onupdateclick(pic,cname,cid){
    this.picname=pic;
    this.cname=cname;
    this.catid=cid;
    this.visible=false;
  //   this.myhttp.get("http://localhost:3000/api/getcat1?catid="+cid ,{responseType:"json"}).subscribe(
  //   (response:any[])=>{
  //     this.cname=response[0]["catname"];
  //     this.picname=response[0]["catpic"];
  //   },
  //   (error)=>{
  //     this.msg=error;
  //   }
  // )

  }
  
  onaddcat(){
    this.fetchcat();
    var mydata =new FormData();
    if(this.myfile!=null){
      this.fsize=this.myfile.size;
      this.ftype=this.myfile.type;
      mydata.append("photo",this.myfile);
      mydata.append("catname",this.cname);
    }
    else{
      mydata.append("catname",this.cname);
    }

    this.myhttp.post("http://localhost:3000/api/addcat",mydata,{responseType:"text"}).subscribe(
           (response)=>{
 
        this.msg=response;
      },
      (error)=>{
        this.msg=error;
      }
    )
  }


}
