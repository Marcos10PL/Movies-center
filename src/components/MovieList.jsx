import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

import Movie from "./Movie";

function MovieList({ movies, header, handleFavouriteMovies, showInfo, setShowInfo })
{
  const carouselRef = useRef();
  const [showButtons, setShowButtons] = useState(false);
  
  const scroll = x => 
    carouselRef.current.scrollBy({ left: (x * 300), behavior: 'smooth' });

  useEffect(() => 
  {
    if (carouselRef.current) 
    {
      const { scrollWidth, clientWidth } = carouselRef.current;
      setShowButtons(scrollWidth > clientWidth);
    }
  }, [movies.length]);

  return(
      <Container className='p-0 m-0 m-auto'>
        {header && <div className='movie-list-header'> {header} </div>}

        {!movies.length ? (
            header ? (
              <Container className='movie-info'>
                The favourite movies will appear here
              </Container>
             ) : (
                showInfo && 
                <Container className='movie-info'>
                  The movies will appear here (by hovering or clicking on a video you can add or remove it from your favorites by clicking on the heart) <br />
                  <a 
                    href="#" 
                    className='link-secondary text-decoration-none' 
                    onClick={() => setShowInfo(false)}
                  >
                    [don't show again]
                  </a>
                </Container>
             )
        ) : (
        <Container fluid className="carousel" >
          <div className="carousel-wrapper" ref={carouselRef} >
            {movies.map((movie) => 
              <Movie key={movie.imdbID} 
                movie={movie}
                handleFavouriteMovies={handleFavouriteMovies}
              />
            )}
          </div>
          {showButtons &&
          <>
            <button className="carousel-button left" onClick={() => scroll(-1)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="carousel-button right" onClick={() => scroll(1)}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>}
        </Container>
        )}
      </Container>
  )
}

export default MovieList;