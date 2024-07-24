import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Image} from "react-bootstrap";

import noPoster from '../img/no-poster.png';
import '../style/carousel.scss';

function Movie({ movie, handleFavouriteMovies })
{
  return(
    <div className="carousel-slide">
      <Image 
        src={movie.Poster !== 'N/A' ? movie.Poster : noPoster} 
        alt="movie-poster"
      />
      <div 
        className="overlay title"
        style={{opacity: movie.Poster === 'N/A' && 1}}
      >
        {movie.Title}
      </div>
      <div className="overlay year">{movie.Year}</div>
      <div 
        className={`overlay button ${movie.fav ? 'active' : ''}`}
        onClick={() => handleFavouriteMovies(movie)}
      >
        <FontAwesomeIcon 
          icon={faHeart} 
          size="1x" 
          color={movie.fav ? 'red' : 'white'}
        />
      </div>
    </div>
  )
}

export default Movie;