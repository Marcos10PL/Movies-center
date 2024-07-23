import { Container} from "react-bootstrap";
import Movie from "./Movie";
import { useRef } from "react";

function MovieList({ movies })
{
  const carouselRef = useRef(null);

  const handleScroll = (e) => 
  {
    const scrollAmount = e.deltaY;
    carouselRef.current.scrollLeft += scrollAmount * 3;
  };

  return(
    <Container
      fluid 
      className="carousel" 
      ref={carouselRef} 
      onWheel={(e) => handleScroll(e)}
    >
        {movies.map((movie) => <Movie key={movie.imdbID} movie={movie}/>)}
    </Container>
  )
}

export default MovieList;