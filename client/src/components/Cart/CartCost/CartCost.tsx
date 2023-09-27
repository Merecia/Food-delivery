import { FC } from 'react';
import style from './CartCost.module.scss';

interface ICartCostProps {
    orderCost: number;
    deliveryCost: number;
}

const CartCost: FC<ICartCostProps> = ({ orderCost,  deliveryCost }) => {
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

export default CartCost;