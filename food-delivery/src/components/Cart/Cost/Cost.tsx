import { FC } from 'react';
import style from './Cost.module.scss';

interface ICostProps {
    orderCost: number;
    deliveryCost: number;
}

const Cost: FC<ICostProps> = ({ orderCost,  deliveryCost }) => {
    return (
        <div className={style.ordersCost}>
            <div className={style.ordersCost__item}>
                <span> Стоимость заказа без учёта доставки: </span>
                <span> ₴{orderCost} </span>
            </div>
            <div className={style.ordersCost__item}>
                <span> Стоимость доставки: </span>
                <span> ₴{deliveryCost} </span>
            </div>
            <div className={style.ordersCost__item}>
                <span> Стоимость заказа с учётом доставки: </span>
                <span> ₴{orderCost + deliveryCost} </span>
            </div>
        </div>
    );
}

export default Cost;