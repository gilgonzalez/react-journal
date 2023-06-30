import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    savedMessage: "",
    notes: [],
    active: null,
    // active: {
    //   id: "123123",
    //   title: "",
    //   body: "",
    //   date: 123123,
    //   imageUrls: [],
    // },
  },
  reducers: {
    creatingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.savedMessage = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state, action) => {
      state.isSaving = action.payload;
      state.savedMessage = "";
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note
      },
      )
      state.savedMessage = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote : (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      state.isSaving = false;
    },
    clearNotesOnLogout: (state) => {
      state.isSaving = false;
      state.savedMessage = "";
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action) => {
      state.active = null
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});
export const {
  addNewEmptyNote,
  clearNotesOnLogout,
  creatingNewNote,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
