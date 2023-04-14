import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/** @Component decorator to tell Angular that the class right below is a component.*/ 

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  /**
    * The @loginData object will then be passed into the API call in the registerUser function.
    * @loginrData object contains: @Username (required), @Password (required)
    */

  @Input() userData = { Username: '', Password: '' };
  
  /**
    * @constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
    * @param FetchApiData to use functions to make API call  
    * @param dialogRef to call dialog with login inputs
    * @param snackBar to show the message, that user has successfuly loged in
    * @param router to navigate the user to welcome MovieCard after logging in
    */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
    * This function calls specified methods automatically straight after Component was mounted
    */

  ngOnInit(): void {}

  /**
    * This is the function responsible for sending the form inputs to the backend API to login user
    * @function registerUser
    * If success, set the localstorage with user and token
    * if fails, snakBar shows error message
    */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        let user = result.user.Username;
        let token = result.token;
        localStorage.setItem("user", user);
        localStorage.setItem("token", token);
        this.dialogRef.close(); // This will close the modal on success
        this.snackBar.open("User Login Successful", 'OK', {
          duration: 2000,
        });
        this.router.navigate(["movies"]);
      },
      (result) => {
        this.snackBar.open("User Login Failed", 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
