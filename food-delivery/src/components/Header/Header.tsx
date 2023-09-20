import { FC } from 'react';
import style from './Header.module.scss';
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.svg';
import menu from '../../assets/images/menu.svg';
import cart from '../../assets/images/cart.svg';

const Header: FC = () => {
    return (
        <header className = {style.Header}>
            <img src={logo} alt="logo" className={style.Logo} />
            <div className={style.Search}>
                <input
                    type="text"
                    placeholder="Введите название блюда"
                    className={style.SearchInput}
                />
            </div>
            <div className={style.Cart}>
                <img src={cart} alt="cartIcon" className = {style.Cart_Icon}/>
                <div className = {style.Cart_Counter}>
                    <span> 3 </span>
                </div>
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