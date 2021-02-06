import { EditUsersComponent } from './edit-users/edit-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{path:"edit",component:EditUsersComponent},{path:"home",component:HomeComponent},{path:"",component:HomeComponent},{path:"users",component:UsersComponent},{path:"add",component:AddUsersComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
