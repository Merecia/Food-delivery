import { FC, useState, useEffect } from 'react';
import { ICartItem, IFood } from '../../models/interfaces';
import { Carousel } from 'react-responsive-carousel';
import { closeFoodDetails } from '../../redux/slices/foodDetailsSlice';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    addFoodToCart,
    decreaseFoodAmountInCart,
    increaseFoodAmountInCart,
    selectCart
} from '../../redux/slices/cartSlice';
import Counter from '../../GUI/Counter/Counter';
import style from './FoodDetails.module.scss';
import Button from '../../GUI/Button/Button';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IFoodDetailsProps {
    foodItem: IFood;
}

const FoodDetails: FC<IFoodDetailsProps> = ({ foodItem }) => {
    const { name, imagesURL, weight, description, price } = foodItem;

    const [rendered, setRendered] = useState(false);

    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);

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
                                : <Button
                                    type='default'
                                    onClick={addToCartButtonClickHandler}
                                    cssProperties={{
                                        padding: '15px 20px',
                                        fontSize: '15px',
                                        width: '20vw'
                                    }}
                                >
                                    Добавить
                                </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodDetails;