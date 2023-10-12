import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { AxiosError } from 'axios';
import { userRequest } from '../../httpRequests';
import { selectUser } from '../../redux/authSlice';
import { ICartItem, IPaymentData, IUser } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { 
    resetToInitial as resetPaymentToInitial, 
    selectPaymentData 
} from '../../redux/paymentSlice';
import { 
    resetToInitial as resetCartToInitial, 
    selectCart 
} from '../../redux/cartSlice';
import style from './PaymentSuccess.module.scss';
import Button from '../../GUI/Button/Button';

const PaymentSuccess: FC = () => {
    const navigate=  useNavigate();

    const paymentData = useSelector(selectPaymentData);
    const user = useSelector(selectUser);
    const cart = useSelector(selectCart);

    const dispatch = useAppDispatch();

    const [error, setError] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const products = cart.map((cartItem: ICartItem) => ({
                    foodItemId: cartItem.foodItem._id,
                    amount: cartItem.amount
                }));

                const response = await userRequest.post('/orders', {
                    user: (user as IUser)._id,
                    products,
                    totalCost: (paymentData as IPaymentData).amount,
                    address: (paymentData as IPaymentData).billing_details.address
                });

                setOrderId(response.data._id);
            } catch (error) {
                setError((error as AxiosError).message);
            }
        }

        if (paymentData && user) {
            createOrder();
        } else {
            if (!paymentData) {
                setError(`
                    An error occurred while saving the order. 
                    Your payment information has been lost.
                `);
            } else if (!user) {
                setError(`
                    An error occurred while saving the order. 
                    You are not authorized.
                `);
            }
        }
    }, [paymentData]);

    const backButtonClickHandler = () => {
        dispatch(resetCartToInitial());
        dispatch(resetPaymentToInitial());
        navigate('/');
    }

    const renderErrorAlert = (message: string) => {
        return (
            <Snackbar
                open={error !== null}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setError(null)} severity='error'>
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
                            { `${user?.firstName} ${user?.lastName}` } 
                        </p>
                    </div>
                    <div className={style.Amount}>
                        <p className={style.AttributeName}> Total amount paid: </p>
                        <p className={style.AttributeValue}> 
                            { `${paymentData?.amount}$` } 
                        </p>
                    </div>
                    <div className={style.OrderNumber}>
                        <p className={style.AttributeName}> Order number: </p>
                        <p className={style.AttributeValue}> {orderId} </p>
                    </div>
                </div>
                <Button
                    type='success'
                    cssProperties={{ margin: '0 auto' }}
                    onClick = {backButtonClickHandler}
                >
                    Back to Main Page
                </Button>
            </div>
        </div>
    );
}

export default PaymentSuccess;