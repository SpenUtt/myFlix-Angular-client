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
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // user logs in with username and password, credentials are authenticated
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }
  
  // get a JSON object of ALL movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

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

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

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