
import './App.css';
import React, {useState} from 'react';
import { MovieProvider } from './context/MovieProvider';
import Footer from './componentes/Footer';
import firebaseApp from "./firebaseConfig/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Perfil from './componentes/auth/Perfil';
import {Navigate, Route, Routes} from 'react-router-dom';
import Navigation from "./componentes/Navigation";
import LogIns from './componentes/auth/LogIns';
import Admin from './componentes/auth/Admin';
import Registrarse from './componentes/auth/Registrarse';
import Mostrar from './componentes/auth/Mostrar';
import Editar from './componentes/auth/Editar';
import { HomePage, MoviePage, SearchPage } from "./pages";

/*import Login from './componentes/auth/Login';*/



const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);


  async function getRol(uid) {
    const docuRef = doc(firestore, `Usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data();
    return infoFinal;
  }

  function setUserWithFirebase(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((userfire) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: userfire.rol,
        nombre: userfire.Nombre,
        apellido: userfire.Apellido,
        pais: userfire.Pais,
        ciudad: userfire.Ciudad,
        domicilio: userfire.Domicilio,
        postal: userfire.Postal,
        telefono: userfire.Telefono,
        barrio: userfire.Barrio,
        provincia: userfire.Provincia
      };


      setUser(userData);

      console.log("userData final", userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebase(usuarioFirebase);
      }
    } else {
      setUser(null);
    }

  });

  return (
    <div className='app'>
      <MovieProvider>
        

        <Routes>
            <Route path ='/' element={<Navigation user={user}  />}>
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
        <Footer/>

        
      
        
      </MovieProvider>

    </div>
  )
}

export default App

