import { FC, useState } from 'react';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import style from './App.module.scss';
import { cartItems } from './data';

const App: FC = () => {
  const [showCart, setShowCart] = useState(true);

  return (
    <div className = {style.App}>
      { !showCart && <Cart setShowCart = {setShowCart} showCart = {showCart} cartItems = {cartItems} /> }
      <Header />
      <Menu />
      <button onClick = {() => setShowCart(!showCart)}> Открыть корзину </button>
    </div>
  );
}

export default App;
