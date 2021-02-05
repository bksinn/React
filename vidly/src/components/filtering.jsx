import React from 'react';
import './filtering.css';

const Filter = (props) => {
    const { movieGenres, onGenreChange, currentGenre } = props;

    return (
        <div className="genre-list">
            <ul className="list-group">
            <li onClick={() => {onGenreChange(null)}} className={currentGenre ? "list-group-item" : "list-group-item active"} aria-current="true">All</li>
                {movieGenres.map(genre => {
                    return (
                        <li 
                            onClick={() => {onGenreChange(genre)}} key={genre._id} 
                            className={currentGenre === genre.name ? "list-group-item active" : "list-group-item"} 
                            aria-current="true"
                        >
                            {genre.name}
                        </li>
                    );
                })}
            </ul>
            
        </div>
       
     );
}

export default Filter;