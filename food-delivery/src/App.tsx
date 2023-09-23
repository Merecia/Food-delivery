import { FC } from 'react';
import { cartItems } from './data';
import { useAppSelector } from './redux/hooks';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import style from './App.module.scss';
import FoodDetails from './components/FoodDetails/FoodDetails';

const App: FC = () => {
  const showCart = useAppSelector((state) => state.application.showCart);
  const foodDetails = useAppSelector((state) => state.application.foodDetails);

  return (
    <div className={style.App}>
      <Header />
      <Menu />
      {showCart && <Cart cartItems={cartItems} />}
      {foodDetails && <FoodDetails foodItem={foodDetails} />}
    </div>
  );
}

export default App;