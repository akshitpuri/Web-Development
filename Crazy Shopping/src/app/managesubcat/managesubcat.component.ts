import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-managesubcat',
  templateUrl: './managesubcat.component.html',
  styleUrls: ['./managesubcat.component.css']
})
export class ManagesubcatComponent implements OnInit {
  myfile:File;
  cname:string;
  msg:string;
  fsize;
  ftype:string;
  cat:any[];
  catid:string="";
  subcat: any[];
  picname: any;
  visible: boolean=true;
  subcatid: any;
  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
    this.fetchcatid();
  }
  onupdatetodb(){
    this.visible=true;
    var mydata =new FormData();

    if(this.myfile!=null){
      this.fsize=this.myfile.size;
      this.ftype=this.myfile.type;
      mydata.append("oldname",this.picname);
      mydata.append("photo",this.myfile);
    }
    else{
      mydata.append("oldname",this.picname);
    }
    mydata.append("subcatname",this.cname);
    mydata.append("catid",this.catid);
    mydata.append("subcatid",this.subcatid);


    this.myhttp.put("http://localhost:3000/api/updatesubcat",mydata,{responseType:"text"}).subscribe(
           (response)=>{
        this.msg=response;
        // this.fetchcat();
      },
      (error)=>{
        this.msg=error;
      }
    )
  }


onupdateclick(x){
  // {catid:String ,subcatname:String ,subcatpic:String
  this.picname=x.subcatpic;
  this.fetchcatid();
  this.catid=x.catid;
  this.cname=x.subcatname;
  this.visible=false;
  this.subcatid=x._id;
}
  fetchsubcat(){
    this.myhttp.get("http://localhost:3000/api/getsubcat?catid="+this.catid,{responseType:"json"}).subscribe(
      (response:any[])=>{
        this.subcat=response;
        // this.catid=this.cat[0]["catid"];
      },
      (error)=>{
        this.msg=error;
      }
    )
  }
  fetchcatid(){
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
  onchange(){
      if(this.cname=="")this.msg="";
      this.fetchsubcat();
  }
  onaddsubcat(){
    var mydata =new FormData();
    if(this.myfile!=null){
      this.fsize=this.myfile.size;
      this.ftype=this.myfile.type;
      mydata.append("photo",this.myfile);
      mydata.append("catid",this.catid);
      mydata.append("subcatname",this.cname);
    }
    else{
      mydata.append("catid",this.catid);
      mydata.append("subcatname",this.cname);
    }
    this.myhttp.post("http://localhost:3000/api/addsubcat",mydata,{responseType:"text"}).subscribe(
      (response)=>{
        this.msg=response;
        this.catid="";
        this.cname="";
        // this.myfile.slice();

      },
      (error)=>{
        this.msg=error;
      }
    )
  
  }
  ondelete(id){
    var yes=confirm("Are You sure  to Delete the Categories all products belonging to this category will automatically deleted ");
   if(yes){
   
    this.myhttp.delete("http://localhost:3000/api/delonlysubcat?id="+id,{responseType:'text'}).subscribe(
      (res)=>
      {
        this.msg="succesfully deleted"
      },
      (error)=>{
        alert(error);
      }
    )
    this.myhttp.delete("http://localhost:3000/api/delsubcatprod?id="+id,{responseType:'text'}).subscribe(
      (res)=>
      {
        this.fetchsubcat();
        this.msg="succesfully deleted"
      },
      (error)=>{
        alert(error);
      }
    )
  }
}


}
