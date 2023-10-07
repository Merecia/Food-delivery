import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { countFoodItemsInCart } from '../../utils/helper';
import { openCart, selectCart } from '../../redux/cartSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch } from '../../redux/hooks';
import { IAutocompleteOption } from '../../types';
import { 
    getAutocompleteOptions, 
    hideAutocompleteOptions, 
    selectAutocompeteOptions, 
    selectAutocompeteVisible, 
    selectQuery, 
    setQuery 
} from '../../redux/searchSlice';
import style from './Header.module.scss';
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.svg';
import menu from '../../assets/images/menu.svg';
import cartIcon from '../../assets/images/cartIcon.svg';
import { fetchFoodById } from '../../redux/foodSlice';

const Header: FC = () => {
    const dispatch = useAppDispatch();

    const cart = useSelector(selectCart);
    const query = useSelector(selectQuery);
    const autocompleteOptions = useSelector(selectAutocompeteOptions);
    const autocompleteVisible = useSelector(selectAutocompeteVisible);

    const searchDelay = import.meta.env.VITE_SEARCH_DELAY || 800;
    const debouncedQuery = useDebounce<string>(query, searchDelay);

    const foodItemsAmount = countFoodItemsInCart(cart);

    const cartIconClickHandler = () => {
        dispatch(openCart());
    }

    const searchInputChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(setQuery(event.target.value));
    }

    const renderAutocompleteOptions = (
        autocompleteOptions: IAutocompleteOption[]
    ) => {
        return autocompleteOptions.map(autocompleteOption => {
            return renderAutocompleteOption(autocompleteOption);
        });
    }

    const renderAutocompleteOption = (
        autocompleteOption: IAutocompleteOption
    ) => {
        return (
            <li 
                className={style.Autocomplete_Option}
                onClick = {
                    () => autocompleteOptionClickHandler(autocompleteOption._id)
                }
            >
                {autocompleteOption.name}
            </li>
        );
    }

    const autocompleteOptionClickHandler = (_id: string) => {
        dispatch(fetchFoodById(_id));
        dispatch(hideAutocompleteOptions());
    }

    useEffect(() => {
        if (debouncedQuery.length !== 0) {
            dispatch(
                getAutocompleteOptions(debouncedQuery)
            );
        }
    }, [debouncedQuery]);

    return (
        <header className={style.Header}>
            <img src={logo} alt="logo" className={style.Logo} />
            <div className={style.Search}>
                <input
                    type="text"
                    placeholder="Введите название блюда"
                    className={style.SearchInput}
                    value={query}
                    onChange={searchInputChangeHandler}
                />
                <ul className={style.Autocomplete}>
                    { 
                        autocompleteVisible 
                        && debouncedQuery.length !== 0 
                        && renderAutocompleteOptions(autocompleteOptions)     
                    }
                </ul>
            </div>
            <div
                className={style.Cart}
                onClick={cartIconClickHandler}
            >
                <img
                    src={cartIcon}
                    alt="cartIcon"
                    className={style.Cart_Icon}
                />
                {
                    foodItemsAmount > 0 &&
                    <div className={style.Cart_Counter}>
                        <span> {foodItemsAmount} </span>
                    </div>
                }
            </div>
            <div className={style.Profile} >
                <img src={avatar} alt="avatar" className={style.Avatar} />
            </div>
            <div className={style.ToggleMenu}>
                <img
                    src={menu}
                    alt="menu"
                    className={style.MenuIcon}
                />
            </div>
        </header >
    );
}

export default Header