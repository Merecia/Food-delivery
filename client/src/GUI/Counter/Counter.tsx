import { FC, CSSProperties } from 'react';
import { amountFormatting } from '../../utils/formatting';
import style from './Counter.module.scss';

interface ICounterProps {
    amount: number;
    decreaseButtonClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
    increaseButtonClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
    css?: CSSProperties;
}

const Counter: FC<ICounterProps> = ({
    amount,
    decreaseButtonClickHandler,
    increaseButtonClickHandler,
    css
}) => {
    return (
        <div className={style.Counter} style={css}>
            <button
                className={style.Decrease}
                onClick={decreaseButtonClickHandler}
            >
                ꟷ
            </button>
            <span className={style.Counter}>
                {amountFormatting(amount)}
            </span>
            <button
                className={style.Increase}
                onClick={increaseButtonClickHandler}
            >
                🞣
            </button>
        </div>
    );
}

export default Counter;