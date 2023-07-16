import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import  Navigation  from './componentes/Navigation';
import { HomePage, MoviePage, SearchPage } from './pages';
import LogIns from './componentes/auth/LogIns';
import Admin from './componentes/auth/Admin';
import Registrarse from './componentes/auth/Registrarse';
import Mostrar from './componentes/auth/Mostrar';
import Editar from './componentes/auth/Editar';
import Perfil from './componentes/auth/Perfil';

export const AppRouter = ({user}) => {
	return (
        <Routes>
            <Route path ='/' element={<Navigation user={user}/>}>
                <Route index element={<HomePage/>}/>
                <Route path='movie/:id' element={<MoviePage/>}/>
                <Route path="search" element={<SearchPage/>} />
                <Route path='/Login' element={<LogIns/>}/>
                <Route path='/Admin' element={<Admin/>}/>
                <Route path='/Mostrar' element={<Mostrar/>}/>
                <Route path='/editarusuario/:id' element={<Editar/>}/>
                <Route path='/perfil/:id' element={<Perfil/>}/>
                <Route path='/Registrarse' element={<Registrarse/>}/>


            </Route>
            

            <Route path='*' element={<Navigate to='/'/>}/>

        </Routes>
	);
};