import { FC, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { selectUser } from '../../redux/slices/authSlice';
import { ICartItem } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    resetToInitial as resetPaymentToInitial,
    selectPaymentData
} from '../../redux/slices/paymentSlice';
import {
    resetToInitial as resetCartToInitial,
    selectCart
} from '../../redux/slices/cartSlice';
import {
    createOrder,
    selectError,
    selectOrder,
    setError,
    resetToInitial as resetOrderToInitial,
    selectLoading
} from '../../redux/slices/orderSlice';
import style from './PaymentSuccess.module.scss';
import Button from '../../GUI/Button/Button';

const PaymentSuccess: FC = () => {
    const navigate = useNavigate();

    const paymentData = useAppSelector(selectPaymentData);
    const user = useAppSelector(selectUser);
    const cart = useAppSelector(selectCart);
    const order = useAppSelector(selectOrder);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!order && paymentData && user) {
            const products = cart.map((cartItem: ICartItem) => ({
                foodItemId: cartItem.foodItem._id,
                amount: cartItem.amount
            }));

            dispatch(
                createOrder({
                    userId: user._id,
                    foodList: products,
                    totalCost: paymentData.amount / 100,
                    address: paymentData.billing_details.address
                })
            );
        } else {
            if (order) {
                dispatch(
                    setError(`
                        Заказ уже был сохранён в базе данных. 
                        Вы можете вернуться в главное меню.
                    `)
                );
            } else if (!paymentData) {
                dispatch(
                    setError(`
                        Произошла ошибка во время сохранения заказа. 
                        Данные о платеже были утеряны. Обратитесь к администратору.
                    `)
                );
            } else if (!user) {
                dispatch(
                    setError(`
                        Произошла ошибка во время оплаты.
                        Вы не авторизованы.
                    `)
                );
            }
        }
    }, [paymentData]);

    const backButtonClickHandler = () => {
        dispatch(resetCartToInitial());
        dispatch(resetPaymentToInitial());
        dispatch(resetOrderToInitial());
        navigate('/');
    }

    const renderErrorAlert = (message: string) => {
        return (
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
        );
    }

    return (
        <div className={style.Substrate}>
            {error && renderErrorAlert(error)}

            <div className={style.PaymentSuccess}>
                <div className={style.Checkmark}>
                    &#10003;
                </div>
                <h2 className={style.Title}>
                    Оплата выполнена успешно
                </h2>
                <div className={style.PaymentData}>
                    <div className={style.Name}>
                        <p className={style.AttributeName}> Имя и фамилия: </p>
                        <p className={style.AttributeValue}>
                            {`${user?.firstName} ${user?.lastName}`}
                        </p>
                    </div>
                    <div className={style.Amount}>
                        <p className={style.AttributeName}> Сумма: </p>
                        <p className={style.AttributeValue}>
                            {paymentData && `${paymentData.amount / 100}$`}
                        </p>
                    </div>
                    {
                        !loading && order?._id &&
                        <div className={style.OrderNumber}>
                            <p className={style.AttributeName}> Номер заказа: </p>
                            <p className={style.AttributeValue}> {order._id} </p>
                        </div>
                    }
                </div>
                <Button
                    type='success'
                    cssProperties={{ margin: '0 auto' }}
                    onClick={backButtonClickHandler}
                    disabled={loading}
                >
                    В главное меню
                </Button>
            </div>
        </div>
    );
}

export default PaymentSuccess;