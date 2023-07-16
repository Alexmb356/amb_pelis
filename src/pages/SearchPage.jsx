import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CardMovie } from '../componentes/CardMovie';
import {MovieContext } from '../context/MovieContext';



export const SearchPage = () => {

  //const [filteredMovie, setfilteredMovies] = useState
  const location = useLocation();
  const { globalMovies } = useContext(MovieContext);
  
  console.log(location)
 
  console.log("global",globalMovies);
 

  


  return (
    <div className='container'>
			
			<div className='card-list-Movie container'>
				{globalMovies.map(movie => (
					<CardMovie movie={movie} key={movie.id} />
				))}
			</div>
		</div>
  )
}
