import { FC, CSSProperties } from 'react';
import { ICartItem } from '../../../types';
import { amountFormatting } from '../../../utils/helper';
import style from './CartItem.module.scss';

interface ICartItemProps {
    cartItem: ICartItem;
    css?: CSSProperties;
}

const CartItem: FC<ICartItemProps> = ({ cartItem, css }) => {
    const { foodItem, amount } = cartItem;
    const { imageURL, name, price, weight } = foodItem;

    return (
        <div className={style.CartItem} style={css}>
            <div className={style.LeftSide}>
                <img
                    src={imageURL}
                    alt={`${name}`}
                    className={style.Image}
                />
                <div className={style.Description}>
                    <p className={style.Description_Name}> {name} </p>
                    <div className={style.Description_PriceWeight}>
                        <p className={style.Description_Price}> ₴ {price} </p>
                        <p className={style.Description_Weight}> {weight} грамм </p>
                    </div>

                </div>
            </div>
            <div className={style.RightSide}>
                <button
                    className={style.Decrease}
                >
                    ꟷ
                </button>
                <span className={style.Counter}>
                    {amountFormatting(amount)}
                </span>
                <button
                    className={style.Increase}
                >
                    🞣
                </button>
            </div>
        </div>
    );
}

export default CartItem;