import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
 
  /**
    * The @userData object will then be passed into the API call in the registerUser function.
    * @userData object contains: @Username (required), @Password (required), @Email (required), @Birthday
    */

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
    * Constructor arguments then will be avaliable through "this" method
    * @param FetchApiData to use functions to make API call
    * @param dialogRef to call dialog with login inputs
    * @param snackBar to show the message, that user has successfuly loged in
    */
  
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }
  
   /**
    * This function calls specified methods automatically straight after Component was mounted
    */

  ngOnInit(): void {
  }

  /**
    * This is the function responsible for sending the form inputs to the backend API
    * @function registerUser
    */
   
  registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe(() => {
    // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      let welcomeString = 'Welcome, ' + this.userData.Username + '! You may now login to your account.';
      this.snackBar.open(welcomeString, 'OK', {
          duration: 2000
      });
      }, () => {
        this.snackBar.open("Something went wrong, please try again", 'OK', {
          duration: 2000
        });
      });
  }
}
