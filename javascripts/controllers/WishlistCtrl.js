"use strict";

app.controller("WishlistCtrl", function($location, $rootScope, $scope, MovieService){
    
    const getMovies = () => {
        MovieService.getWishlistMovies($rootScope.uid).then((results) => {
            $scope.movies = results;
        }).catch((err) => {
            console.log("error in getWishlistMovies");
            });
    };

    MovieService.getWishlistMovies($rootScope.uid).then((results) => {
        $scope.movies = results;
    }).catch((err) => {
        console.log("error in getRatedMovies");
    });

    $scope.deleteMovie = (movieId) => {
        MovieService.deleteMovie(movieId).then((result) => {
            getMovies();
        }).catch((err) => {
            console.log("error in deleteMovie", err);
        });
    };

    $scope.switchWatched = (movie) => {
        movie.isWatched = true;
        let updateMovie = MovieService.createMovieObject(movie);
        MovieService.updateMovie(updateMovie, movie.id).then((result) => {
            getMovies();
    }).catch((err) => {
        console.log("error in updateMovie", err);
    });
    };

    $scope.movieDetail = (movieId) => {
        console.log("movieId", movieId);
        $location.path(`/movie/${movieId}`);
    };

});