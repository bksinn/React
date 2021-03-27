import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { countMovies } from '../services/fakeMovieService';
import { deleteMovie } from '../services/fakeMovieService';
import { likeMovie } from '../services/fakeMovieService';
import './movies.css';
import Pagination from './pagination';
import { paginate} from '../utils/paginate';
import Filter from './filtering';
import { genres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movie extends Component {
    state = {
        movies: getMovies(),
        moviesCount: countMovies(),
        currentPage: 1,
        pageSize: 4,
        movieGenres: genres,
        currentGenre: null,
        sortColumn: {path: 'title', order: 'asc'}
    }

    componentDidMount() {
        //const genres = [{name: "All Genres"}, ...getGenres()];

        //this.setState({ movies: getMovies(), genres });
    }

    handleDelete = (movieId) => {
        deleteMovie(movieId);
        this.setState({
            movies: getMovies(),
            moviesCount: countMovies()
        })
    }

    handleLike = (movieId) => {
        likeMovie(movieId);
        this.setState({
            movies: getMovies(),
            moviesCount: countMovies()
        })
    }

    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        })
    }

    handleGenreChange = (genre) => {
        let filteredMovies;
        let clickedGenre;

        if (genre) {
            filteredMovies = getMovies().filter(movie => movie.genre._id === genre._id);
            clickedGenre = genre.name;
        }
        else {
            filteredMovies = getMovies();
            clickedGenre = null;
        }

        this.setState({
            movies: filteredMovies,
            currentGenre: clickedGenre
        })
    }

    handleSort = sortColumn => {
       this.setState({sortColumn});
    }

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies, movieGenres, currentGenre, sortColumn } = this.state;

        const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);

        if (this.state.moviesCount === 0 ) return <p>No movies here!</p>

        const paginatedMovies = paginate(sorted, currentPage, pageSize);
        return (
            <div className="main">
                <p>Showing {this.state.moviesCount} in the database</p>
                <Filter 
                    movieGenres={movieGenres} 
                    currentGenre={currentGenre}
                    onGenreChange={this.handleGenreChange}
                />
                <MoviesTable 
                    paginatedMovies={paginatedMovies} 
                    sortColumn={sortColumn}
                    onDelete={this.handleDelete} 
                    onLike={this.handleLike} 
                    onSort={this.handleSort}
                />
                <Pagination 
                    itemCount={count} 
                    pageSize={pageSize} 
                    onPageChange={this.handlePageChange}
                    currentPage={currentPage}
                />
            </div>
        );
    }
}

export default Movie;