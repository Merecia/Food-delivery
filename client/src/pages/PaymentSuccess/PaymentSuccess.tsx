import { FC } from 'react';
import style from './PaymentSuccess.module.scss';

const PaymentSuccess: FC = () => {
    return (
        <div className={style.Substrate}>
            <div className={style.PaymentSuccess}>
                <div className={style.Checkmark}>
                    &#10003;
                </div>
                <h2 className={style.Title}>
                    Payment successful
                </h2>
                <div className={style.PaymentData}>
                    <div className={style.Name}>
                        <p className={style.AttributeName}> Name: </p>
                        <p className={style.AttributeValue}> Ivan Ivanov </p>
                    </div>
                    <div className={style.Amount}>
                        <p className={style.AttributeName}> Total amount paid: </p>
                        <p className={style.AttributeValue}> 250$ </p>
                    </div>
                    <div className={style.OrderNumber}>
                        <p className={style.AttributeName}> Order number: </p>
                        <p className={style.AttributeValue}> 1491294912499124 </p>
                    </div>
                </div>
                <button className = {style.ReturnButton}>
                    Back to Main Page
                </button>
            </div>
        </div>
    );
}

export default PaymentSuccess;