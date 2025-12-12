import { CategoryItem } from '../categories/category.types';

export type CartItem = CategoryItem & {
  quantity: number;
};
