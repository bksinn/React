import React, { Component } from 'react';
class MoviesTable extends Component {
    raiseSort = (path) => {
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
       
        this.props.onSort(sortColumn);
    }
    render() { 
        const { paginatedMovies, onDelete, onLike } = this.props;

        return (
            <div className="table">
                <table className="">
                    <thead>
                    <tr>
                        <th onClick={() => this.raiseSort('title')}>Title</th>
                        <th onClick={() => this.raiseSort('genre.name')}>Genre</th>
                        <th onClick={() => this.raiseSort('numberInStock')}>Stock</th>
                        <th onClick={() => this.raiseSort('dailyRentalRate')}>Rate</th>
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
                                <button onClick={() => onLike(movie._id)} className="no-button-styles">
                                    <i className={movie.liked ? "fa fa-heart" : "fa fa-heart-o"} aria-hidden="true"></i>
                                </button>
                            </td>
                            <td key={movie._id}>
                                <button onClick={() => onDelete(movie._id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>)
                        })}
                    </tbody>
                </table>
            </div>
            
        );
    }
}

export default MoviesTable;