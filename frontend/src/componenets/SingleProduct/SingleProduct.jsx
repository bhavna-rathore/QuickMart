import { useNavigate, useParams } from "react-router-dom";
import styles from "./SingleProduct.module.css";   // NEW MODULE CSS
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistThunk,
  removeFromWishlistThunk
} from "../../redux/slices/wishlistSlice";

import { addToCartThunk } from "../../redux/slices/cartSlice";

export function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.products);
  const { isAuth } = useSelector((state) => state.auth);
  const { myCart } = useSelector((state) => state.cart);
  const { myWishlist = [] } = useSelector((state) => state.wishlist);

  const current = product?.find((item) => item._id === id);

  if (!current) {
    return (
      <div className={styles.singleProductPage}>
        <h2>Product Not Found</h2>
      </div>
    );
  }

  const isInCart = myCart.find((p) => p._id === current._id);
  const isInWishlist = myWishlist.find((p) => p._id === current._id);

  // ---------------- CART ----------------
  const HandleCart = () => {
    if (!isAuth) {
      toast.warning("Login Required", { autoClose: 2000 });
      navigate("/login");
      return;
    }

    if (isInCart) {
      navigate("/cart");
      return;
    }

    dispatch(addToCartThunk(current))
      .unwrap()
      .then(() => toast.success("Added to cart", { autoClose: 1500 }))
      .catch(() => toast.error("Failed to add to cart"));
  };

  // ---------------- WISHLIST ----------------
  const HandleWishlist = () => {
    if (!isAuth) {
      toast.warning("Login Required", { autoClose: 2000 });
      navigate("/login");
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlistThunk(current._id))
        .unwrap()
        .then(() => toast.error("Removed from wishlist", { autoClose: 1500 }));
    } else {
      dispatch(addToWishlistThunk(current))
        .unwrap()
        .then(() => toast.success("Added to wishlist", { autoClose: 1500 }));
    }
  };

  return (
    <div className={styles.singleProductPage}>
      <div className={styles.singleProductContainer}>
        
        {/* IMAGE */}
        <div className={styles.thumbnailWrapper}>
          <img src={current.thumbnail} alt={current.name} />
        </div>

        {/* DETAILS */}
        <div className={styles.detailsWrapper}>
          <h1 className={styles.name}>{current.name}</h1>

          <p className={styles.category}>
            {current.categoryName} • {current.studio}
          </p>

          <p className={styles.price}>
            ₹{current.price}
            <span className={styles.originalPrice}>₹{current.originalPrice}</span>
            <span className={styles.discount}>{current.discount}% OFF</span>
          </p>

          <p className={styles.rating}>⭐ {current.rating}</p>

          <p className={styles.description}>{current.description}</p>

          <div className={styles.buttons}>
            <button className={styles.cartBtn} onClick={HandleCart}>
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>

            <button
              className={`${styles.wishlistBtn} ${
                isInWishlist ? styles.wishlistActive : ""
              }`}
              onClick={HandleWishlist}
            >
              {isInWishlist ? "Remove Wishlist" : "Add Wishlist"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
