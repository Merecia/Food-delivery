import { FC } from 'react';
import style from './Loader.module.scss';

const Loader: FC = () => {
    return (
        <div className={style.ldsDualRing}></div>
    );
}

export default Loader;