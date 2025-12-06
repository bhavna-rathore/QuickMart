// import "./Styles.css"
import { useNavigate } from "react-router-dom";
// import { useFilter } from "../../contexts/FilterContext";
import styles from "./Category.module.css";

import { addCategoryFilter } from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";


export function Category() {
   const stateProduct = useSelector((state) => state.products);
  
    // const { stateFilter, dispatchFilter } = useFilter();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = (item) => {
        const action = {
            type: "SET_CATEGORY_FILTER",
            payload: item
        };
        // dispatchFilter(action);
        dispatch(addCategoryFilter(item));
        navigate("/productlist")
    }
    
    return (
    <div className={styles.categoryContainer}>
      <div className={styles.categoryGrid}>
        {stateProduct?.category?.map((item) => (
          <div
            key={item.name}
            className={styles.categoryCard}
           onClick={() => handleClick(item.categoryName)}
          >
            <div className={styles.categoryImage}>
              <img src={item.url} alt={item.categoryName} />
            </div>
            <h1 className={styles.categoryName}>{item.categoryName}</h1>
            {/* <p className={styles.categoryName} >{item.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}