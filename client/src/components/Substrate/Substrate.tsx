import { FC, ReactNode } from 'react';
import style from './Substrate.module.scss';

interface ISubstrateProps {
    children?: ReactNode;
}

const Substrate: FC<ISubstrateProps> = ({ children }) => {
    return (
        <div className={style.Substrate}>
            {children}
        </div>
    );
}

export default Substrate;