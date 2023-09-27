import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './App.module.scss';
import MainPage from './pages/MainPage/MainPage';
import Auth from './pages/Auth/Auth';

const App: FC = () => {
  return (
    <div className={style.App}>
      <Routes>
        <Route path = '' element = {<MainPage />} />
        <Route path = '/auth' element = {<Auth />} />
      </Routes>
    </div>
  );
}

export default App;