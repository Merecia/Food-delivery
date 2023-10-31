import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetToInitial } from '../../redux/slices/paymentSlice';
import { useAppDispatch } from '../../redux/hooks';
import style from './PaymentError.module.scss';
import Button from '../../GUI/Button/Button';
import Substrate from '../../components/Substrate/Substrate';
import Header from '../../components/Header/Header';

const PaymentError: FC = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const backButtonClickHandler = () => {
        dispatch(resetToInitial());
        navigate('/');
    }

    return (
        <Substrate>
            <Header />
            <div className={style.PaymentError}>
                <div className={style.Crossmark}>
                    X
                </div>
                <h2 className={style.Title}>
                    Ошибка при оплате
                </h2>
                <p className={style.Message}>
                    Мы не смогли обработать ваш платёж. Повторите ещё раз
                </p>
                <Button
                    type='error'
                    cssProperties={{ margin: '0 auto' }}
                    onClick={backButtonClickHandler}
                >
                    Подтвердить
                </Button>
            </div>
        </Substrate>
    );
}

export default PaymentError;