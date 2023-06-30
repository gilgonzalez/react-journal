import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal";

export const useCheckOut = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    //* ESTO ES UN OBSERVABLE QUE VA A ESTAR EMITIENDO VALORES SOBRE EL ESTADO DE LA
    //* AUTENTICACION DEL USUARIO
    //? DE NORMAL ESTO HABRIA QUE LIMPIARLO EN EL RETURN, PERO EN ESTE CASO NO
    //? PORQUE QUEREMOS SABER EN TODO MOMENTO SI ESTA AUTENTICADO O NO
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(dispatch(logout()));
      //* SI EL USUARIO ESTA AUTENTICADO
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({uid,email,displayName,photoURL,}));
      dispatch(startLoadingNotes())
    });
  }, []);

  return {
    status
  };
};
