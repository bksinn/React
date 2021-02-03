import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { countMovies } from '../services/fakeMovieService';
import { deleteMovie } from '../services/fakeMovieService';
import { likeMovie } from '../services/fakeMovieService';
import './movies.css';

class Movie extends Component {
    state = {
        movies: getMovies(),
        moviesCount: countMovies()
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

    render() {
        if (this.state.moviesCount === 0 ) return <p>No movies here!</p>
        
        return (
            <div className="main">
               <div className="table">
                <p>Showing {this.state.moviesCount} in the database</p>
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
                    {this.state.movies.map(movie => {
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
            </div>
        );
    }
}

export default Movie;