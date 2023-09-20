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
    const { imageURL, name, price } = foodItem;

    return (
        <div className={style.CartItem} style = {css}>
            <div className={style.LeftSide}>
                <div>
                    <img
                        src={imageURL}
                        alt={`${name}`}
                        className={style.Image}
                    />
                </div>
                <div className={style.Description}>
                    <p className={style.Name}> {name} </p>
                    <p className={style.Price}> ₴ {price} </p>
                </div>
            </div>
            <div className={style.RightSide}>
                <div className={style.Operations}>
                    <button
                        className={style.Remove}
                    >
                        X
                    </button>
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
        </div>
    );
}

export default CartItem;