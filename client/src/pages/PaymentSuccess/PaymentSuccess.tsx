import { FC } from 'react';
import style from './PaymentSuccess.module.scss';
import Button from '../../GUI/Button/Button';

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
                <Button
                    type='success'
                    cssProperties={{ margin: '0 auto' }}
                >
                    Back to Main Page
                </Button>
            </div>
        </div>
    );
}

export default PaymentSuccess;