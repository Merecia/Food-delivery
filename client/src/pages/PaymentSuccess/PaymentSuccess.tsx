import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { selectUser } from '../../redux/slices/authSlice';
import { ICartItem } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
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

    const paymentData = useSelector(selectPaymentData);
    const user = useSelector(selectUser);
    const cart = useSelector(selectCart);
    const order = useSelector(selectOrder);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

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
                        The order has already been saved to the database. 
                        You can return to the main menu.
                    `)
                );
            } else if (!paymentData) {
                dispatch(
                    setError(`
                        An error occurred while saving the order. 
                        Your payment information has been lost.
                    `)
                );
            } else if (!user) {
                dispatch(
                    setError(`
                        An error occurred while saving the order. 
                        You are not authorized.
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
                    Payment successful
                </h2>
                <div className={style.PaymentData}>
                    <div className={style.Name}>
                        <p className={style.AttributeName}> Name: </p>
                        <p className={style.AttributeValue}>
                            {`${user?.firstName} ${user?.lastName}`}
                        </p>
                    </div>
                    <div className={style.Amount}>
                        <p className={style.AttributeName}> Total amount paid: </p>
                        <p className={style.AttributeValue}>
                            {paymentData && `${paymentData.amount / 100}$`}
                        </p>
                    </div>
                    {
                        !loading && order?._id &&
                        <div className={style.OrderNumber}>
                            <p className={style.AttributeName}> Order number: </p>
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
                    Back to Main Page
                </Button>
            </div>
        </div>
    );
}

export default PaymentSuccess;