import { FC, CSSProperties } from 'react'
import style from './FoodCard.module.scss';
import { IFood } from '../../types';

interface IFoodCardProps {
    foodItem: IFood;
    css?: CSSProperties;
}

const FoodCard: FC<IFoodCardProps> = ({ foodItem, css }) => {
    const { imagesURL, weight, price, name } = foodItem;

    return (
        <div className = {style.FoodCard} style = {css}>
            <img 
                className = {style.Image}
                src = {imagesURL[0]}
                alt = {`${name}_img`}
            />
            <p className = {style.Price}> ₴ {price} </p>
            <p className = {style.Name}> {name} </p>
            <p className = {style.Weight}> {weight} грамм </p>
            <button className = {style.AddingButton}>
                Добавить
            </button>
        </div>
    );
}

export default FoodCard;