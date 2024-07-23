import { Image} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

import noPoster from '../img/no-poster.png';

import '../style/carousel.scss';

function Movie({ movie })
{
  const[color, setColor] = useState(false);

  return(
    <div className="movieSlide">
      <Image 
        src={movie.Poster !== 'N/A' ? movie.Poster : noPoster} 
        alt="movie-poster"
      />
      <div 
        className="overlay-title"
        style={{opacity: movie.Poster === 'N/A' && 1}}
      >
        {movie.Title}
      </div>
      <div className="overlay-year">{movie.Year}</div>
      <div 
        className={`overlay-button ${color ? 'active' : ''}`}
        onClick={() => setColor(!color)}
      >
        <FontAwesomeIcon 
          icon={faHeart} 
          size="1x" 
          color={color ? 'red' : 'white'}
        />
      </div>
    </div>
  )
}

export default Movie;