import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import axios from "axios";
import { API_KEY, API_URL  } from "../componentes/API/apiconf";
import YouTube from 'react-youtube';
import { IMAGE_PATH } from '../componentes/API/apiconf';
import {Loader} from '../componentes/Loader'


export const MoviePage = () => {

  
  const [trailer, setTrailer]= useState ("null");
  const [movie, setMovie]= useState ({title:"Loading Movies"});
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState('');
  
  
  const {id} = useParams()

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
        language: "es-MX"
      },
      
    });

    
    const datag = data;
    
    if (datag.genres && data.genres.length > 0) {
      const firstGenre = data.genres[0].name;
      setGenre(firstGenre);
    }

    

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    //return data
    setMovie(data);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchMovie(id)
  }, [])

  return (
    <main className='main-container'>
      {loading ? (
				<Loader />
			) : ( <>
      {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}>
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    
                  </div>
                </div>
              )}
            </div>
            
          ) : null}
          <div className='container-movieoverview'>
          <h1 className="text-black">{movie.title}</h1>
          <h4 className="text-black">{genre}</h4>
          <p className="text-white">{movie.overview}</p>
          </div>
          </>)}
    </main>
  )
}
