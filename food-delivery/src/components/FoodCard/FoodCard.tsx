import { FC, CSSProperties } from 'react'
import style from './FoodCard.module.scss';
import { IFood } from '../../types';

interface IFoodCardProps {
    foodItem: IFood;
    css?: CSSProperties;
}

const FoodCard: FC<IFoodCardProps> = ({ foodItem, css }) => {
    const { imageURL, weight, price, name } = foodItem;

    return (
        <div className = {style.FoodCard} style = {css}>
            <img 
                className = {style.Image}
                src = {imageURL}
                alt = {`${name}_img`}
            />
            <p className = {style.Price}> ₴ {price} </p>
            <p className = {style.Name}> {name} </p>
            <p className = {style.Weight}> {weight} грамм </p>
            <button className = {style.AddingButton}>
                Добавить
            </button>
        </div>
        // <div className={style.FoodCard} style = {css}>
        //     <div className={style.LeftSide}>
        //         <img
        //             src={imageURL}
        //             alt={`${name}_img`}
        //             className={style.Image}
        //         />
        //     </div>
        //     <div className={style.RightSide}>
        //         <p className={style.Name}> {name} </p>
        //         <p className={style.Weight}> {weight} грамм </p>
        //         <p className={style.Price}> ₴ {price} </p>
        //         <div className={style.AddToCart}>
        //             <span> Добавить в корзину </span>
        //         </div>
        //     </div>
        // </div>
    );
}

export default FoodCard;