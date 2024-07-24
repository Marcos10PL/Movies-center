import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useLayoutEffect, useState } from 'react';

import MyNavbar from './components/MyNavbar';
import AlertName from './components/AlertName';
import MovieList from './components/MovieList';

import './style/custom.scss'
import './style/index.scss';
import Footer from './components/Footer';

function App() 
{
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [name, setName] = useState();
  const [showInfo, setShowInfo] = useState(true);

  useLayoutEffect(() => 
  {
    if(!name)
    {
      const nameLS = localStorage.getItem('NAME');
      nameLS && setName(nameLS);
    }

    if(showInfo)
    {
      const infoLS = localStorage.getItem('INFO');
      infoLS && setShowInfo(false);
    }

    if(name)
    {
      const favMoviesJSON = JSON.stringify(favouriteMovies);
      localStorage.setItem('MOVIES', favMoviesJSON);
    }

    const favMovies = localStorage.getItem('MOVIES');
    if(favMovies)
    {
      const favMoviesArray = JSON.parse(favMovies);
      setFavouriteMovies(favMoviesArray);
    }

  }, [favouriteMovies.length, name])


  useEffect(() => 
  {
    const fetchMovies = async () => 
    {
      try 
      {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3f458fb`;
        const response = await fetch(url);
        const responseJSON = await response.json();

        if(responseJSON.Response === 'False')
          throw new Error('No results')
        
        if (responseJSON.Search)
        {
          const favouriteIDs = new Set(favouriteMovies.map(fm => fm.imdbID));
          const updatedMovies = responseJSON.Search.map(movie => 
          ({
            ...movie,
            fav: favouriteIDs.has(movie.imdbID) 
          }));

          setMovies(updatedMovies);
        }
        else
          throw new Error('Network error');
      } 
      catch (error) 
      {
        //console.log(error);
      }
    }

    fetchMovies();

  }, [searchValue]);

  const handleFavouriteMovies = (movie) =>
  {
    let newList = [];
    movie.fav = !movie.fav;

    if(movie.fav)
      newList = [...favouriteMovies, {...movie, fav: true}];
    else
    {
      const newMoviesList = movies.map(m => 
      {
        if(m.imdbID === movie.imdbID)
          return {...m, fav: false};
        return m;
      })
      setMovies(newMoviesList)

      newList = favouriteMovies.filter(m => m.imdbID !== movie.imdbID);
    }
    setFavouriteMovies(newList);
  }

  return (
    <>
      <MyNavbar 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <AlertName
        name={name}
        setName={setName}
      />
      <MovieList 
        movies={movies}
        handleFavouriteMovies={handleFavouriteMovies}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      />
      <MovieList 
        header='Favourites' 
        movies={favouriteMovies}
        handleFavouriteMovies={handleFavouriteMovies}
      />
      <Footer />
    </>
  )
}

export default App
