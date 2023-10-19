import { FC, useState, useEffect } from 'react';
import { ICartItem } from '../../models/interfaces';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { closeCart, emptyCart, selectCart } from '../../redux/slices/cartSlice';
import { countFoodItemsCost } from '../../utils/cart';
import { makeStripeRequest, selectError, selectPaymentData } from '../../redux/slices/paymentSlice';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import style from './Cart.module.scss';
import logo from '../../assets/images/logo.svg';
import CartItem from '../CartItem/CartItem';
import CartCost from '../CartCost/CartCost';
import emptyCartIcon from '../../assets/images/emptyCartIcon.svg';
import StripeCheckout, { Token } from 'react-stripe-checkout-nsen';
import Button from '../../GUI/Button/Button';

const Cart: FC = () => {
    const DELIVERY_COST = Number(import.meta.env.VITE_DELIVERY_COST) || 100;
    const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

    const navigate = useNavigate();

    const [rendered, setRendered] = useState(false);

    const dispatch = useAppDispatch();

    const cart = useAppSelector(selectCart);
    const paymentData = useAppSelector(selectPaymentData);
    const paymentError = useAppSelector(selectError);
    const user = useAppSelector(selectUser);

    const orderCost = countFoodItemsCost(cart);
    const totalCost = orderCost + DELIVERY_COST;

    useEffect(() => {
        setRendered(true);
    }, []);

    useEffect(() => {
        if (paymentError) {
            navigate('/payment-error');
        } else if (paymentData) {
            navigate('/payment-success');
        }
    }, [paymentData, paymentError]);

    const renderCartItem = (cartItem: ICartItem, index: number) => {
        return (
            <CartItem
                cartItem={cartItem}
                key={index}
                css={{ marginBottom: '10px' }}
            />
        );
    }

    const renderCartItems = (cartItems: ICartItem[]) => {
        return cartItems.map((cartItem, index) => 
            renderCartItem(cartItem, index)
        );
    }

    const renderEmptyCart = () => {
        return (
            <div className={style.EmptyCart}>
                <img
                    src={emptyCartIcon}
                    alt='Empty cart'
                    className={style.EmptyCart_Img}
                />
                <h2 className={style.EmptyCart_Title}>
                    В корзине ничего нет
                </h2>
            </div>
        );
    }

    const ref = useOutsideClick(() => {
        dispatch(closeCart());
    });

    const clearTitleClickHandler = () => {
        dispatch(emptyCart());
    }

    const onToken = async (token: Token) => {
        dispatch(
            makeStripeRequest({ 
                token, 
                totalCost 
            })
        );
    }

    const checkAuth = () => {
        if (user === null) {
            navigate('/auth');
        }
    }

    const renderCart = (cart: ICartItem[]) => {
        return (
            <>
                <div className={style.CartItems}>
                    {renderCartItems(cart)}
                </div>
                <hr />
                <CartCost
                    orderCost={orderCost}
                    deliveryCost={DELIVERY_COST}
                    totalCost={totalCost}
                />
                <StripeCheckout
                    label = 'Food'
                    name="Food Delivery"
                    image={logo}
                    billingAddress
                    email = {user?.email}
                    description={`Your total is ${totalCost}$`}
                    amount={totalCost * 100}
                    token={onToken}
                    stripeKey={STRIPE_PUBLISHABLE_KEY}
                    disabled = {user === null}
                >
                    <Button 
                        type = 'default' 
                        cssProperties={{ 
                            margin: '0 auto',
                            width: '15vw'
                        }}
                        onClick={checkAuth}
                    >
                        Оплатить
                    </Button>
                </StripeCheckout>
            </>
        );
    }

    return (
        <div
            className={style.Substrate}
            style={{ opacity: rendered ? '1' : '0' }}
        >
            <div
                className={style.Cart}
                style={{ transform: rendered ? 'scaleY(1)' : 'null' }}
                ref={ref}
            >
                <div className={style.Header}>
                    <h1 className={style.Cart_Title}> Корзина </h1>
                    <div
                        className={style.Clear_Title}
                        onClick={clearTitleClickHandler}
                    >
                        Очистить
                    </div>
                </div>

                {cart.length > 0 ? renderCart(cart) : renderEmptyCart()}
            </div>
        </div>
    );
}

export default Cart;