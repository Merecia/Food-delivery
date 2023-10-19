import { FC, useEffect, useState } from 'react';
import { openCart, selectCart } from '../../redux/slices/cartSlice';
import { countFoodItemsInCart } from '../../utils/cart';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IAutocompleteOption } from '../../models/interfaces';
import { fetchFoodById } from '../../redux/slices/foodSlice';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { selectUser, signOut } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    getAutocompleteOptions,
    hideAutocompleteOptions,
    selectAutocompeteOptions,
    selectAutocompeteVisible,
    selectQuery,
    setQuery
} from '../../redux/slices/searchSlice';
import style from './Header.module.scss';
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.svg';
import menu from '../../assets/images/menu.svg';
import cartIcon from '../../assets/images/cartIcon.svg';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Header: FC = () => {
    const dispatch = useAppDispatch();

    const cart = useAppSelector(selectCart);
    const query = useAppSelector(selectQuery);
    const autocompleteOptions = useAppSelector(selectAutocompeteOptions);
    const autocompleteVisible = useAppSelector(selectAutocompeteVisible);
    const user = useAppSelector(selectUser);

    const [userOptionsVisible, setUserOptionsVisible] = useState<boolean>(false);

    const searchDelay = import.meta.env.VITE_SEARCH_DELAY || 800;
    const debouncedQuery = useDebounce<string>(query, searchDelay);

    const foodItemsAmount = countFoodItemsInCart(cart);

    const navigate = useNavigate();

    const cartIconClickHandler = () => {
        dispatch(openCart());
    }

    const searchInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery(event.target.value));
    }

    const renderAutocompleteOptions = (
        autocompleteOptions: IAutocompleteOption[]
    ) => {
        return autocompleteOptions.map((autocompleteOption) => {
            return renderAutocompleteOption(autocompleteOption);
        });
    }

    const renderAutocompleteOption = (
        autocompleteOption: IAutocompleteOption
    ) => {
        return (
            <li
                className={style.Autocomplete_Option}
                onClick={
                    () => autocompleteOptionClickHandler(autocompleteOption._id)
                }
            >
                {autocompleteOption.name}
            </li>
        );
    }

    const searchRef = useOutsideClick(() => {
        dispatch(hideAutocompleteOptions());
    });

    const dropdownMenuRef = useOutsideClick(() => {
        setUserOptionsVisible(false);
    })

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

    const renderDropdownMenu = () => {
        return (
            <List
                sx={{ bgcolor: 'background.paper' }}
                className={style.DropdownMenu}
            >
                <ListItem style={{ padding: '5px' }}>
                    <ListItemButton onClick={() => navigate('/my-account')}>
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary='Мой аккаунт' />
                    </ListItemButton>
                </ListItem>
                <ListItem style={{ padding: '5px' }}>
                    <ListItemButton onClick={signOutHandler}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary='Выйти' />
                    </ListItemButton>
                </ListItem>
            </List>
        );
    }

    const signOutHandler = () => {
        dispatch(signOut());
    }

    const avatarClickHandler = () => {
        setUserOptionsVisible(userOptionsVisible => !userOptionsVisible);
    }

    return (
        <header className={style.Header}>
            <div className={style.LogoSearch}>
                <img
                    src={logo}
                    alt='logo'
                    className={style.Logo}
                    onClick={() => navigate('/')}
                />
                <div className={style.Search} ref={searchRef}>
                    <input
                        type='text'
                        placeholder='Введите название блюда'
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
            </div>
            <div className={style.CartProfile}>
                <div className={style.Cart} onClick={cartIconClickHandler}>
                    <img src={cartIcon} alt='cartIcon' />
                    {
                        foodItemsAmount > 0 &&
                        <div className={style.Cart_Counter}>
                            <span> {foodItemsAmount} </span>
                        </div>
                    }
                </div>
                {
                    user
                        ? <div className={style.Profile} ref={dropdownMenuRef}>
                            <img
                                src={avatar}
                                alt='avatar'
                                className={style.Avatar}
                                onClick={avatarClickHandler}
                            />
                            {userOptionsVisible && renderDropdownMenu()}
                        </div>
                        : <div className={style.SignIn} onClick={() => navigate('./auth')}>
                            <p className={style.SignInLabel}> Войти </p>
                            <PersonOutlineIcon />
                        </div>
                }
                <div className={style.ToggleMenu}>
                    <img
                        src={menu}
                        alt='menu'
                        className={style.MenuIcon}
                    />
                </div>
            </div>
        </header >
    );
}

export default Header;