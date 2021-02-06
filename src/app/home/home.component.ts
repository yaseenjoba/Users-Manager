import { UsreServiceService } from './../usre-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newUsers:any=[];
  users:any;
  constructor(private router:Router,private userService:UsreServiceService) { }

  ngOnInit(): void {
  }
  goAdd(){
    this.router.navigate(["add"]);
  }
  is=false;
  search(value:any){
    console.log(value);
    this.userService.getUsers().subscribe((data:any) =>{
      this.users=data.map((e:any)=>{
        return{
          id:e.payload.doc.id,
          name:e.payload.doc.data()['name'],
          email:e.payload.doc.data()['email'],
          photo:e.payload.doc.data()['photo'],
          role:e.payload.doc.data()['role'],
          status:e.payload.doc.data()['status'],
          creationDate: e.payload.doc.data()['creationDate']
        }
      });
      for(let i=0;i<this.users.length;i++){
        if(this.users[i].name===value ||this.users[i].email===value ||this.users[i].photo===value||this.users[i].role===value||this.users[i].status===value){
          this.newUsers.push(this.users[i]);
        }
      }
      this.is=true;
    });

  }
}
