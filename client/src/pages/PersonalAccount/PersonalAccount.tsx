import { FC, useEffect, useState } from 'react';
import { selectUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import style from './PersonalAccount.module.scss';
import PersonalData from '../../components/PersonalData/PersonalData';
import Header from '../../components/Header/Header';
import Substrate from '../../components/Substrate/Substrate';
import Orders from '../../components/Orders/Orders';

const PersonalAccount: FC = () => {
    interface IOption {
        id: string;
        label: string;
    }

    const options: IOption[] = [
        { id: 'personalData', label: 'Личные данные' },
        { id: 'orders', label: 'Мои заказы' },
    ];

    const forms = {
        personalData: <PersonalData />,
        orders: <Orders />
    };

    type formType = keyof typeof forms;

    const user = useAppSelector(selectUser);
    const [selectedOption, setSelectedOption] = useState<IOption>(options[0]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/');
        }
    }, [user]);

    const renderPersonalAccountOptions = (options: IOption[]) => {
        return options.map((option) => renderPersonalAccountOption(option));
    }

    const renderPersonalAccountOption = (option: IOption) => {
        const activeOptionStyle = {
            color: '#000000',
            borderLeft: '2px solid #FE724C',
        };

        const defaultOptionStyle = {
            color: '#A1A1A1',
            border: 'none'
        };
        
        return (
            <li
                key={option.id}
                className={style.PersonalAccount_Option}
                style={
                    selectedOption.id === option.id
                        ? activeOptionStyle
                        : defaultOptionStyle
                }
                onClick={() => setSelectedOption(option)}
            >
                {option.label}
            </li>
        );
    }

    return (
        <Substrate>
            <Header />
            <div className={style.PersonalAccount}>
                <div className={style.PersonalAccount_Form}>
                    <h2 className={style.Title}> 
                        {selectedOption.label} 
                    </h2>
                    { forms[selectedOption.id as formType] }
                </div>
                <ul className={style.PersonalAccount_Options}>
                    {renderPersonalAccountOptions(options)}
                </ul>
            </div>
        </Substrate>
    );
}

export default PersonalAccount;