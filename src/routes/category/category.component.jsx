import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import {
  selectCategoriesMap,
  selectIsCategoryLoading,
} from "../../store/categories/category.selector.js";
import Spinner from "../../components/spinner/spinner.component.jsx";
import { useSelector } from "react-redux";
import "./category.style.scss";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsCategoryLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </>
  );
};

export default Category;
