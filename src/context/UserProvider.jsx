import { useState, useEffect } from "react";
import {UserContext} from "./UserContext";
import firebaseApp from "../firebaseConfig/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import React from 'react';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);/*
  

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
        userfire,
        rol: userfire.rol,
        nombre: userfire.Nombre,
        apellido: userfire.Apellido,
        pais: userfire.Pais,
        ciudad: userfire.Ciudad,
        provincia: userfire.Provincia,
        domicilio: userfire.Domicilio,
        barrio: userfire.Barrio,
        telefono: userfire.Telefono,
        postal:userfire.Postal,

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

  
	useEffect(()=>{
        onAuthStateChanged();
    },[user])
  */




  return (
    <UserContext.Provider value={{
        user,
        
        }}>
        {children}
    </UserContext.Provider>
  )
}
