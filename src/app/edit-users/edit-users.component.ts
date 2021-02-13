import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { UsreServiceService } from './../usre-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  constructor( private userService:UsreServiceService, private router:Router,private fireStorage: AngularFireStorage) {
    this.user=this.userService.receive();
  }
  form=new FormGroup({
    name:new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(4)]),
    email:new FormControl(null,[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),Validators.minLength(4)]),
    photo:new FormControl(null,Validators.required),
    role:new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(5),]),
    status:new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(5)])

  });
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
  user:any;
  ngOnInit(): void {
    this.form.get('name')?.setValue(this.user.name);
    this.form.get('email')?.setValue(this.user.email);
    this.form.get('role')?.setValue(this.user.role);
    this.form.get('status')?.setValue(this.user.status);
    this.form.updateOn;
    this.downloadableURL=this.user.photo;
  }
  update(){
    let date = new Date();
    let user = {
      name:this.form.get('name')?.value,
      email:this.form.get('email')?.value,
      photo:this.downloadableURL,
      role:this.form.get('role')?.value,
      status:this.form.get('status')?.value,
      creationDate: this.user.creationDate
    }
    this.userService.update(this.user.id,user);
    this.router.navigate(['users']);
    
  }
}
