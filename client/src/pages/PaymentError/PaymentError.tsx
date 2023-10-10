import { FC } from 'react';
import style from './PaymentError.module.scss';
import Button from '../../GUI/Button/Button';

const PaymentError: FC = () => {
    return (
        <div className={style.Substrate}>
            <div className = {style.PaymentError}>
                <div className = {style.Crossmark}>
                    X
                </div>
                <h2 className={style.Title}>
                    Something went wrong
                </h2>
                <p className={style.Message}>
                    We aren't able to process your payment. Please try again
                </p>
                <Button type = 'error' cssProperties={{ margin: '0 auto' }}>
                    Back to Main Page
                </Button>
            </div>
        </div>
    );
}

export default PaymentError;