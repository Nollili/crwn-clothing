import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';

// Selector to get the 'categories' slice from the root state.
// This is a basic input selector.
const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

// Memoized selector to extract the 'categories' array from the categories slice.
// It recomputes only if the 'categories' slice itself changes.
export const selectCategories = createSelector(
  [selectCategoryReducer], // Dependency: the categories slice
  (categoriesSlice) => categoriesSlice.categories // Projection function: returns the 'categories' array
);

// Memoized selector to transform the categories array into a map (CategoryMap).
// The map keys are lowercase category titles, and values are the items within that category.
// It recomputes only if the 'selectCategories' result changes.
export const selectCategoriesMap = createSelector(
  [selectCategories], // Dependency: the categories array
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items; // Populate the accumulator with title as key and items as value
      return acc;
    }, {} as CategoryMap) // Initial value for the accumulator is an empty CategoryMap
);
