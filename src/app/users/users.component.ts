import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { debugPort } from 'process';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any=[];

  constructor(private db:AngularFireDatabase) {
   db.list("/users").valueChanges().subscribe(user=>{
     this.users=user;
    console.log(this.users);
   });

  }
  ngOnInit(): void {

  }
  removeUser(value:any){
    this.db.database.ref(`/users/${value}`).remove();
  }
  edit(){
    
  }
}
