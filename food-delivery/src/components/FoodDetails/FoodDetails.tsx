import { FC, useState, useEffect } from 'react';
import { IFood } from '../../types';
import { Carousel } from 'react-responsive-carousel';
import { closeFoodDetails } from '../../redux/applicationSlice';
import { useDispatch } from 'react-redux';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import style from './FoodDetails.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IFoodDetailsProps {
    foodItem: IFood;
}

const FoodDetails: FC<IFoodDetailsProps> = ({ foodItem }) => {
    const { name, imagesURL, weight, description, price } = foodItem;

    const [rendered, setRendered] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setRendered(true);
    }, []);

    const renderImage = (imageURL: string, index?: number) => {
        return (
            <img
                src={imageURL}
                className={style.Image}
                key={index}
            />
        );
    }

    const renderCarousel = (imagesURL: string[]) => {
        return (
            <div style={{ width: '30vw', height: '60vh' }}>
                <Carousel useKeyboardArrows dynamicHeight showThumbs={false}>
                    {
                        imagesURL.map(
                            (imageURL, index) => renderImage(imageURL, index)
                        )
                    }
                </Carousel>
            </div>
        );
    }
    
    const closeIconClickHandler = () => {
        dispatch(closeFoodDetails());
    }

    const ref = useOutsideClick(() => {
        dispatch(closeFoodDetails());
    });

    return (
        <div
            className={style.Substrate}
            style={{ opacity: rendered ? '1' : '0' }}
        >
            <div
                className={style.FoodDetails}
                style={{ transform: rendered ? 'scaleY(1)' : 'null' }}
                ref={ref}
            >
                <div
                    className={style.CloseIcon}
                    onClick={closeIconClickHandler}
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