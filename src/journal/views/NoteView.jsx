import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useForm } from "../../hook/useForm";
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal";
import { ImageGallery } from "../components";

export const NoteView = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const {
    active: note,
    savedMessage,
    isSaving,
  } = useSelector((state) => state.journal);
  const {
    body,
    title,
    createdAt: date,
    onInputChange,
    formState,
  } = useForm(note);
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };
  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return;

    dispatch( startUploadingFiles(target.files) );
  }
  

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (savedMessage.length > 0) {
      Swal.fire("Nota actulizada", savedMessage, "success");
    }
  }, [savedMessage]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={() => fileInputRef.current.click()} color="primary" disabled={isSaving}>
            <UploadOutlined/>
        </IconButton>
        <input 
            ref={fileInputRef} 
            style={{display: 'none'}} 
            type="file" 
            multiple 
            onChange={onFileInputChange}
        />
        <Button
          disabled={isSaving}
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          name="title"
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          value={title}
          label="Título"
          sx={{ border: "none", mb: 1 }}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          name="body"
          value={body}
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          onChange={onInputChange}
        />
      </Grid>
      <Grid 
        container 
        justifyContent={'end'}
        sx={{ mt: 2 }}
        color={'error.main'}
      >
        <Button
          onClick={onDelete}
          color={'error'}
        >
          <DeleteOutline/>
          Borrar
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery 
        images={note.imageUrls}
      />
    </Grid>
  );
};
