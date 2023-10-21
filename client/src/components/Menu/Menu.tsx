import { CSSProperties, FC, useEffect } from 'react';
import { ICategory, IFood } from '../../models/interfaces';
import { selectChosenCategoryId } from '../../redux/slices/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Skeleton } from '@mui/material';
import {
    fetchCategories,
    selectCategories,
    selectError as selectCategoriesFetchError,
    selectLoading as selectCategoriesFetchLoading
} from '../../redux/slices/categoriesSlice';
import {
    fetchAllFood,
    fetchFoodByCategory,
    selectFoodList,
    selectError as selectFoodFetchError,
    selectLoading as selectFoodFetchLoading
} from '../../redux/slices/foodSlice';
import style from './Menu.module.scss';
import FoodCard from '../FoodCard/FoodCard';
import CategoryButton from '../CategoryButton/CategoryButton';

const Menu: FC = () => {
    const foodList = useAppSelector(selectFoodList);
    const foodFetchError = useAppSelector(selectFoodFetchError);
    const foodFetchLoading = useAppSelector(selectFoodFetchLoading);
    const categories = useAppSelector(selectCategories);
    const categoriesFetchError = useAppSelector(selectCategoriesFetchError);
    const categoriesFetchLoading = useAppSelector(selectCategoriesFetchLoading);
    const chosenCategoryId = useAppSelector(selectChosenCategoryId);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());

        if (chosenCategoryId) {
            dispatch(fetchFoodByCategory(chosenCategoryId));
        } else {
            dispatch(fetchAllFood());
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

    const renderSkeleton = (
        index?: number,
        cssProperties?: CSSProperties,
    ) => {
        return (
            <Skeleton
                key={index}
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

    const renderSkeletons = (amount: number, cssProperties?: CSSProperties) => {
        let skeletonIndexes = [];

        for (let index = 0; index < amount; index++) {
            skeletonIndexes.push(index);
        }

        return skeletonIndexes.map((index) => 
            renderSkeleton(index, cssProperties)
        );
    }

    const renderFoodCards = (foodList: IFood[]) => {
        const cssProperties: CSSProperties = {
            marginBottom: '50px',
            marginLeft: '15px',
            borderRadius: '20px',
            width: '240px',
            height: '360px'
        }

        if (foodFetchLoading) {
            return renderSkeletons(5, cssProperties);
        } else {
            if (foodList.length === 0) {
                return (
                    <div className={style.NothingFound}>
                        <h2 className={style.NothingFound_Title}>
                            Ничего не найдено в базе данных по вашему запросу
                        </h2>
                    </div>
                );
            } else {
                return foodList.map((foodItem, index) =>
                    renderFoodCard(foodItem, index, cssProperties)
                );
            };
        }
    }

    const renderCategoryButtons = (categories: ICategory[]) => {
        const cssProperties: CSSProperties = {
            width: '120px',
            padding: '25px 0px 30px 0px',
            margin: '0 75px'
        };

        if (categoriesFetchLoading) {
            return renderSkeletons(5, cssProperties);
        } else {
            return categories.map((category, index) =>
                renderCategoryButton(category, index, cssProperties)
            );
        };
    }

    if (foodFetchError || categoriesFetchError) {
        return (
            <div className={style.FetchError}>
                <h2 className={style.FetchError_Title}>
                    Произошла ошибка во время загрузки данных
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