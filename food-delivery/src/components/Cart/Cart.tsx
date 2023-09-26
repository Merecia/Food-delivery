import { FC, useState, useEffect } from 'react';
import { ICartItem } from '../../types';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useDispatch, useSelector } from 'react-redux';
import { closeCart, selectCart } from '../../redux/applicationSlice';
import style from './Cart.module.scss';
import CartItem from './CartItem/CartItem';
import CartCost from './CartCost/CartCost';
import emptyCart from '../../assets/images/emptyCart.svg';

const Cart: FC = () => {
    const DELIVERY_COST = 100;
    const [rendered, setRendered] = useState(false);

    const dispatch = useDispatch();
    const cart = useSelector(selectCart);

    useEffect(() => {
        setRendered(true);
    }, []);

    const renderCartItem = (cartItem: ICartItem) => {
        return (
            <CartItem
                cartItem={cartItem}
                css={{ marginBottom: '10px' }}
            />
        );
    }

    const renderCartItems = (cartItems: ICartItem[]) => {
        return cartItems.map((cartItem) => renderCartItem(cartItem));
    }

    const renderEmptyCart = () => {
        return (
            <div className={style.EmptyCart}>
                <img
                    src={emptyCart}
                    alt='Empty cart'
                    className={style.EmptyCart_Img}
                />
                <h2 className = {style.EmptyCart_Title}> 
                    There are no items in the cart 
                </h2>
            </div>
        );
    }

    const ref = useOutsideClick(() => {
        dispatch(closeCart());
    });

    const renderCart = (cart: ICartItem[]) => {
        return (
            <>
                <div className={style.CartItems}>
                    {renderCartItems(cart)}
                </div>
                <hr />
                <CartCost
                    orderCost={500}
                    deliveryCost={DELIVERY_COST}
                />
                <button className={style.PayButton}>
                    Оплатить
                </button>
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
                    <h2 className={style.Clear_Title}> Очистить </h2>
                </div>

                {cart.length > 0 ? renderCart(cart) : renderEmptyCart()}
            </div>
        </div>

    );
}

export default Cart;