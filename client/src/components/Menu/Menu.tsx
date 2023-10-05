import { FC, useEffect } from 'react'
import { categories } from '../../data';
import { ICategory, IFood } from '../../types';
import { useSelector } from 'react-redux';
import { selectCategoryId } from '../../redux/mainPageSlice';
import { 
    fetchAllFood,
    fetchFoodByCategory, 
    selectError, 
    selectFoodList, 
    selectLoading 
} from '../../redux/foodSlice';
import style from './Menu.module.scss';
import FoodCard from '../FoodCard/FoodCard';
import Category from '../CategoryButton/CategoryButton';
import { useAppDispatch } from '../../redux/hooks';

const Menu: FC = () => {
    const foodList = useSelector(selectFoodList);
    const error = useSelector(selectError);
    const loading = useSelector(selectLoading);
    const selectedCategoryId = useSelector(selectCategoryId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllFood());
    }, []);

    useEffect(() => {
        if (selectedCategoryId) {
            dispatch(
                fetchFoodByCategory(selectedCategoryId)
            );
        }
    }, [selectedCategoryId]);

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

    if (loading) {
        return 'Loading';
    }

    if (error) {
        return 'Error';
    }

    return (
        <div className={style.Menu}>
            <div className={style.Categories}>
                {renderCategoryButtons(categories)}
            </div>
            <div className={style.FoodCards}>
                {foodList && renderFoodCards(foodList)}
            </div>
        </div>
    );
}

export default Menu