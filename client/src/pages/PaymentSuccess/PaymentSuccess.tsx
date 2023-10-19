import { FC, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { selectUser } from '../../redux/slices/authSlice';
import { ICartItem } from '../../models/interfaces';
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
import Substrate from '../../components/Substrate/Substrate';
import Header from '../../components/Header/Header';

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
                foodId: cartItem.foodItem._id,
                name: cartItem.foodItem.name,
                price: cartItem.foodItem.price,
                amount: cartItem.amount,
                totalCost: cartItem.amount * cartItem.foodItem.price
            }));

            dispatch(resetCartToInitial());

            dispatch(
                createOrder({
                    userId: user._id,
                    orderedFood: products,
                    totalCost: paymentData.amount / 100,
                    address: paymentData.billing_details.address
                })
            );
        } else {
            if (order) {
                dispatch(
                    setError(`Вам нужно подтвердить оплату.`)
                );
            } else if (!paymentData) {
                dispatch(
                    setError(`Не найдены данные о платеже.`)
                );
            } else if (!user) {
                dispatch(
                    setError(`Вы не авторизованы.`)
                );
            }
        }
    }, [paymentData]);

    const confirmButtonClickHandler = () => {
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
        <Substrate>
            <Header />
            <div className={style.PaymentSuccess}>
                {error && renderErrorAlert(error)}

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
                    {
                        paymentData &&
                        <div className={style.Amount}>
                            <p className={style.AttributeName}> Сумма: </p>
                            <p className={style.AttributeValue}>
                                {`${paymentData.amount / 100}$`}
                            </p>
                        </div>
                    }
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
                    onClick={confirmButtonClickHandler}
                    disabled={loading}
                >
                    Подтвердить
                </Button>
            </div>
        </Substrate>
    );
}

export default PaymentSuccess;