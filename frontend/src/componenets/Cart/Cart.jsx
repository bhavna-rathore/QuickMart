import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getCartThunk,
  updateQtyThunk,
  removeFromCartThunk
} from "../../redux/slices/cartSlice";

import {
  addToWishlistThunk,
  getWishlistThunk
} from "../../redux/slices/wishlistSlice";

import styles from "./Cart.module.css";

export function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { myCart, loading } = useSelector((state) => state.cart);
  const { myWishlist } = useSelector((state) => state.wishlist);
  const { isAuth } = useSelector((state) => state.auth);


  const finalPrice = myCart.reduce(
    (acc, curr) => acc + curr.originalPrice * curr.qty,
    0
  );

  const discount = myCart.reduce(
    (acc, curr) => acc + (curr.originalPrice - curr.price) * curr.qty,
    0
  );

  const total = finalPrice - discount;

  const handleQty = (item, type) => {
    if (type === "increment") {
      dispatch(updateQtyThunk({ id: item._id, actionType: "increment" }));
    } else if (type === "decrement") {
      if (item.qty > 1) {
        dispatch(updateQtyThunk({ id: item._id, actionType: "decrement" }));
      } else {
        dispatch(removeFromCartThunk(item._id));
      }
    }
  };

  const handleWishlist = async (item) => {
    const existing = myWishlist.find((p) => p._id === item._id);

     dispatch(removeFromCartThunk(item._id));

    if (!existing) {
      dispatch(addToWishlistThunk(item))
        .unwrap()
        .then(() =>
          toast.success("Moved to wishlist", { autoClose: 1500 })
        );
    } else {
      toast.warning("Already in wishlist", { autoClose: 1500 });
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1 style={{ marginTop: "6rem" }}>
        My Cart ({myCart.length} items)
      </h1>

      {myCart.length === 0 ? (
        <div className={styles.emptyCart}>Your Cart Is Empty</div>
      ) : (
        <div className={styles.cartPageContainer}>
          {/* CART ITEMS LIST */}
          <div className={styles.cartItems}>
            {myCart.map((item) => (
              <div className={styles.cartCard} key={item._id}>
                <div className={styles.thumbnail}>
                  <img src={item.thumbnail} alt={item.name} />
                </div>

                <div className={styles.details}>
                  <h2 className={styles.name}>{item.name}</h2>
                  <p className={styles.category}>{item.categoryName}</p>

                  <p className={styles.priceRow}>
                    <span className={styles.price}>₹ {item.price}</span>
                    <span className={styles.originalPrice}>
                      ₹ {item.originalPrice}
                    </span>
                    <span className={styles.discount}>
                      {item.discount}% OFF
                    </span>
                  </p>

                  <div className={styles.quantityRow}>
                    Qauntity
                    <button
                      className={styles.qtyBtn}
                      onClick={() => handleQty(item, "decrement")}
                    >
                      -
                    </button>

                    <span className={styles.qtyValue}>{item.qty}</span>

                    <button
                      className={styles.qtyBtn}
                      onClick={() => handleQty(item, "increment")}
                    >
                      +
                    </button>
                  </div>
<div className={styles.buttons}>
  
                  <button
                    className={styles.removeBtn}
                    onClick={() => dispatch(removeFromCartThunk(item._id))}
                  >
                    Remove
                  </button>

                  <button
                    className={styles.wishlistBtn}
                    onClick={() => handleWishlist(item)}
                  >
                    Move to Wishlist
                  </button>
              </div>  
              </div>
              </div>
            ))}
          </div>

          {/* CART SUMMARY */}
          <div className={styles.cartDetails}>
            <h2 className={styles.summaryTitle}>Cart Summary</h2>

            <div className={styles.summaryRow}>
              <p>Price ({myCart.reduce((acc, cv) => acc + cv.qty, 0)} items)</p>
              <p>₹{finalPrice}</p>
            </div>

            <div className={styles.summaryRow}>
              <p>Discount</p>
              <p>₹{discount}</p>
            </div>

            <div className={styles.summaryRow}>
              <p>Delivery Charges</p>
              <p>Free</p>
            </div>

            <div className={styles.totalRow}>
              <p>Total Amount</p>
              <p>₹{total}</p>
            </div>

            <p className={styles.savings}>
              You saved ₹{discount} on this order
            </p>

            <button
              className={styles.checkoutBtn}
              onClick={() => navigate("/checkout")}
            >
              Check Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
