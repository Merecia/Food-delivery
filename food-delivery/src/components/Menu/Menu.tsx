import { FC } from 'react'
import { categories, foodList } from '../../data';
import { ICategory, IFood } from '../../types';
import style from './Menu.module.scss';
import FoodCard from '../FoodCard/FoodCard';
import Category from '../CategoryButton/CategoryButton';

const Menu: FC = () => {
    const renderFoodCard = (foodItem: IFood, index: number) => {
        return (
            <FoodCard
                foodItem={foodItem}
                key={index}
                css={{
                    marginBottom: '50px',
                    marginLeft: '15px'
                }}
            />
        );
    }

    const renderCategoryButton = (category: ICategory, index: number) => {
        return (
            <Category
                category={category}
                key={index}
            />
        );
    }

    const renderFoodCards = (foodList: IFood[]) => {
        return foodList.map(
            (foodItem, index) => renderFoodCard(foodItem, index)
        );
    }

    const renderCategoryButtons = (categories: ICategory[]) => {
        return categories.map(
            (category, index) => renderCategoryButton(category, index)
        );
    }

    return (
        <div className={style.Menu}>
            <div className={style.Categories}>
                {renderCategoryButtons(categories)}
            </div>
            <div className={style.FoodCards}>
                {renderFoodCards(foodList)}
            </div>
        </div>
    );
}

export default Menu