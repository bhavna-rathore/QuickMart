import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk } from "../../redux/slices/cartSlice";
import { removeFromWishlistThunk } from "../../redux/slices/wishlistSlice";
import styles from "./Wishlist.module.css";

export function AuthWishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.auth);
  const { myCart } = useSelector((state) => state.cart);
  const { myWishlist = [] } = useSelector((state) => state.wishlist);

  // Handle Move to Cart
  const HandleCart = (item) => {
    if (!isAuth) {
      toast.warning("Login Required", { position: "bottom-center", autoClose: 2000 });
      navigate("/login");
      return;
    }

    const existsInCart = myCart.find((product) => product._id === item._id);

    if (existsInCart) {
      navigate("/cart");
    } else {
      dispatch(addToCartThunk(item));
      toast.success("Added to Cart", { position: "bottom-center", autoClose: 2000 });
    }
  };

  // Handle Remove from Wishlist
  const HandleRemove = (id) => {
    dispatch(removeFromWishlistThunk(id))
      .unwrap()
      .then(() =>
        toast.error("Removed from Wishlist", { position: "bottom-center", autoClose: 1500 })
      )
      .catch(() =>
        toast.error("Error removing item", { position: "bottom-center", autoClose: 1500 })
      );
  };

  return (
    <div style={{ minHeight: "30rem" }}>
      <h1 style={{ marginTop: "6rem" }}>My Wishlist ({myWishlist.length} items)</h1>

      <div className={styles.wishlistPageContainer}>
        {myWishlist.length === 0 ? (
          <div style={{ margin: "1rem auto", fontSize: "3rem" }}>Your Wishlist Is Empty</div>
        ) : (
          <>
            {myWishlist.map((item) => (
              <div className={styles.wishlistCardContainer} key={item._id}>
                <div className={styles.wishlistCardThumbnail}>
                  <img src={item.thumbnail} alt="thumbnail" />
                </div>

                <div className={styles.wishlistCardDetails}>
                  <h2 className={styles.wishlistCardName}>{item.name}</h2>
                  <p className={styles.wishlistCardCategory}>{item.categoryName}</p>

                  <p className={styles.wishlistCardPrice}>
                    ₹ {item.price}
                    <span className={styles.originalPrice}>₹ {item.originalPrice}</span>
                    <span className={styles.discount}>{item.discount}% OFF</span>
                  </p>

                  <div className={styles.wishlistButtons}>
                    <button
                      className={styles.moveToCartBtn}
                      onClick={() => HandleCart(item)}
                    >
                      {myCart.find((prod) => prod._id === item._id)
                        ? "Go to Cart"
                        : "Add to Cart"}
                    </button>

                    <button
                      className={styles.removeBtn}
                      onClick={() => HandleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
