import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { countMovies } from '../services/fakeMovieService';
import { deleteMovie } from '../services/fakeMovieService';
import { likeMovie } from '../services/fakeMovieService';
import './movies.css';
import Pagination from './pagination';
import {paginate} from '../utils/paginate';
import Filter from './filtering';
import {genres} from '../services/fakeGenreService';

class Movie extends Component {
    state = {
        movies: getMovies(),
        moviesCount: countMovies(),
        currentPage: 1,
        pageSize: 4,
        movieGenres: genres,
        currentGenre: null
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

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies, movieGenres, currentGenre } = this.state;

        if (this.state.moviesCount === 0 ) return <p>No movies here!</p>

        const paginatedMovies = paginate(movies, currentPage, pageSize);
        return (
            <div className="main">
                <p>Showing {this.state.moviesCount} in the database</p>
                <Filter 
                    movieGenres={movieGenres} 
                    currentGenre={currentGenre}
                    onGenreChange={this.handleGenreChange}
                />
                <div className="table">
                        <table className="">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedMovies.map(movie => {
                                return (
                                <tr key={movie._id}>
                                    <td key={movie.title}>{movie.title}</td>
                                    <td key={movie.genre.name}>{movie.genre.name}</td>
                                    <td key={movie.numberInStock}>{movie.numberInStock}</td>
                                    <td key={movie.dailyRentalRate}>{movie.dailyRentalRate}</td>
                                    <td>
                                        <button onClick={() => this.handleLike(movie._id)} className="no-button-styles">
                                            <i className={movie.liked ? "fa fa-heart" : "fa fa-heart-o"} aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td key={movie._id}>
                                        <button onClick={() => this.handleDelete(movie._id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
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