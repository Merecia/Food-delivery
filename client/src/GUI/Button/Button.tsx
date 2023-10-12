import { FC, ReactNode, CSSProperties } from 'react';
import style from './Button.module.scss';

interface IButtonProps {
    type: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    cssProperties?: CSSProperties;
    disabled?: boolean;
}

const Button: FC<IButtonProps> = ({
    type,
    children,
    cssProperties,
    onClick,
    disabled
}) => {
    const colors = {
        default: '#FE724C',
        success: '#32B57C',
        error: '#DB5940'
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
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;