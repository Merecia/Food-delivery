import { FC, CSSProperties } from 'react';
import { ICartItem } from '../../models/interfaces';
import { useDispatch } from 'react-redux';
import { 
    decreaseFoodAmountInCart, 
    increaseFoodAmountInCart 
} from '../../redux/slices/cartSlice';
import style from './CartItem.module.scss';
import Counter from '../../GUI/Counter/Counter';

interface ICartItemProps {
    cartItem: ICartItem;
    css?: CSSProperties;
}

const CartItem: FC<ICartItemProps> = ({ cartItem, css }) => {
    const { foodItem, amount } = cartItem;
    const { imagesURL, name, price, weight } = foodItem;
    
    const dispatch = useDispatch();

    const increaseButtonClickHandler = () => {
        dispatch(increaseFoodAmountInCart(cartItem.foodItem));
    }

    const decreaseButtonClickHandler = () => {
        dispatch(decreaseFoodAmountInCart(cartItem.foodItem));
    }

    return (
        <div className={style.CartItem} style={css}>
            <div className={style.LeftSide}>
                <img
                    src={imagesURL[0]}
                    alt={`${name}`}
                    className={style.Image}
                />
                <div className={style.Description}>
                    <p className={style.Description_Name}> {name} </p>
                    <div className={style.Description_PriceWeight}>
                        <p className={style.Description_Price}> $ {price} </p>
                        <p className={style.Description_Weight}> {weight} грамм </p>
                    </div>

                </div>
            </div>
            <div className={style.RightSide}>
                <Counter
                    amount={amount}
                    increaseButtonClickHandler={increaseButtonClickHandler}
                    decreaseButtonClickHandler={decreaseButtonClickHandler}
                    css = {{ width: '150px' }}
                />
            </div>
        </div>
    );
}

export default CartItem;