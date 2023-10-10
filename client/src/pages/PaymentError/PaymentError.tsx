import { FC } from 'react';
import style from './PaymentError.module.scss';

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
                <button className = {style.ReturnButton}>
                    Back to Main Page
                </button>
            </div>
        </div>
    );
}

export default PaymentError;