import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { getLocaleDayNames } from '@angular/common';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  constructor(private db:AngularFireDatabase) { }
  form=new FormGroup({
    name:new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(4)]),
    email:new FormControl(null,[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),Validators.minLength(4)]),
    photo:new FormControl(null,Validators.required),
    role:new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(10),Validators.maxLength(11)]),
    status:new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(10),Validators.maxLength(11)])

  });
  url:any;
  ngOnInit(): void {

  }
  selectFile(event:any){
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.url = reader.result;
		}


  }
  addUser(){
    let date = new Date();
      let user = {
        name:this.form.get('name')?.value,
        email:this.form.get('email')?.value,
        photo:this.url,
        role:this.form.get('role')?.value,
        status:this.form.get('status')?.value,
        creationDate: date.getDay()+" - "+ date.getMonth()+" - "+date.getFullYear()
      }
      this.db.database.ref("/users").push(user);
  }


}
