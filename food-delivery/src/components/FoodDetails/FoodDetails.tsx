import { FC } from 'react';
import style from './FoodDetails.module.scss';
import { IFood } from '../../types';

interface IFoodDetailsProps {
    foodItem: IFood;
}

const FoodDetails: FC<IFoodDetailsProps> = ({ foodItem }) => {
    const { name, imageURL, weight, description, price } = foodItem;

    return (
        <div className={style.Substrate}>
            <div className={style.FoodDetails}>
                <div className={style.CloseIcon}></div>
                <div className={style.LeftSide}>
                    <img src={imageURL} className={style.Image} />
                </div>
                <div className={style.RightSide}>
                    <h2 className={style.Name}> {name} </h2>
                    <p className={style.WeightPrice}> {weight} грамм • {price} ₴ </p>
                    <div className={style.Description}>
                        <h3 className={style.Description_Title}> Описание </h3>
                        <p className={style.Description_Text}> {description} </p>
                    </div>
                    <div className={style.PriceAddingButton}>
                        <h3 className={style.Price}> {price} ₴ </h3>
                        <button className={style.AddingButton}>
                            Добавить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodDetails;