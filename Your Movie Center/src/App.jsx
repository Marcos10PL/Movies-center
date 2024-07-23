import 'bootstrap/dist/css/bootstrap.min.css';

import './style/custom.scss'
import './style/index.scss';

import { useEffect, useState } from 'react';

import MyNavbar from './components/MyNavbar';
import AlertName from './components/AlertName';
import MovieList from './components/MovieList';

function App() 
{
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

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
          return;

        if (responseJSON.Search)
          setMovies(responseJSON.Search);
        else
          throw new Error('Network error');
      } 
      catch (error) 
      {
        console.error(error);
      }
    }

    fetchMovies(); 
  }, [searchValue]);

  return (
    <>
      <AlertName />
      <MyNavbar 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <MovieList movies={movies}/>
    </>
  )
}

export default App
