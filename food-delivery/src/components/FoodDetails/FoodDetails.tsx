import { FC } from 'react';
import { IFood } from '../../types';
import { Carousel } from 'react-responsive-carousel';
import { closeFoodDetails } from '../../redux/applicationSlice';
import { useDispatch } from 'react-redux';
import style from './FoodDetails.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface IFoodDetailsProps {
    foodItem: IFood;
}

const FoodDetails: FC<IFoodDetailsProps> = ({ foodItem }) => {
    const { name, imagesURL, weight, description, price } = foodItem;

    const dispatch = useDispatch();

    const renderImage = (imageURL: string) => {
        return (
            <img src={imageURL} className={style.Image} />
        );
    }

    const renderCarousel = (imagesURL: string[]) => {
        return (
            <div style={{ width: '30vw', height: '60vh' }}>
                <Carousel useKeyboardArrows dynamicHeight showThumbs={false}>
                    {imagesURL.map(imageURL => renderImage(imageURL))}
                </Carousel>
            </div>
        );
    }

    const ref = useOutsideClick(() => {
        dispatch(closeFoodDetails());
    });

    return (
        <div className={style.Substrate}>
            <div className={style.FoodDetails} ref = {ref}>
                <div
                    className={style.CloseIcon}
                    onClick={() => dispatch(closeFoodDetails())}
                >
                </div>
                <div className={style.LeftSide}>
                    {
                        imagesURL.length > 1
                            ? renderCarousel(imagesURL)
                            : renderImage(imagesURL[0])
                    }
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