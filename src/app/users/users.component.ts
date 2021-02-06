import { Router } from '@angular/router';
import { UsreServiceService } from './../usre-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any=[];
  i=0;
  constructor(private userService:UsreServiceService,private router:Router) {

  }
  ngOnInit(): void {
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
  removeUser(value:any){
   this.userService.removeUser(value);
  }
  edit(user:any){
    this.userService.send(user);
    this.router.navigate(['edit'])
  }
}

