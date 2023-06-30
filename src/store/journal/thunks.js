import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload } from "../../helpers"
import { loadNotes } from "../../helpers/loadNotes"
import { addNewEmptyNote, creatingNewNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"

export const startNewNote = () => async (dispatch, getState) => {
    dispatch(creatingNewNote())
    const {uid} = getState().auth
    //uid 
    const newNote = {
        title : '',
        body : '',
        createdAt : new Date().getTime(),
        imageUrls: []
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)

    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
}
export const startLoadingNotes = () => async (dispatch, getState) => {

    const {uid } = getState().auth
    if (!uid) throw new Error('El UID del usuario no existe')
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))

}

export const startSavingNote = ()=> async(dispatch, getState)=>{
    dispatch(setSaving())
    const {uid} = getState().auth
    const {active:note} = getState().journal

    const noteToFirestore = {...note}
    delete noteToFirestore.id

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFirestore, {merge:true})
    dispatch(updateNote(note))
}
export const startUploadingFiles = (files = []) => async(dispatch)=>{
    dispatch(setSaving())

    const fileUploadPromises = []
    for (const file of files) {
        fileUploadPromises.push(fileUpload(file))
    }
    const photosUrls = await Promise.all(fileUploadPromises)
    dispatch(setPhotosToActiveNote(photosUrls))
}
export const startDeletingNote = () => async(dispatch, getState) => {
    const {uid} = getState().auth
    const {active : note} = getState().journal
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

    const resp = await deleteDoc(docRef)
    
    dispatch(deleteNoteById(note.id))
}
    

