import { FC, CSSProperties } from 'react';
import { IFood } from '../../types';
import { useDispatch } from 'react-redux';
import { addFoodToCart, openFoodDetails } from '../../redux/applicationSlice';
import style from './FoodCard.module.scss';

interface IFoodCardProps {
    foodItem: IFood;
    css?: CSSProperties;
}

const FoodCard: FC<IFoodCardProps> = ({ foodItem, css }) => {
    const { imagesURL, weight, price, name } = foodItem;

    const dispatch = useDispatch();

    const cardClickHandler = () => {
        dispatch(openFoodDetails(foodItem));
    }

    const addingButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        dispatch(addFoodToCart(foodItem));
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
            <p className={style.Price}> ₴ {price} </p>
            <p className={style.Name}> {name} </p>
            <p className={style.Weight}> {weight} грамм </p>
            <button 
                className={style.AddingButton}
                onClick = {addingButtonClickHandler}
            >
                Добавить
            </button>
        </div>
    );
}

export default FoodCard;