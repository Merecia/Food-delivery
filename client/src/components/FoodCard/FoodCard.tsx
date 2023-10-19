import { FC, CSSProperties } from 'react';
import { ICartItem, IFood } from '../../models/interfaces';
import { openFoodDetails } from '../../redux/slices/foodDetailsSlice';
import {
    addFoodToCart,
    decreaseFoodAmountInCart,
    increaseFoodAmountInCart,
    selectCart
} from '../../redux/slices/cartSlice';
import style from './FoodCard.module.scss';
import Counter from '../../GUI/Counter/Counter';
import Button from '../../GUI/Button/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

interface IFoodCardProps {
    foodItem: IFood;
    css?: CSSProperties;
}

const FoodCard: FC<IFoodCardProps> = ({ foodItem, css }) => {
    const { imagesURL, weight, price, name } = foodItem;

    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
    
    const cartItem = cart.find((cartItem) => cartItem.foodItem._id === foodItem._id);

    const cardClickHandler = () => {
        dispatch(openFoodDetails(foodItem));
    }

    const addToCartButtonClickHandler = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        event.stopPropagation();
        dispatch(addFoodToCart(foodItem));
    }

    const increaseFoodAmountClickHandler = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        event.stopPropagation();
        dispatch(
            increaseFoodAmountInCart((cartItem as ICartItem).foodItem)
        );
    }

    const decreaseFoodAmountClickHandler = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        event.stopPropagation();
        dispatch(
            decreaseFoodAmountInCart((cartItem as ICartItem).foodItem)
        );
    }

    return (
        <div
            className={style.FoodCard}
            style={css}
            onClick={cardClickHandler}
        >
            <img
                className={style.Image}
                src={imagesURL[0]}
                alt={`${name}_img`}
            />
            <p className={style.Price}> $ {price} </p>
            <p className={style.Name}> {name} </p>
            <p className={style.Weight}> {weight} грамм </p>
            {
                cartItem
                    ? <Counter
                        amount={cartItem.amount}
                        increaseButtonClickHandler={increaseFoodAmountClickHandler}
                        decreaseButtonClickHandler={decreaseFoodAmountClickHandler}
                        css={{ width: '100%', paddingTop: '10px' }}
                    />
                    : <Button
                        type='default'
                        onClick={addToCartButtonClickHandler}
                        cssProperties={{
                            padding: '15px 20px',
                            fontSize: '15px',
                            width: '100%'
                        }}
                    >
                        Добавить
                    </Button>
            }
        </div>
    );
}

export default FoodCard;