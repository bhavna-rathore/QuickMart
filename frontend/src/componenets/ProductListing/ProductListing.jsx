import React from "react";
import styles from "./ProductListing.module.css";
import filterStyles from "./FilterSidebar.module.css";

import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from "react-redux";

import {
  setPriceFilter,
  addCategoryFilter,
  removeCategoryFilter,
  setRatingFilter,
  resetFilters
} from "../../redux/slices/filterSlice";

import { addToCartThunk } from "../../redux/slices/cartSlice";
import {
  addToWishlistThunk,
  removeFromWishlistThunk
} from "../../redux/slices/wishlistSlice";

export function ProductListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stateProduct = useSelector(state => state.products);
  const stateFilter = useSelector(state => state.filter);
  const { myCart } = useSelector(state => state.cart);
  const { myWishlist = [] } = useSelector(state => state.wishlist);
  const { isAuth } = useSelector(state => state.auth);

  const { product } = stateProduct;
  const { priceFilter, ratingFilter, categoryFilter, searchFilter } = stateFilter;

  /* ------------------- FILTERS ------------------- */
  const applyFilters = (products) => {
    let result = [...products];

    if (priceFilter === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    if (categoryFilter.length > 0) {
      result = result.filter((item) => categoryFilter.includes(item.categoryName));
    }

    if (ratingFilter > 0) {
      result = result.filter((item) => item.rating >= ratingFilter);
    }

    if (searchFilter.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    return result;
  };

  const filteredProducts = applyFilters(product);

  /* ------------------- CART ------------------- */
  const HandleCart = (item) => {
    if (!isAuth) {
      navigate("/login");
      toast.warning("Login Required", { autoClose: 2000 });
      return;
    }

    if (myCart.find((p) => p._id === item._id)) {
      navigate("/cart");
      return;
    }

    dispatch(addToCartThunk(item))
      .unwrap()
      .then(() => toast.success("Added to cart", { autoClose: 2000 }))
      .catch(() => toast.error("Failed to add", { autoClose: 2000 }));
  };

  /* ------------------- WISHLIST ------------------- */
  const HandleWishlist = (item) => {
    if (!isAuth) {
      navigate("/login");
      toast.warning("Login Required", { autoClose: 2000 });
      return;
    }

    const inWishlist = myWishlist.find((p) => p._id === item._id);

    if (inWishlist) {
      dispatch(removeFromWishlistThunk(item._id))
        .unwrap()
        .then(() => toast.error("Removed from wishlist", { autoClose: 2000 }));
    } else {
      dispatch(addToWishlistThunk(item))
        .unwrap()
        .then(() => toast.success("Added to wishlist", { autoClose: 2000 }));
    }
  };

  /* ------------------- CATEGORY CHECKBOX ------------------- */
  const handleCategoryFilterChange = (event) => {
    const { value, checked } = event.target;
    if (checked) dispatch(addCategoryFilter(value));
    else dispatch(removeCategoryFilter(value));
  };

  return (
   <div className={styles.pageLayout}>
      
      {/* ---------------- FILTER SIDEBAR (KEPT SAME FOR NOW) ---------------- */}
    <div className={filterStyles.sidebar}>
  <h2 className={filterStyles.sidebarTitle}>Filters</h2>

  {/* PRICE */}
  <div className={filterStyles.section}>
    <h3>Price</h3>

    <div className={filterStyles.option}>
      <input
        type="radio"
        name="priceFilter"
        value="lowToHigh"
        checked={priceFilter === "lowToHigh"}
        onChange={(e) => dispatch(setPriceFilter(e.target.value))}
      />
      <label>Low to High</label>
    </div>

    <div className={filterStyles.option}>
      <input
        type="radio"
        name="priceFilter"
        value="highToLow"
        checked={priceFilter === "highToLow"}
        onChange={(e) => dispatch(setPriceFilter(e.target.value))}
      />
      <label>High to Low</label>
    </div>
  </div>

  {/* CATEGORY */}
  <div className={filterStyles.section}>
    <h3>Category</h3>

    {["Action", "Adventure", "RPG", "Strategy", "Sports"].map((cat) => (
      <div className={filterStyles.option} key={cat}>
        <input
          type="checkbox"
          value={cat}
          checked={categoryFilter.includes(cat)}
          onChange={(e) => {
            if (e.target.checked) dispatch(addCategoryFilter(cat));
            else dispatch(removeCategoryFilter(cat));
          }}
        />
        <label>{cat}</label>
      </div>
    ))}
  </div>

  {/* RATING */}
  <div className={filterStyles.section}>
    <h3>Ratings</h3>
    <input
      type="range"
      min="0"
      max="5"
      step="0.5"
      value={ratingFilter}
      onChange={(e) => dispatch(setRatingFilter(Number(e.target.value)))}
      className={filterStyles.slider}
    />
    <p className={filterStyles.ratingLabel}>
      Minimum Rating: {ratingFilter}
    </p>
  </div>

  <button
    className={filterStyles.resetBtn}
    onClick={() => dispatch(resetFilters())}
  >
    Reset Filters
  </button>
</div>


      {/* ---------------- PRODUCT GRID ---------------- */}
      <div style={{ marginLeft: "14vw", width: "100%" }}>
        
        <h1 style={{ margin: "5rem auto 0", fontSize: "2rem" }}>
          Showing all Products ({filteredProducts.length})
        </h1>

        <div className={styles.productGrid}>
          {filteredProducts.map((item) => {
            const inCart = myCart.find((p) => p._id === item._id);
            const inWishlist = myWishlist.find((p) => p._id === item._id);

            return (
              <div className={styles.card} key={item._id}>
                
                <NavLink to={`/singleproduct/${item._id}`}>
                  <img
                    src={item.thumbnail}
                    alt="game"
                    className={styles.thumbnail}
                  />

                  <h2 className={styles.name}>{item.name}</h2>
                  <p className={styles.category}>{item.categoryName}</p>

                  <p className={styles.priceRow}>
                    ₹{item.price}
                    <span className={styles.originalPrice}>₹{item.originalPrice}</span>
                    <span className={styles.discount}>{item.discount}% OFF</span>
                  </p>
                </NavLink>

                <button
                  className={inCart ? styles.goToCartBtn : styles.addCartBtn}
                  onClick={() => HandleCart(item)}
                >
                  {inCart ? "Go to Cart" : "Add to Cart"}
                </button>

                <button
                  className={styles.wishlistBtn}
                  onClick={() => HandleWishlist(item)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: inWishlist ? "red" : "white" }}
                  />
                </button>

                <p style={{ marginTop: "10px", fontSize: "1rem" }}>
                  <FontAwesomeIcon icon={faStar} /> {item.rating}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
