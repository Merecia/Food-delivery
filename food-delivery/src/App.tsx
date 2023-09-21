import { FC, useState } from 'react';
import { cartItems, foodList } from './data';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import style from './App.module.scss';
import FoodDetails from './components/FoodDetails/FoodDetails';

const App: FC = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className = {style.App}>
      { showCart && <Cart setShowCart = {setShowCart} cartItems = {cartItems} /> }
      <Header setShowCart = {setShowCart} />
      <Menu />
      <FoodDetails foodItem={foodList[0]} />
    </div>
  );
}

export default App;
