"use strict";

app.controller("MovieDetailCtrl", function($scope, $routeParams, MovieService ){
    $scope.movie = {};

    console.log("MovieId", $routeParams.id);

    MovieService.getSingleMovie($routeParams.id).then((results) => {
        $scope.movie = results.data;
    }).catch((err) => {
        console.log("error in getSingleMovie", err);
    });
    
    const getMovie = () => {
        MovieService.getSingleMovie($routeParams.id).then((results) => {
            $scope.movie = results.data;
        }).catch((err) => {
            console.log("error in getRatedMovies");
            });
    };

    $scope.switchWatched = (movie) => {
        movie.isWatched = true;
        let updateMovie = MovieService.createMovieObject(movie);
        MovieService.updateMovie(updateMovie, $routeParams.id).then((result) => {
            getMovie();
    }).catch((err) => {
        console.log("error in updateMovie", err);
    });
    };

    $scope.starChange = ($event, movie) => {
        if ($event.rating){
            movie.rating = $event.rating;
            let updateMovie = MovieService.createMovieObject(movie);
            MovieService.updateMovie(updateMovie, $routeParams.id).then(() => {
                getMovie();
            }).catch((err) => {
                console.log("error in updateMovie", err);
            });
        }
    };

});