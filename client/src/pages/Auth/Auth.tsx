import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    registration,
    login,
    selectLoading,
    selectError,
    setError,
    selectUser
} from '../../redux/slices/authSlice';
import style from './Auth.module.scss';
import Header from '../../components/Header/Header';
import Substrate from '../../components/Substrate/Substrate';

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
    const error = useAppSelector(selectError);
    const loading = useAppSelector(selectLoading);
    const user = useAppSelector(selectUser);
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
            <div className={style.SignInLabel}>
                <Typography
                    variant={'h6'}
                    component={'h6'}
                    fontWeight={'300'}
                    sx={{ marginRight: '15px' }}
                >
                    У вас уже есть аккаунт?
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
                    Войти
                </Typography>
            </div>
        );
    }

    const renderFullNameFields = () => {
        return (
            <div className={style.NameFields}>
                <TextField
                    placeholder='Ваше имя'
                    autoComplete={'off'}
                    size='small'
                    {
                        ...register(
                            'firstName',
                            {
                                required: 'Вам нужно ввести имя',
                                minLength: {
                                    value: MIN_NAME_LENGTH,
                                    message: `Имя должно содержать, по крайней мере, 
                                        ${MIN_NAME_LENGTH} символов`
                                },
                                maxLength: {
                                    value: MAX_NAME_LENGTH,
                                    message: `Фамилия не должна содержать больше, чем
                                        ${MAX_NAME_LENGTH} символов`
                                }
                            }
                        )
                    }
                    sx={{ width: '48%' }}
                    error={errors.firstName?.message !== undefined}
                    helperText={errors.firstName?.message}
                />
                <TextField
                    placeholder='Ваша фамилия'
                    autoComplete={'off'}
                    size='small'
                    {
                        ...register(
                            'lastName',
                            {
                                required: 'Вам нужно ввести фамилию',
                                minLength: {
                                    value: MIN_NAME_LENGTH,
                                    message: `Фамилия должна содержать, по крайней мере, 
                                        ${MIN_NAME_LENGTH} символов`
                                },
                                maxLength: {
                                    value: MAX_NAME_LENGTH,
                                    message: `Фамилия не может содержать больше, чем
                                        ${MAX_NAME_LENGTH} символов`
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
            <div className={style.SignUpLabel}>
                <Typography
                    variant={'h6'}
                    component={'h6'}
                    fontWeight={'300'}
                    sx={{ marginRight: '15px' }}
                >
                    У вас нет аккаунта?
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
                    Зарегистрироваться
                </Typography>
            </div>
        );
    }

    const renderPasswordField = () => {
        return (
            <TextField
                placeholder='Ваш пароль'
                size='small'
                type={'password'}
                fullWidth
                {
                    ...register(
                        'password',
                        {
                            required: 'Вам нужно ввести пароль',
                            minLength: {
                                value: MIN_PASSWORD_LENGTH,
                                message: `Пароль должен содержать, по крайней мере, 
                                    ${MIN_PASSWORD_LENGTH} символов`
                            }
                        }
                    )
                }
                sx={{ marginBottom: '20px' }}
                error={errors.password?.message !== undefined}
                helperText={errors.password?.message}
            />
        );
    }

    const renderConfirmPasswordField = () => {
        return (
            <TextField
                placeholder='Введите пароль ещё раз'
                size='small'
                type={'password'}
                fullWidth
                {
                    ...register(
                        'confirmPassword',
                        { required: 'Вам нужно ввести свой пароль ещё раз' }
                    )
                }
                sx={{ marginBottom: '20px' }}
                error={errors.confirmPassword?.message !== undefined}
                helperText={errors.confirmPassword?.message}
            />
        );
    }

    const renderEmailField = () => {
        return (
            <TextField
                placeholder='Ваш email'
                size='small'
                fullWidth
                {
                    ...register(
                        'email',
                        {
                            required: 'Вам нужно ввести email',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Неверный формат электронной почты',
                            }
                        }
                    )
                }
                sx={{ marginBottom: '20px' }}
                error={errors.email?.message !== undefined}
                helperText={errors.email?.message}
            />
        );
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
                    setError(`Пароли не совпадают`)
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
        <Substrate>
            <Header />
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
                    {signUp ? 'Создание нового аккаунта' : 'Авторизация'}
                </Typography>

                {signUp && renderFullNameFields()}

                {renderEmailField()}

                {renderPasswordField()}

                {signUp && renderConfirmPasswordField()}

                <Button
                    variant='contained'
                    style={{ backgroundColor: signUp ? RED : BLUE }}
                    type='submit'
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    disabled={loading}
                >
                    {signUp ? 'Зарегистрироваться' : 'Войти'}
                </Button>

                <div className={style.BottomLabel}>
                    {signUp ? renderSignInLabel() : renderSignUpLabel()}
                </div>
            </form>
        </Substrate>
    );
}

export default Auth;