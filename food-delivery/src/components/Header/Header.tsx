import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countFoodItemsInCart } from '../../utils/helper';
import { openCart, selectCart } from '../../redux/cartSlice';
import style from './Header.module.scss';
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.svg';
import menu from '../../assets/images/menu.svg';
import cartIcon from '../../assets/images/cartIcon.svg';

const Header: FC = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const foodItemsAmount = countFoodItemsInCart(cart);

    const cartIconClickHandler = () => {
        dispatch(openCart());
    }

    return (
        <header className={style.Header}>
            <img src={logo} alt="logo" className={style.Logo} />
            <div className={style.Search}>
                <input
                    type="text"
                    placeholder="Введите название блюда"
                    className={style.SearchInput}
                />
            </div>
            <div
                className={style.Cart}
                onClick={cartIconClickHandler}
            >
                <img
                    src={cartIcon}
                    alt="cartIcon"
                    className={style.Cart_Icon}
                />
                {
                    foodItemsAmount > 0 &&
                    <div className={style.Cart_Counter}>
                        <span> {foodItemsAmount} </span>
                    </div>
                }
            </div>
            <div className={style.Profile} >
                <img src={avatar} alt="avatar" className={style.Avatar} />
            </div>
            <div className={style.ToggleMenu}>
                <img
                    src={menu}
                    alt="menu"
                    className={style.MenuIcon}
                />
            </div>
        </header>
    );
}

export default Header