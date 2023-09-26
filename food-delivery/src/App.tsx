import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectFoodDetails } from './redux/applicationSlice';
import { selectShowCart } from './redux/cartSlice';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import style from './App.module.scss';
import FoodDetails from './components/FoodDetails/FoodDetails';

const App: FC = () => {
  const showCart = useSelector(selectShowCart);
  const foodDetails = useSelector(selectFoodDetails);

  return (
    <div className={style.App}>
      <Header />
      <Menu />
      {showCart && <Cart />}
      {foodDetails && <FoodDetails foodItem={foodDetails} />}
    </div>
  );
}

export default App;