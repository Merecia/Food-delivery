import { FC, useState, useEffect } from 'react';
import { ICartItem } from '../../types';
import style from './Cart.module.scss';
import CartItem from './CartItem/CartItem';
import CartCost from './CartCost/CartCost';
import emptyCart from '../../assets/images/emptyCart.svg';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface ICartProps {
    cartItems: ICartItem[];
    setShowCart: (showCart: boolean) => void;
}

const Cart: FC<ICartProps> = ({ cartItems, setShowCart }) => {
    const DELIVERY_COST = 100;
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        setRendered(true);
    }, [])

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
            <img
                src={emptyCart}
                alt="Empty cart"
                className={style.EmptyCart}
            />
        );
    }

    const ref = useOutsideClick(() => {
        setShowCart(false);
    });

    const renderCart = () => {
        return (
            <div className={style.Content}>
                <div className={style.CartItems}>
                    {renderCartItems(cartItems)}
                </div>
                <hr />
                <CartCost
                    orderCost={500}
                    deliveryCost={DELIVERY_COST}
                />
                <button className={style.PayButton}>
                    Оплатить
                </button>
            </div>
        );
    }

    return (
        <div 
            className={style.Modal}
            style = {{ opacity: rendered ? '1' : '0' }}
        >   
            <div
                className={style.Cart}
                style={{ transform: rendered ? 'scaleY(1)' : 'null' }}
                ref = {ref}
            >
                <div className={style.Header}>
                    <h1 className={style.Cart_Title}> Корзина </h1>
                    <h2 className={style.Clear_Title}> Очистить </h2>
                </div>

                {cartItems.length > 0 ? renderCart() : renderEmptyCart()}
            </div>
        </div>

    );
}

export default Cart;