import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  allcat: any[]=[];
  msg: string;
  

  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
    this.fetchallcat();

  }
  fetchallcat()
  {
    this.myhttp.get("http://localhost:3000/api/getcat",{responseType:"json"}).subscribe(
      (response:[])=>
      {
        if(response.length>0)
        {
          let l=0;
          if(response.length>5)
            l=5;
          else 
            l=response.length;
          for(let i=0;i<l;i++)
              this.allcat.push(response[i]);
        }
        else
        {
        }

      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }

}
