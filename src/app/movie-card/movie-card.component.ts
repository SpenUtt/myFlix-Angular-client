import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
/**
  * This variables will receive and keep info from API calls bellow
  * @movies - keeps array of JSON objects (all movie avaliable in database)
  * @favorites - keeps array of favorite movies of specific user
  */
  movies: any[] = [];
  favorites: any[] = [];

  /**
    * @constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
    * @param fetchApiData to use functions to make API call
    * @param dialog to call dialog with Genre, Director or Synopsis details
    * @param snackBar to show the message, that function succeded or throw error
    */ 
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
    * This function calls specified methods automatically straight after Component was mounted
    * @function getMovies is called straight after component was mounted
    * @function getFavorites is called straight after component was mounted
    */

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
    * This function makes API call to get the full list of movies
    * @function getMovies
    * @returns array of JSON objects of all movies
    */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        return this.movies;
      });
    }

  /**
    * This function makes API call to get favorite movies of specific user
    * @function getFavorites
    * @returns array with movies id, which are included to the list of favorites
    */

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
    * This function checks if movie is included to the list of favorites for specific user
    * @function isFavorite
    * @param id type of string - id of specific movie
    * @returns type of booleans (true or false)
    */

  // check if a movie is a user's favorite
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
    * This function makes API call to add the movie to the list of favorite for specific user
    * @function addToFavorites
    * @param id type of string - id of specific movie
    */

  // add a movie to a user's favorites
  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
    * This function makes API call to delete the movie from the list of favorite for specific user
    * @function removeFromFavorites
    * @param id type of string - id of specific movie
    */

  // Removes a movie from a user's favorites
  removeFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
    * This function opens dialog with detailed information about specific Genre
    * @param name of specific Genre (comes from specific movie card)
    * @param description of specific Genre (comes from specific movie card)
    */

  // Open genre information from GenreComponent
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  /**
    * This function opens dialog with detailed information about specific Director
    * @param name of specific Director (comes from specific movie card)
    * @param bio of specific Director (comes from specific movie card)
    * @param birthday of specific Director (comes from specific movie card)
    */

  // Open director information from DirectorComponent
  openDirector(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
      },
      width: '400px',
    });
  }

  /**
    * This function opens dialog with detailed information about specific Movie
    * @param title of specific Movie (comes from specific movie card)
    * @param description of specific Movie (comes from specific movie card)
    */

  // Open movie details from MovieDetailsComponent
  openSummary(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '400px',
    });
  }
}