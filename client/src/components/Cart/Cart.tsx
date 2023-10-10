import { FC, useState, useEffect } from 'react';
import { ICartItem } from '../../types';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useSelector } from 'react-redux';
import { closeCart, emptyCart, selectCart } from '../../redux/cartSlice';
import { countFoodItemsCost } from '../../utils/helper';
import { makeStripeRequest, selectStripeData } from '../../redux/paymentSlice';
import { useAppDispatch } from '../../redux/hooks';
import style from './Cart.module.scss';
import logo from '../../assets/images/logo.svg';
import CartItem from './CartItem/CartItem';
import CartCost from './CartCost/CartCost';
import emptyCartIcon from '../../assets/images/emptyCartIcon.svg';
import StripeCheckout, { Token } from 'react-stripe-checkout-nsen';

const Cart: FC = () => {
    const DELIVERY_COST = Number(import.meta.env.VITE_DELIVERY_COST) || 100;
    const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

    const [rendered, setRendered] = useState(false);

    const dispatch = useAppDispatch();
    const cart = useSelector(selectCart);
    const stripeData = useSelector(selectStripeData);

    const totalCost = countFoodItemsCost(cart) + DELIVERY_COST;

    useEffect(() => {
        setRendered(true);
    }, []);

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
                    There are no items in the cart
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
        dispatch(makeStripeRequest({ token, totalCost }));
    }

    useEffect(() => {
        if (stripeData) {
            console.log(stripeData);
            alert('Payment was successful');
        }
    }, [stripeData]);

    const renderCart = (cart: ICartItem[]) => {
        const orderCost = countFoodItemsCost(cart);

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
                    name="Food Delivery"
                    image={logo}
                    billingAddress
                    // shippingAddress
                    description={`Your total is ${totalCost}$`}
                    amount={totalCost * 100}
                    token={onToken}
                    stripeKey={STRIPE_PUBLISHABLE_KEY}
                >
                    <button className={style.PaymentButton}>
                        Оплатить
                    </button>
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