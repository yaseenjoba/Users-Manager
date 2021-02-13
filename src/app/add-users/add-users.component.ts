import { UsreServiceService } from './../usre-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage  } from '@angular/fire/storage';   //   import <<<<

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']

})
export class AddUsersComponent implements OnInit {
  usersCollection:any;
  users:any;
  constructor(private userService:UsreServiceService,private router:Router,private fireStorage: AngularFireStorage) {


    //`console.log(this.users);
  }
  form=new FormGroup({
    name:new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(4)]),
    email:new FormControl(null,[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),Validators.minLength(4)]),
    photo:new FormControl(null,Validators.required),
    role:new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(3)]),
    status:new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(3)])

  });

  ngOnInit() {
  }
  basePath = '/images';
  downloadableURL = '';
  task: any;
  progress:any;
  async selectFile(event:any){
    const file = event.target.files[0];
   if (file) {
      const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task =  this.fireStorage.upload(filePath, file);    // upload task
      this.progress = this.task.percentageChanges();
      (await this.task).ref.getDownloadURL().then((url:any) => {this.downloadableURL = url; console.log(url)});
    } else {
      alert('No images selected');
      this.downloadableURL = '';
    }

  }

  addUser(){
    let date = new Date();
      let user = {
        name:this.form.get('name')?.value,
        email:this.form.get('email')?.value,
        photo:this.downloadableURL,
        role:this.form.get('role')?.value,
        status:this.form.get('status')?.value,
        creationDate: (date.getDate())+" - "+ (date.getMonth()+1)+" - "+date.getFullYear()
      }
      this.userService.addUser(user);
      this.router.navigate(['users']);
  }


}
