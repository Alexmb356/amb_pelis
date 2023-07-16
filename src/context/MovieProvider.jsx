import { useState, useEffect } from "react";
import {MovieContext} from "./MovieContext";
import { useForm } from '../hook/useForm';
import { API_URL, API_KEY } from "../componentes/API/apiconf";




export const MovieProvider = ({children}) => {
	
	const [page, setPage] = useState(1)
	const [allMovies, setAllMovies] = useState([])
	const [globalMovies, setGlobalMovies] = useState([]);
	
	
	

	// Estados para la aplicación simples
	const [loading, setLoading] = useState(true);
	const [active, setActive] = useState(false);
	

	// Utilizar CustomHook - useForm
	const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});
  

	//Botones para pasar la pagina
    const onClickLess = (e)=>{
		
			if (page > 1) {
			  setPage(page - 1);
			  
			}
	};
  	
  
	const onClickLoadMore = () => {
		
		setPage(page + 1);
		//getAllMovies(page)
		console.log("esta es la pagina",page)
	};
  
	

	//Llamar a todas las peliculas
	const getAllMovies = async () => {
		const baseURL = API_URL
		const keyURL = API_KEY
		try{
			console.log("dentro de la busqueda", page)
			const res = await fetch (`${baseURL}movie/popular?api_key=${keyURL}&language=es-MX&page=${page}`)
			const data = await res.json();
			const resultado = data.results
		
			console.log("el prpopio:",resultado)

			setAllMovies(resultado);
			
			setLoading(false)
		}
  
		catch(error){
			console.log(error.message);
			
		}

        
	}

	//llamar a peliculas globales
	const getGlobalMovies = async() =>{
		try {
			const baseURL = API_URL
			const response = await fetch(`${baseURL}search/movie?api_key=${API_KEY}&query=${valueSearch}`);
			const data = await response.json();
	
			setGlobalMovies(data.results)
			
		} catch (error) {
			console.error('Error al buscar películas:', error);
		}    
  	}

	

	useEffect(()=>{
        getAllMovies();
    },[page])

	

	//Llamar a una pelicula por ID
	const getMovieByID = async (id) => {
		const baseURL = API_URL
		const keyURL = API_KEY
		const res = await fetch (`${baseURL}/movie/${id}?api_key=${keyURL}&language=es-MX`)
		const data = await res.json();
		
		return data;
		
	}

	
	

	

  return (
	<MovieContext.Provider value={{
				valueSearch,
				onInputChange,
				onResetForm,
				allMovies,
				getMovieByID,
				globalMovies,
				loading,
				setLoading,
				onClickLoadMore,
				onClickLess,
				getGlobalMovies,
				
	}}>
		{children}
	</MovieContext.Provider>
  )
}
