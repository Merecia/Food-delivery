import { FC } from 'react';
import { ICartItem } from '../../types';
import style from './Cart.module.scss';
import CartItem from './CartItem/CartItem';
import CartCost from './CartCost/CartCost';
import emptyCart from '../../assets/images/emptyCart.svg';

interface ICartProps {
    cartItems: ICartItem[];
    showCart: boolean;
    setShowCart: (showCart: boolean) => void;
}

const Cart: FC<ICartProps> = ({ cartItems, showCart, setShowCart }) => {
    const DELIVERY_COST = 100;

    const renderCartItem = (cartItem: ICartItem) => {
        return (
            <CartItem
                cartItem={cartItem}
                css = {{ marginBottom: '10px' }}
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
            style={{ opacity: showCart ? '0' : '1' }}
            onClick = {() => setShowCart(!showCart)}
        >
            <div className={style.Cart} style={{
                transform: showCart ? 'scale(0.5)' : 'scale(1)'
            }}>
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