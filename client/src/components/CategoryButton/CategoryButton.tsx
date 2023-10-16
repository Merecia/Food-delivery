import { FC, CSSProperties } from 'react'
import { ICategory } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { chooseCategory, selectChosenCategoryId } from '../../redux/slices/categoriesSlice';
import style from './CategoryButton.module.scss';

interface ICategoryButtonProps {
    category: ICategory;
    css?: CSSProperties
}

const ORANGE = '#FE724C';
const DARK = '#67666D';
const WHITE = '#FFFFFF';

const CategoryButton: FC<ICategoryButtonProps> = ({ category, css }) => {
    const { _id, name, imageURL } = category;

    const dispatch = useDispatch();
    const choicedCategoryID = useSelector(selectChosenCategoryId);
    const isActive = choicedCategoryID === _id;

    const clickHandler = () => dispatch(chooseCategory(_id));

    return (
        <div
            className={style.CategoryButton}
            onClick={clickHandler}
            style={{ backgroundColor: isActive ? ORANGE : WHITE, ...css }}
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

export default CategoryButton;