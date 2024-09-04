import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useLayoutEffect, useState } from 'react';

import MyNavbar from './components/MyNavbar';
import AlertName from './components/AlertName';
import MovieList from './components/MovieList';
import Footer from './components/Footer';

import useLocalStorage from './myHooks/useLocalStorage';

import './style/index.scss';

function App() 
{
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favouriteMovies, setFavouriteMovies] = useLocalStorage('FAVMOVIES', []);
  const [name, setName] = useLocalStorage('NAME', '');
  const [showInfo, setShowInfo] = useLocalStorage('INFO', true);

  useLayoutEffect(() => { 
    name === '' && setFavouriteMovies([]) 
  }, []);

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
