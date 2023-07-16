import React, {useContext} from 'react'
import { MovieList } from '../componentes';

import { MovieContext } from '../context/MovieContext';

export const HomePage = () => {
  const {onClickLoadMore, onClickLess} = useContext(MovieContext)

  return (
    <>
      <MovieList/>
        <div className="container-btn-load-more">
                              
        <button className="btn-load-more p-14 m-10" variant="secondary" onClick={onClickLess}>Anterior</button>
        <button className="btn-load-more p-14 m-10" variant="secondary" onClick={onClickLoadMore} >Siguiente</button>
      </div>
        
    </>
    
  )
}
