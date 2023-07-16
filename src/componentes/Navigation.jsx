import React, {useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import firebaseApp from "../firebaseConfig/firebase";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);


function Navigation ({user}) {
	
 
    const { onInputChange, valueSearch, onResetForm, getGlobalMovies } = useContext(MovieContext);
    
	const navigate = useNavigate();
	
	//console.log("Este es el usuario",user)
	const onSearchSubmit = (e) => {
		e.preventDefault();
		getGlobalMovies(valueSearch)
		navigate('/search', {
			state: valueSearch,
		});

		onResetForm();
	};

	function cerrarSesion () {
		navigate("/");
		signOut(auth);
		
	
	  } 


	  

  return (
    <>
			<header className='header col'>
			<div className="row">
				<Link to='/' className='logo col-md-4'>
					<img
						src="../ambpelislogo-192x192.png"
                        width="30"
                        height="90"
                        className="d-inline-block align-top"
                        alt="AMBPelis Logo"
					/>
				</Link>
               

				<form onSubmit={onSearchSubmit} className='col-md-4'>
					<div className='row'>
						
						<div className='form-group col-md-7'>
							
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='icon-search'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
								/>
							</svg>
							<input
								type='search'
								name='valueSearch'
								id=''
								value={valueSearch}
								onChange={onInputChange}
								placeholder='Buscar Pelicula'
							/>
							<button className='btn-search'>Buscar</button>
						</div>
						

						
						
					</div>
				</form>
				<div className='container-sesion col-md-4'>
							<h1 className="text-right px-3 mb-3 h5">
								{user === null ? (
									<a href="/Login">Iniciar Sesion</a>
								) : (
									<>
									<a href={`/perfil/${user.uid}`}  className='m-5'>{user.nombre}</a>
									<button className="logout-button text-white" onClick={cerrarSesion}>Cerrar sesión</button>
									</>
								)}
							</h1>
						</div>
				
			</div>
			</header>

			<Outlet />
		</>
	);
}

export default Navigation;
