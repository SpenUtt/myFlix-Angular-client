import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';

/** @Component decorator to tell Angular that the class right below is a component.*/ 

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
    * Conctructor makes MatDialog available via this.dialog inside the class
    * @param dialog
    */

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {}

  /**
    * This is the function that will open the dialog when the signup button is clicked
    * @function openUserRegistrationDialog
    */

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
    * This is the function that will open the dialog when the Login button is clicked
    * @function openUserLoginDialog
    */

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
}
