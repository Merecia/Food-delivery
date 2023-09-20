import { FC, useState } from 'react'
import style from './CategoryButton.module.scss';
import { ICategory } from '../../types';

interface ICategoryProps {
    category: ICategory;
}

const Category: FC<ICategoryProps> = ({ category }) => {
    const [active, setActive] = useState(false);
    const { id, name, imageURL } = category;

    const clickHandler = () => {
        console.log(`id: ${id}, name: ${name}, imageURL: ${imageURL}`);
        setActive(!active);
    }

    return (
        <div
            className={style.CategoryButton}
            onClick={clickHandler}
            style = {{ backgroundColor: active ? '#FE724C' : 'white'}}
        >
            <img src={imageURL} alt={name} className = {style.Image} />
            <p style={{ color: active ? 'white' : '#67666D' }}>
                {name}
            </p>
        </div>
    );
}

export default Category;