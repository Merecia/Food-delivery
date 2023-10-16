import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './App.module.scss';
import MainPage from './pages/MainPage/MainPage';
import Auth from './pages/Auth/Auth';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import PaymentError from './pages/PaymentError/PaymentError';
import PersonalAccount from './pages/PersonalAccount/PersonalAccount';

const App: FC = () => {
  return (
    <div className={style.App}>
      <Routes>
        <Route path='' element={<MainPage />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-error' element={<PaymentError />} />
        <Route path='/my-account' element={<PersonalAccount />} />
      </Routes>
    </div>
  );
}

export default App;