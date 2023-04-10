# MyFlixAngularClient

The client-side for an application called myFlix based on its existing server-side code (REST API and database), with supporting documentation.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Deployed App link 

https://spenutt.github.io/myFlix-Angular-client/welcome

## User Stories

As a user, I want to:
* Receive information on movies, directors, and genres to learn more about movies I’ve watched or am interested in.
* Create a profile so I can save my favorite movies.
* Update or delete my profile information.

Based on detailed user stories the following user flows and kanband project management tools were created: 

* [=> User Flow (see images section)](#images).
* [=> Kanaban task desk](https://trello.com/b/9bjHXr78/cf-achievement-6).

## Key Features

* App displays a welcome view where users can either log in or register an account.
* Once authenticated, the user sees the main "all-movies" view, filter buttons and a personalized navbar.
* Navbar allows access to profile area view and logout options via a dropdown menu.
* User can filter movies by favorites.
* The individual movie cards container additional features:
    * A button that opens a dialog,​ where details about the director of that particular movie will be displayed.
    * A button that opens a dialog,​ where details about that particular genre of the movie will be displayed.
    * A button that opens a dialog,​ where details about plot synopsis of the movie will be displayed.
    * A button that allows user add/delete movie to/from favorite list.
* App is fully responsive for use on laptop, tablet or mobile.


## Tech Specs

* Angular 
* Angular Material 
* Node.js
* TypeDoc 
* Github Pages

## Images

### User Flow 
![Welcome to myFlix](/images/userFlow.jpg)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
