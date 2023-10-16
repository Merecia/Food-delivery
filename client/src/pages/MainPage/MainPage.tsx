import { FC } from 'react';
import { selectShowCart } from '../../redux/slices/cartSlice';
import { selectFoodDetails } from '../../redux/slices/foodDetailsSlice';
import { useAppSelector } from '../../redux/hooks';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Cart from '../../components/Cart/Cart';
import FoodDetails from '../../components/FoodDetails/FoodDetails';

const MainPage: FC = () => {
    const showCart = useAppSelector(selectShowCart);
    const foodDetails = useAppSelector(selectFoodDetails);

    return (
        <>
            <Header />
            <Menu />
            {showCart && <Cart />}
            {foodDetails && <FoodDetails foodItem={foodDetails} />}
        </>
    );
}

export default MainPage;