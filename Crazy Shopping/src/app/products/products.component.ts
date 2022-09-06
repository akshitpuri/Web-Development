import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  myfile:File;
  msg:string;
  fsize;
  ftype:string;
  cat:any[];
  catid:string="";
  subcat:any[];
  subcatid:string="";
  price:number;
  stock:number;
  description:string;
  pname:string;
  discount:number;
  products: any[];
  picname:string;
  visible: boolean=true;
  pid: any;
  rating: any;
  review: any;
  constructor(private myhttp:HttpClient) { }
  ngOnInit() {
    this.fetchcatid();
    this.fetchproducts();
  }
  onupdateclick(x){
    this.fetchcatid();
    this.pid=x._id;
    this.picname=x.ppic;
    this.pname=x.pname;
    this.catid=x.catid;
    this.price=x.pprice;
    this.stock=x.pstock;
    this.discount=x.pdiscount;
    this.description=x.pdesc;
    this.visible=false;
    this.onchange();
    this.subcatid=x.subcatid;
  }
  onupdateproduct(){
    this.visible=true;
    var mydata =new FormData();
    mydata.append("pid",this.pid);
    if(this.myfile!=null){
      this.fsize=this.myfile.size;
      this.ftype=this.myfile.type;
      mydata.append("oldname",this.picname);
      mydata.append("photo",this.myfile);
    }
    mydata.append("oldname",this.picname);
    mydata.append("catid",this.catid);
    mydata.append("subcatid",this.subcatid);
    mydata.append("pname",this.pname);
    mydata.append("pprice",this.price.toString());
    mydata.append("pdesc",this.description);
    mydata.append("pstock",this.stock.toString());
    mydata.append("pdiscount",this.discount.toString());
    this.myhttp.put("http://localhost:3000/api/updateproducts",mydata,{responseType:"text"}).subscribe(
           (response)=>{
        this.msg=response;
        this.fetchproducts();
      },
      (error)=>{
        this.msg=error;
      }
    )
  }
  ondelete(id){
    var yes=confirm("Are You sure  to delete the Product ");
   if(yes){
    this.myhttp.delete("http://localhost:3000/api/deleteproduct?id="+id,{responseType:'text'}).subscribe(
      (res)=>
      {
        this.fetchproducts();
        this.msg="succesfully deleted";
      },
      (error)=>{
        alert(error);
      }
    )
  }
}
  fetchproducts(){
    this.myhttp.get("http://localhost:3000/api/getallproducts",{responseType:"json"}).subscribe(
      (response:any[])=>{
        this.products=response;
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
    // this.msg=this.catid;
      if(this.catid=="")this.msg="";
      if(this.catid=="")return;
      this.myhttp.get("http://localhost:3000/api/getsubcat?catid="+this.catid,{responseType:"json"}).subscribe(
      (response:any[])=>{
        this.subcat=response;
      },
      (error)=>{
        this.msg=error;
      }
    )

  }
  onaddproduct(){
    var mydata =new FormData();
    if(this.myfile!=null){
      this.fsize=this.myfile.size;
      this.ftype=this.myfile.type;
      mydata.append("photo",this.myfile); 
    }
    mydata.append("price",this.price.toString());
    mydata.append("stock",this.stock.toString());
    mydata.append("pname",this.pname);
    mydata.append("description",this.description);
    mydata.append("discount",this.discount.toString());
    mydata.append("subcatid",this.subcatid);
    mydata.append("catid",this.catid);
    mydata.append("selleruname",sessionStorage.getItem("uname"));
    this.myhttp.post("http://localhost:3000/api/addproduct",mydata,{responseType:"text"}).subscribe(
      (response)=>{
        this.msg=response;
        this.catid="";

      },
      (error)=>{
        this.msg=error;
      }
    )
   
  }
  

}
