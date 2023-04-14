import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
  /**
    * @constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
    * @param router to navigate the user to welcome MovieCard after logging in
    */
  constructor(public router: Router) {}

  /**
    * This function calls specified methods automatically straight after Component was mounted
    */
  ngOnInit(): void {}

  /**
    * This function navigates to movies list, URL ends with 'movies'
    * @function toMovies
    */
  // Navigates to movies page
  toMovies(): void {
    this.router.navigate(['movies']);
  }
  
  /**
    * This function navigates to user profile page, URL ends with 'profile'
    * @function toProfile
    */

  // Navigates to user profile
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
    * This function navigates to welcome page, URL ends with 'welcome'
    * @function logout
    */

  // logs out user, clears token and username from local storage
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}