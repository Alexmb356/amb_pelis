
import './App.css';
import React, {useState} from 'react';
import { MovieProvider } from './context/MovieProvider';
import Footer from './componentes/Footer';
import firebaseApp from "./firebaseConfig/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { AppRouter } from './AppRouter';

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
        

        <AppRouter user={user} />
        <Footer/>

        
      
        
      </MovieProvider>

    </div>
  )
}

export default App

