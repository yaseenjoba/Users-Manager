import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goHome(){
    this.router.navigate(["home"]);
  }
  goUsers(){
    this.router.navigate(["users"]);

  }
  goAbout(){
    this.router.navigate(["about"]);

  }
}
