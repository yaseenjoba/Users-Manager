import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class UsreServiceService {
  user:any
  constructor(private db:AngularFirestore) {
  }
  getUsers(){
    return this.db.collection('/users').snapshotChanges();
  }
  addUser(user:any){
    return this.db.collection('/users').add(user);
  }
  removeUser(userId:any){
    return this.db.doc('/users/'+userId).delete();
  }
  send(user:any){
    this.user = user;
  }
  receive(){
    return this.user;
  }
  update(userId:any,user:any){
    return this.db.doc('/users/'+userId).update(user);
  }
}
