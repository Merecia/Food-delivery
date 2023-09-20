import React from 'react'
import style from './Button.module.css'

const Button = ({label, isDisabled, onClick}) => {
    const cls = [style.Button]

    if (isDisabled) cls.push(style.Disabled)

    if (isDisabled) console.log('Кнопка заблокирована')
    else console.log('Кнопка разблокирована')
    
    return (
        <input 
            disabled = {isDisabled ? "disabled" : false}
            type = 'submit'
            className = {cls.join(' ')} 
            value = {label}
            onClick ={onClick}
        /> 
    );
}

export default Button