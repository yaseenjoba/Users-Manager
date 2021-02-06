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

  constructor( private userService:UsreServiceService, private router:Router) {
    this.user=this.userService.receive();
  }
  form=new FormGroup({
    name:new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(4)]),
    email:new FormControl(null,[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),Validators.minLength(4)]),
    photo:new FormControl(null,Validators.required),
    role:new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(5),]),
    status:new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(5)])

  });
  url:any;
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
  user:any;
  ngOnInit(): void {
    this.form.get('name')?.setValue(this.user.name);
    this.form.get('email')?.setValue(this.user.email);
    this.form.get('photo')?.setValue(this.user.photo);
    this.form.get('role')?.setValue(this.user.role);
    this.form.get('status')?.setValue(this.user.status);
    this.form.updateOn;
    this.url=this.user.photo;
  }
  update(){
    let date = new Date();
    let user = {
      name:this.form.get('name')?.value,
      email:this.form.get('email')?.value,
      photo:this.url,
      role:this.form.get('role')?.value,
      status:this.form.get('status')?.value,
      creationDate: date.getDay()+" - "+ (date.getMonth()+1)+" - "+date.getFullYear()
    }
    this.userService.update(this.user.id,user);
    this.router.navigate(['users']);
  }
}
