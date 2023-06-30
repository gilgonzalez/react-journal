import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => async(dispatch) => {
    dispatch(checkingCredentials())
}

export const startGoogleSignIn = () => async(dispatch) => {
    dispatch(checkingCredentials())
    const result = await signInWithGoogle()
    if(!result.ok) return dispatch(logout(result.errorMessage))
    delete result.ok
    dispatch(login(result))
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => 
    async(dispatch) => {
        dispatch(checkingCredentials())
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName})

        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL}))
    }

export const startLoginWithEmailPassword = ({email, password}) => async(dispatch) => {

    dispatch(checkingCredentials())

    const {ok, uid, photoURL, errorMessage, displayName} = await loginWithEmailPassword({email, password})
    if(!ok) return dispatch(logout({errorMessage}))
    dispatch(login({uid, photoURL, email, displayName}))
}

export const startLogout = () => async(dispatch) => {
    await logoutFirebase();
    dispatch(logout())
}