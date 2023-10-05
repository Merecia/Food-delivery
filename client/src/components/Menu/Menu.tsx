import { CSSProperties, FC, useEffect } from 'react';
import { ICategory, IFood } from '../../types';
import { useSelector } from 'react-redux';
import { selectChosenCategoryId } from '../../redux/categoriesSlice';
import { useAppDispatch } from '../../redux/hooks';
import { Skeleton } from '@mui/material';
import {
    fetchCategories,
    selectCategories,
    selectError as selectCategoriesFetchError,
    selectLoading as selectCategoriesFetchLoading
} from '../../redux/categoriesSlice';
import {
    fetchAllFood,
    fetchFoodByCategory,
    selectFoodList,
    selectError as selectFoodFetchError,
    selectLoading as selectFoodFetchLoading
} from '../../redux/foodSlice';
import style from './Menu.module.scss';
import FoodCard from '../FoodCard/FoodCard';
import CategoryButton from '../CategoryButton/CategoryButton';

const Menu: FC = () => {
    const foodList = useSelector(selectFoodList);
    const foodFetchError = useSelector(selectFoodFetchError);
    const foodFetchLoading = useSelector(selectFoodFetchLoading);

    const categories = useSelector(selectCategories);
    const categoriesFetchError = useSelector(selectCategoriesFetchError);
    const categoriesFetchLoading = useSelector(selectCategoriesFetchLoading);
    const chosenCategoryId = useSelector(selectChosenCategoryId);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }

        if (foodList.length === 0) {
            if (chosenCategoryId) {
                dispatch(fetchFoodByCategory(chosenCategoryId));
            } else {
                dispatch(fetchAllFood());
            }
        }
    }, []);

    useEffect(() => {
        if (chosenCategoryId) {
            dispatch(fetchFoodByCategory(chosenCategoryId));
        } else {
            dispatch(fetchAllFood());
        }
    }, [chosenCategoryId]);

    const renderFoodCard = (
        foodItem: IFood,
        index: number,
        cssProperties?: CSSProperties
    ) => {
        return (
            <FoodCard
                foodItem={foodItem}
                key={index}
                css={cssProperties}
            />
        );
    }

    const renderSkeleton = (cssProperties?: CSSProperties) => {
        return (
            <Skeleton
                animation='wave'
                variant='rounded'
                style={cssProperties}
            />
        );
    }

    const renderCategoryButton = (
        category: ICategory,
        index: number,
        cssProperties?: CSSProperties
    ) => {
        return (
            <CategoryButton
                category={category}
                key={index}
                css={cssProperties}
            />
        );
    }

    const renderFoodCards = (foodList: IFood[]) => {
        const foodCardCssProperties: CSSProperties = {
            marginBottom: '50px',
            marginLeft: '15px',
            borderRadius: '20px',
            width: '240px',
            height: '360px'
        }

        if (foodFetchLoading) {
            return Array(5).fill(
                renderSkeleton(foodCardCssProperties)
            );
        } else {
            if (foodList.length === 0) {
                return (
                    <div className={style.NothingFound}>
                        <h2 className={style.NothingFound_Title}>
                            Nothing was found in the database matching your request
                        </h2>
                    </div>
                );
            } else return foodList.map((foodItem, index) =>
                renderFoodCard(
                    foodItem, index, foodCardCssProperties
                )
            );
        }
    }

    const renderCategoryButtons = (categories: ICategory[]) => {
        const categoryButtonCssProperties: CSSProperties = {
            width: '120px',
            padding: '25px 0px 30px 0px',
            margin: '0 75px'
        };

        if (categoriesFetchLoading) {
            return Array(5).fill(
                renderSkeleton(
                    categoryButtonCssProperties
                )
            );
        } else return categories.map((category, index) => {
            return renderCategoryButton(
                category, index, categoryButtonCssProperties
            );
        });
    }

    if (foodFetchError || categoriesFetchError) {
        return (
            <div className={style.FetchError}>
                <h2 className={style.FetchError_Title}>
                    An error occurred during data loading
                </h2>
            </div>
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