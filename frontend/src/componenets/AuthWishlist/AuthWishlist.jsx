import { useNavigate } from "react-router-dom"
import { addCartService } from "../../services/Cart/AddCart"
import { removeWishlistService } from "../../services/Wishlist/RemoveWishlist"
// import "./Styles.css"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { addToCartThunk } from "../../redux/slices/cartSlice"
import styles from "./Wishlist.module.css";

export function AuthWishlist() {
  const navigate = useNavigate();
  // const{stateAuth}=useAuth();
  const { isAuth } = useSelector(state => state.auth);
  const { myCart, loading: cartLoading } = useSelector((state) => state.cart);
  const { myWishlist = [] } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch()

  const HandleCart = (item) => {
    if (isAuth) {
      if (myCart.length === 0) {
        dispatch(addToCartThunk(item))
      }
      else {
        if (myCart.find((product) => product._id === item._id)) {
          navigate("/cart")
        }
        else {
          dispatch(addToCartThunk(item))
        }
      }
    }
    else {
      navigate("/login")
      toast.warning("Login Required", {
        position: "bottom-center",
        autoClose: 2000,
      })
    }
  }
  // const { stateCart, dispatchCart } = useCart()

  return (
    <div style={{ minHeight: "30rem" }}>
      <h1 style={{ marginTop: "6rem" }}>My Wishlist ({myWishlist.length} items)</h1>
      <div className={styles.wishlistPageContainer}>
        {myWishlist.length === 0 ? (<div style={{ margin: " 1rem auto", fontSize: "3rem" }}>Your Wishlist Is Empty</div>) : (
          <>
            {myWishlist.map(item => {
              return (

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
                      <span className={styles.discount}>{item.discount} % OFF</span>
                    </p>

                    <div className={styles.wishlistButtons}>
                      <button className={styles.moveToCartBtn} onClick={() => HandleCart(item)}>{myCart.find((products) => products._id === item._id) ? "Go to Cart" : "Add to Cart"}</button>
                      <button className={styles.removeBtn} onClick={() => removeWishlistService(item._id, dispatch)}>Remove</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </>)}
      </div>
    </div>
  )
}