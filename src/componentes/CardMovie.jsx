import React from 'react';
import { URL_IMAGE } from './API/apiconf';
import { Link } from 'react-router-dom';


export const CardMovie = ({movie}) => {
  return (
    <Link to={`/movie/${movie.id}`} className='card-movie text-decoration-none' >
			  <div className='card-img'>
				<img
					src={`${URL_IMAGE + movie.poster_path}`}
					alt={`Movie ${movie.title}`}
          
				/>
			</div>
			<br/>
			<div className='card-info'>
				<span className='Movie-id text-white '>Popularidad {movie.popularity}</span>
				<h4 className='card-title text-white'>{movie.title}</h4>
				<div className='card-types'>
					{/*{movie.genre_ids.map(type => (
						<span key={type.type.name} className={type.type.name}>
							{type.type.name}
						</span>
          ))}*/}
				</div>
			</div>
    </Link>
  )
};
