import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { 
  HttpClient, 
  HttpHeaders, 
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://api-mymovieapp.onrender.com';

/** to tell Angular that this service will be available everywhere (hence the root)
  * If the @Injectable decorator is missing
  * and you try to import the service to other files/components, you will receive the error 
  */

@Injectable({
  providedIn: 'root'
})

/**
  * This @service is responsible for defining methods to make API calls to backend endpoints
  */

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  /** Conctructor makes HttpClient available via this.http inside the class
    * @param http HttpClient
    */
  }
  
  /**
    * This function makes an API call to user registration endpoind on back end
    * @function userRegistration
    * @service POST to the API endpoint `/users`
    * @param userDetails Username (required), Password (required), Email (required), Birthday
    * @returns A JSON object holding data about the added user
    * @public can be used in all components of the app
    */

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private loggedInStatus = false;
  setloggedInStatus(token: any) {
    if (token) {
      this.loggedInStatus = true;
    }
    if (!token) {
      this.loggedInStatus = false;
    }

    return this.loggedInStatus;
  }

  /**
    * This function makes an API call to user login endpoind on back end
    * @function userLogin
    * @service POST to the API endpoint /login?Username={Username}&Password={Password}
    * @param userDetails Username, Password
    * @returns A JSON object holding data about the logged user with token
    */

  // user logs in with username and password, credentials are authenticated
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
    * This function makes an API call to get full list of movies from database
    * @function getAllMovies
    * @service GET to the API endpoint /movies
    * @returns an array with all movies in JSON format or error
    * @token should be extracted from local storage (User should be logged in)
    */
  
  // get a JSON object of ALL movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * This function makes an API call to get the single movie by its title
  * @function getMovie
  * @servise GET to the API endpoint
  * @param title movie title to be added to apiUrl /movies/{Title}
  * @returns A JSON object holding data about the single movie
  * @token should be extracted from local storage (User should be logged in)
  */

  // get a JSON object of a single movie
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * This function makes an API call to get the info about specific Director
    * @function getDirector
    * @servise GET to the API endpoint /movies/directors/{directorName}
    * @param directorName to be added to apiUrl
    * @returns A JSON object holding data about the specific Director
    * @token should be extracted from local storage (User should be logged in)
    */

   // get a JSON object of a movie-director by name
   getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/director/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * This function makes an API call to get the info about specific Genre
    * @function getGenre
    * @servise GET to the API endpoint /movies/genre/{genreName}
    * @param genreName to be added to apiUrl
    * @returns A JSON object holding data about the specific Genre
    * @token should be extracted from local storage (User should be logged in)
    */

  // get the description of a genre
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * This function makes an API call to get the info about specific User
    * @function getUser
    * @servise GET to the API endpoint /users/{Username}
    * @returns A JSON object holding data about the specific User
    * @token should be extracted from local storage (User should be logged in)
    * @username should be extracted from local storage (User should be logged in)
    */

  // get a JSON object of one user by username
  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * This function makes an API call to get the list of favorite movies for specific User
    * @function getFavoriteMovies
    * @servise GET to the API endpoint /users/{Username}
    * @returns an array with id of all favorite movies in JSON format or error
    * @token should be extracted from local storage (User should be logged in)
    * @username should be extracted from local storage (User should be logged in)
    */

  // get an array of a user's favorite movies by username
  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
    * This function makes an API call to add specific movie to the user's favorits list
    * @function addFavoriteMovie
    * @servise POST to the API endpoint /users/{Username}/movies/{movieId}
    * @param movieId to be added to apiUrl
    * @returns A JSON object holding data about the specific User
    * @token should be extracted from local storage (User should be logged in)
    * @username should be extracted from local storage (User should be logged in)
    */

   // Adds a movie to a user's list of favorite movies
   addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .post(
        `${apiUrl}/users/${username}/movies/${movieId}`,
        { FavoriteMovie: movieId },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * This function makes an API call to update existing user data
    * @function editUser
    * @servise PUT to the API endpoint /users/{Username}
    * @param updatedUserInfo Username, Password, Email, Birthday
    * @returns A JSON object holding data about the specific User
    * @token should be extracted from local storage (User should be logged in)
    * @username should be extracted from local storage (User should be logged in)
    */

  // Updates the information of a user by username
  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}/users/${username}`, updatedUser, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * This function makes an API call to delete user data from database
    * @function deleteUser
    * @servise DELETE to the API endpoint /users/{Username}
    * @returns  A messege that user was deleted
    * @token should be extracted from local storage (User should be logged in)
    * @username should be extracted from local storage (User should be logged in)
    */

  // Deletes an existing user from the database by user username
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /** This function makes an API call to delete specific movie from the user's favorits list
    * @function removeFavoriteMovie
    * @servise DELETE to the API endpoint /users/{Username}/movies/{movieId}
    * @param movieId to be added to apiUrl
    * @returns A JSON object holding data about the specific User
    * @token should be extracted from local storage (User should be logged in)
    * @username should be extracted from local storage (User should be logged in)
    */

  // Removes a movie from a user's list of favorite movies
  removeFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * This function extracts Non-typed response data from API calls to be used in return of methods in this class
    * @param res from API call
    * @returns body of response or JSON object
    */
  
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  
  /**
    * This function handls errors from API calls
    * @param error from API call if appeared
    * @returns message "Something bad happened; please try again later."
    */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}