import { FC, useState } from 'react';
import { cartItems, foodList } from './data';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import style from './App.module.scss';
import FoodDetails from './components/FoodDetails/FoodDetails';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { decrement, increment } from './redux/counterSlice';

const App: FC = () => {
  const [showCart, setShowCart] = useState(false);

  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch();

  return (
    <div className = {style.App}>
      {/* { showCart && <Cart setShowCart = {setShowCart} cartItems = {cartItems} /> }
      <Header setShowCart = {setShowCart} />
      <Menu />
      <FoodDetails foodItem={foodList[0]} /> */}
      <div className = {style.Counter}> {count} </div>
      <button onClick = {() => dispatch(increment())}> Увеличить </button>
      <button onClick = {() => dispatch(decrement())}> Уменьшить </button>
    </div>
  );
}

export default App;
