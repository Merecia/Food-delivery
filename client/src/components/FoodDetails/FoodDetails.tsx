import { FC, useState, useEffect } from 'react';
import { ICartItem, IFood } from '../../types';
import { Carousel } from 'react-responsive-carousel';
import { closeFoodDetails } from '../../redux/foodDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import {
    addFoodToCart,
    decreaseFoodAmountInCart,
    increaseFoodAmountInCart,
    selectCart
} from '../../redux/cartSlice';
import Counter from '../Counter/Counter';
import style from './FoodDetails.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IFoodDetailsProps {
    foodItem: IFood;
}

const FoodDetails: FC<IFoodDetailsProps> = ({ foodItem }) => {
    const { name, imagesURL, weight, description, price } = foodItem;

    const [rendered, setRendered] = useState(false);
    const dispatch = useDispatch();

    const cart = useSelector(selectCart);
    const cartItem = cart.find((cartItem) => cartItem.foodItem._id === foodItem._id);

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
            <div style={{ width: '30vw', height: '100%' }}>
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

    const addToCartButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        dispatch(addFoodToCart(foodItem));
    }

    const increaseFoodAmountClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        dispatch(
            increaseFoodAmountInCart((cartItem as ICartItem).foodItem)
        );
    }

    const decreaseFoodAmountClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        dispatch(
            decreaseFoodAmountInCart((cartItem as ICartItem).foodItem)
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
                    <p className={style.WeightPrice}> {weight} грамм • {price} $ </p>
                    <div className={style.Description}>
                        <h3 className={style.Description_Title}> Описание </h3>
                        <p className={style.Description_Text}> {description} </p>
                    </div>
                    <div className={style.PriceAddingButton}>
                        <h3 className={style.Price}>
                            {
                                cartItem
                                    ? `${cartItem.foodItem.price * cartItem.amount} $`
                                    : `${price} $`
                            }
                        </h3>
                        {
                            cartItem
                                ? <Counter
                                    amount={cartItem.amount}
                                    increaseButtonClickHandler={increaseFoodAmountClickHandler}
                                    decreaseButtonClickHandler={decreaseFoodAmountClickHandler}
                                    css={{ width: '50%' }}
                                />
                                : <button
                                    className={style.AddingButton}
                                    onClick={addToCartButtonClickHandler}
                                >
                                    Добавить
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodDetails;