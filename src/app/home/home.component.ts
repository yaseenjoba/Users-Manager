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
  userForSearch='';
  showSearchStatus=false;
  constructor(private router:Router,private userService:UsreServiceService) {
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
    });
}

  ngOnInit(): void {
  }
  goAdd(){
    this.router.navigate(["add"]);
  }
  search(value:any){
    console.log(value);
  }
  showSearch(){
    this.showSearchStatus=!this.showSearchStatus;
    console.log(this.showSearchStatus);

  }
}
