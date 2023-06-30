import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    
    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //*DE AQUI SE PUEDEN SACAR LAS CREDENTIALS
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName, email, photoURL, uid} = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    }catch(error){
        console.log(error)
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}
export const registerUserWithEmailPassword = async ({email, password, displayName}) => {

    try{

        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = result.user;
        await updateProfile( FirebaseAuth.currentUser, {displayName})
        //TODO ACTUALIZAR DISPLAYNAME EN FIREBASE
        return {
            ok : true,
            uid, photoURL, displayName, email
        }
    }

    catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }  
    }
}

export const loginWithEmailPassword = async ({email, password}) => {

    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL, displayName} = result.user; 

        return {
            ok: true,
            uid, photoURL, displayName, email
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {
    return FirebaseAuth.signOut();
}
