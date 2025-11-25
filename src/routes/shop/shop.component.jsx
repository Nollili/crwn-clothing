import "./shop.styles.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from "../categories-preview/categories-preview.jsx";
import Category from '../category/category.component.jsx';
import {fetchCategoriesAsync} from "../../store/categories/category.action.js";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;