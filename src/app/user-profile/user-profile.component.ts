import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  /**
    * This variables will receive and keep info from API calls bellow
    * @user - keeps info about specific user
    * @movies - keeps array of JSON objects (all movie avaliable in database)
    * @favorites - keeps array of favorite movies of specific user
    */

  user: any = {};
  movies: any[] = [];
  initialInput: any = {};
  favorites: any = [];

  /**
    * The updatedUser object will then be passed into the API call in the registerUser function.
    * @userData object contains: @Username (required), @Password (required), @Email (required), @Birthday (optional)
    */

  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
    * Constructor arguments then will be avaliable through "this" method
    * @param fetchApiData to use functions to make API call
    * @param dialogRef: to refer to user profile component
    * @param router to navigate the user to welcome screen after deleting account
    * @param snackBar to show the message, that user has successfuly loged in
    */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
    * This function calls specified methods automatically straight after Component was mounted
    */

  ngOnInit(): void {
    this.getUserInfo();
  }
  
  /**
    * This function makes an API call to get User info from database
    * @function getUserInfo
    * @returns JSON object with user information
    */
  
  // Fetch user data via API
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      // this.user.Birthday comes in as ISOString format, like so: "2011-10-05T14:48:00.000Z"
      this.updatedUser.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
      this.favorites = this.user.FavoriteMovies;
      return this.user;
    });
  }

  /**
    * This function makes an API call to update user data, such as username, password, email, or birthday
    * @function updateUserInfo
    */

  // Update user data, such as username, password, email, or birthday
  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      if (this.user.Username !== result.Username || this.user.Password !== result.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Credentials updated! Please login using your new credentials',
          'OK',
          {
            duration: 2000,
          }
        );
      }
      else {
        this.snackBar.open(
          'User information has been updated!',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    });
  }

  /**
    * This function makes an API call to delete user data for the user that is logged in, redirects user to the welcome view
    * @function deleteAccount
    */

  // Delete user data for the user that is logged in
  deleteAccount(): void {
    if (confirm('All your data will be lost - this cannnot be undone!')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account - we are sorry to see you go!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
