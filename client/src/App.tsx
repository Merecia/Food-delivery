import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './App.module.scss';
import MainPage from './pages/MainPage/MainPage';
import Auth from './pages/Auth/Auth';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';

const App: FC = () => {
  return (
    <div className={style.App}>
      <Routes>
        <Route path = '' element = {<MainPage />} />
        <Route path = '/auth' element = {<Auth />} />
        <Route  path = '/payment-success' element = {<PaymentSuccess />} />
      </Routes>
    </div>
  );
}

export default App;