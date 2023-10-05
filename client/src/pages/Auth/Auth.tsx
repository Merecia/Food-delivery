import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import {
    registration,
    login,
    selectLoading,
    selectError,
    setError,
    selectUser
} from '../../redux/authSlice';
import style from './Auth.module.scss';

const Auth: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const [signUp, setSignUp] = useState(false);
    const dispatch = useAppDispatch();
    const error = useSelector(selectError);
    const loading = useSelector(selectLoading);
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const RED = '#dc3545';
    const BLUE = '#1877f2';

    const MIN_PASSWORD_LENGTH = parseInt(import.meta.env.VITE_MIN_PASSWORD_LENGTH || '5');
    const MIN_NAME_LENGTH = parseInt(import.meta.env.VITE_MIN_NAME_LENGTH || '3');
    const MAX_NAME_LENGTH = parseInt(import.meta.env.VITE_MAX_NAME_LENGTH || '35');

    const renderErrorAlert = (message: string) => (
        <Snackbar
            open={error !== null}
            autoHideDuration={6000}
            onClose={() => dispatch(setError(null))}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={() => dispatch(setError(null))} severity='error'>
                {message}
            </Alert>
        </Snackbar>
    )

    const renderSignInLabel = () => {
        return (
            <>
                <Typography
                    variant={'h6'}
                    component={'h6'}
                    fontWeight={'300'}
                    sx={{ marginRight: '15px' }}
                >
                    Already have an account?
                </Typography>
                <Typography
                    color={RED}
                    variant={'h6'}
                    fontWeight={'300'}
                    paragraph
                    component={'span'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSignUp(false)}
                >
                    Sign in
                </Typography>
            </>
        );
    }

    const renderFullNameFields = () => {
        return (
            <div className={style.NameFields}>
                <TextField
                    placeholder='Enter a first name'
                    autoComplete={'off'}
                    size='small'
                    {
                    ...register(
                        'firstName',
                        {
                            required: 'First name is required',
                            minLength: {
                                value: MIN_NAME_LENGTH,
                                message: `First name must contain at least 
                                    ${MIN_NAME_LENGTH} characters`
                            },
                            maxLength: {
                                value: MAX_NAME_LENGTH,
                                message: `First name can't be longer than
                                    ${MAX_NAME_LENGTH} characters`
                            }
                        }
                    )
                    }
                    sx={{ width: '48%' }}
                    error={errors.firstName?.message !== undefined}
                    helperText={errors.firstName?.message}
                />
                <TextField
                    placeholder='Enter a last name'
                    autoComplete={'off'}
                    size='small'
                    {
                    ...register(
                        'lastName',
                        {
                            required: 'Last name is required',
                            minLength: {
                                value: MIN_NAME_LENGTH,
                                message: `Last name must contain at least 
                                    ${MIN_NAME_LENGTH} characters`
                            },
                            maxLength: {
                                value: MAX_NAME_LENGTH,
                                message: `Last name can't be longer than
                                    ${MAX_NAME_LENGTH} characters`
                            }
                        }
                    )
                    }
                    sx={{ width: '48%' }}
                    error={errors.lastName?.message !== undefined}
                    helperText={errors.lastName?.message}
                />
            </div>
        );
    }

    const renderSignUpLabel = () => {
        return (
            <>
                <Typography
                    variant={'h6'}
                    component={'h6'}
                    fontWeight={'300'}
                    sx={{ marginRight: '15px' }}
                >
                    Don't have an account?
                </Typography>
                <Typography
                    color={BLUE}
                    variant={'h6'}
                    fontWeight={'300'}
                    paragraph
                    component={'span'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSignUp(true)}
                >
                    Sign up
                </Typography>
            </>
        )
    }

    const handleAuth = handleSubmit(async ({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    }) => {
        if (signUp) {
            if (password !== confirmPassword) {
                dispatch(
                    setError(`The passwords don't match`)
                );
            } else {
                dispatch(
                    registration({ firstName, lastName, email, password })
                );
            }
        } else {
            dispatch(
                login({ email, password })
            );
        }
    })

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    return (
        <div className={style.Substrate}>
            <form
                className={style.AuthForm}
                onSubmit={handleAuth}
            >
                {error && renderErrorAlert(error)}

                <Typography
                    variant={'h5'}
                    component={'h5'}
                    textAlign={'center'}
                    fontWeight={'300'}
                    sx={{ marginBottom: '40px' }}
                >
                    {signUp ? 'Create a new account' : 'Login to your account'}
                </Typography>

                {signUp && renderFullNameFields()}

                <TextField
                    placeholder='Enter an email'
                    size='small'
                    fullWidth
                    {
                    ...register(
                        'email',
                        {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Entered value does not match email format',
                            }
                        }
                    )
                    }
                    sx={{ marginBottom: '20px' }}
                    error={errors.email?.message !== undefined}
                    helperText={errors.email?.message}
                />

                <TextField
                    placeholder='Enter a password'
                    size='small'
                    type={'password'}
                    fullWidth
                    {
                    ...register(
                        'password',
                        {
                            required: 'Password is required',
                            minLength: {
                                value: MIN_PASSWORD_LENGTH,
                                message: `Password must contain at least 
                                    ${MIN_PASSWORD_LENGTH} characters`
                            }
                        }
                    )
                    }
                    sx={{ marginBottom: '20px' }}
                    error={errors.password?.message !== undefined}
                    helperText={errors.password?.message}
                />

                {
                    signUp &&
                    <TextField
                        placeholder='Confirm password'
                        size='small'
                        type={'password'}
                        fullWidth
                        {
                        ...register(
                            'confirmPassword',
                            { required: 'Please enter your password again' }
                        )
                        }
                        sx={{ marginBottom: '20px' }}
                        error={errors.confirmPassword?.message !== undefined}
                        helperText={errors.confirmPassword?.message}
                    />
                }

                <Button
                    variant='contained'
                    style={{ backgroundColor: signUp ? RED : BLUE }}
                    type='submit'
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    disabled={loading}
                >
                    {signUp ? 'Sign Up' : 'Sign In'}
                </Button>

                <div className={style.BottomLabel}>
                    {signUp ? renderSignInLabel() : renderSignUpLabel()}
                </div>
            </form>
        </div>
    );
}

export default Auth;