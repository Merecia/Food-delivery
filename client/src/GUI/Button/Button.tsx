import { FC, ReactNode, CSSProperties } from 'react';
import style from './Button.module.scss';

interface IButtonProps {
    type: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    cssProperties?: CSSProperties;
}

const Button: FC<IButtonProps> = ({
    type,
    children, 
    cssProperties, 
    onClick,
}) => {
    const colors = {
        default: '#FE724C',
        success: 'rgb(50,181,124,255)',
        error: 'rgba(219,89,64,255)'
    };

    type buttonType = keyof typeof colors;

    return (
        <button
            onClick={onClick}
            className={style.Button}
            style={{
                ...cssProperties,
                backgroundColor: colors[type as buttonType] || colors.default
            }}
        >
            {children}
        </button>
    );
}

export default Button;