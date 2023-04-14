import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  /**
    * @constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
    * @param fetchApiData to use functions to make API call (service)
    * @param data specific movie data, received through @MAT_DIALOG_DATA from MovieCard
    */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) {}

  /**
    * This function calls specified methods automatically straight after Component was mounted
    */

  ngOnInit(): void {}
}
