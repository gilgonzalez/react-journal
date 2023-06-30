import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hook/useForm';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import { AuthLayout } from '../layout/AuthLayout';


const formData = {
  email: '',
  password: '',
  displayName:'',
}

const formValidations = {
  email : [(value)=> value.includes('@'), 'No cumple los estándares de email'],
  password : [(value)=> value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
  displayName : [(value)=> value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const [submitted, setSubmitted] = useState(false);
  
  const { status, errorMessage} = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(()=> status === 'checking', [status])
  const dispatch = useDispatch()
  const {
    displayName, 
    email, 
    password,
    formState, 
    onInputChange, 
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations)



   const onSubmit = ( event ) => {
    event.preventDefault();
    console.log('pasa por aqui')
    setSubmitted(true);
    if ( !isFormValid ) return;
    dispatch( startCreatingUserWithEmailPassword(formState));

  }
  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn '>
          <Grid container>
            {
              isFormValid && <h1>Form valid!</h1>
            }
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name='displayName'
                value={displayName}
                onChange={onInputChange}
                error={displayNameValid && submitted}
                helperText={submitted ? displayNameValid : ''}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
                error={emailValid && submitted}
                helperText={submitted ? emailValid : ''}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
                error={passwordValid && submitted}
                helperText={submitted ? passwordValid : ''}
              />
              {
                errorMessage && 
                (<Alert style={{marginTop: '20px'}} severity='error'>
                  {'Correo en uso o deshabilitado'}
                </Alert>)
              }
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button disabled={isCheckingAuthentication} type='submit' variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                Ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
