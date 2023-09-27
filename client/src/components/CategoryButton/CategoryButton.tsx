import { FC } from 'react'
import { ICategory } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { chooseCategory, selectCategoryID } from '../../redux/applicationSlice';
import style from './CategoryButton.module.scss';

interface ICategoryProps {
    category: ICategory;
}

const Category: FC<ICategoryProps> = ({ category }) => {
    const { id, name, imageURL } = category;

    const ORANGE = '#FE724C';
    const DARK = '#67666D';
    const WHITE = '#FFFFFF';

    const dispatch = useDispatch();
    const choicedCategoryID = useSelector(selectCategoryID);
    const isActive = choicedCategoryID === id;

    const clickHandler = () => {
        dispatch(chooseCategory(id));
    }

    return (
        <div
            className={style.CategoryButton}
            onClick={clickHandler}
            style={{ backgroundColor: isActive ? ORANGE : WHITE }}
        >
            <img
                src={imageURL}
                alt={name}
                className={style.Image}
            />
            <p style={{ color: isActive ? WHITE : DARK }}>
                {name}
            </p>
        </div>
    );
}

export default Category;