import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectShowCart } from '../../redux/cartSlice';
import { selectFoodDetails } from '../../redux/applicationSlice';
import style from './MainPage.module.scss';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Cart from '../../components/Cart/Cart';
import FoodDetails from '../../components/FoodDetails/FoodDetails';

const MainPage: FC = () => {
    const showCart = useSelector(selectShowCart);
    const foodDetails = useSelector(selectFoodDetails);

    return (
        <div className={style.MainPage}>
            <Header />
            <Menu />
            {showCart && <Cart />}
            {foodDetails && <FoodDetails foodItem={foodDetails} />}
        </div>
    )
}

export default MainPage;