import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})

/**
   *
   * @param fetchApiData to use functions to make API call
   * @param data specific Director data, received through @MAT_DIALOG_DATA from MovieCard
   */

export class DirectorComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
    }
  ) {}
/**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {}
}
