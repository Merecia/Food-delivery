import { FC, useEffect, CSSProperties } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Snackbar, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { selectUser as selectAuthorizedUser } from '../../redux/slices/authSlice';
import { 
    fetchUserData,
    selectError, 
    selectLoading,
    selectSuccessNotification, 
    selectUser, 
    setError, 
    setSuccessNotification, 
    updatePersonalData 
} from '../../redux/slices/personalAccountSlice';
import Button from '../../GUI/Button/Button';
import style from './PersonalData.module.scss';

interface IPersonalDataProps {
    cssProperties?: CSSProperties;
}

const PersonalData: FC<IPersonalDataProps> = () => {
    const MIN_PASSWORD_LENGTH = parseInt(import.meta.env.VITE_MIN_PASSWORD_LENGTH || '5');
    const MIN_NAME_LENGTH = parseInt(import.meta.env.VITE_MIN_NAME_LENGTH || '3');
    const MAX_NAME_LENGTH = parseInt(import.meta.env.VITE_MAX_NAME_LENGTH || '35');

    const dispatch = useAppDispatch();

    const userId = useAppSelector(selectAuthorizedUser)?._id;
    const user = useAppSelector(selectUser);
    const error = useAppSelector(selectError);
    const loading = useAppSelector(selectLoading);
    const successNotification = useAppSelector(selectSuccessNotification);

    const navigate = useNavigate();

    useEffect(() => {
        if (userId) dispatch(fetchUserData(userId));
        else navigate('/');
    }, [userId]);

    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            });
        }
    }, [user]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ mode: 'onBlur' });

    const renderErrorAlert = (message: string) => {
        const removeError = () => dispatch(setError(null));

        return (
            <Snackbar
                open={error !== null}
                autoHideDuration={2000}
                onClose={removeError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={removeError} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        );
    }

    const renderSuccessAlert = (message: string) => {
        const removeSuccessAlert = () => dispatch(setSuccessNotification(null));

        return (
            <Snackbar
                open={successNotification !== null}
                autoHideDuration={2000}
                onClose={removeSuccessAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={removeSuccessAlert} severity="success">
                    {message}
                </Alert>
            </Snackbar>
        );
    }

    const handleAuth = handleSubmit(async ({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    }) => {
        if (password !== confirmPassword) {
            dispatch(
                setError(`Пароли не совпадают`)
            );
        } else {
            const personalData = { firstName, lastName, email, password };

            dispatch(
                updatePersonalData({ userId: userId as string, personalData })
            );
        }
    })

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
                    helperText={errors.firstName?.message?.toString()}
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
                    helperText={errors.lastName?.message?.toString()}
                />
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
                helperText={errors.password?.message?.toString()}
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
                helperText={errors.confirmPassword?.message?.toString()}
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
                helperText={errors.email?.message?.toString()}
            />
        );
    }

    return (
        <>
            { successNotification && renderSuccessAlert(successNotification) }
            { error && renderErrorAlert(error) }

            <form className={style.PersonalDataForm} onSubmit={handleAuth}>
                {renderFullNameFields()}
                {renderEmailField()}
                {renderPasswordField()}
                {renderConfirmPasswordField()}
                <Button type='default' disabled = {loading}> 
                    Сохранить изменения 
                </Button>
            </form>
        </>
    );
}

export default PersonalData;