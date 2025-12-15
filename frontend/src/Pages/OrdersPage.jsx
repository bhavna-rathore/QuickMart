import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersThunk,
  cancelOrderThunk
} from "../redux/slices/orderSlice";
import styles from "./OrdersPage.module.css";

export default function OrdersPage() {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.orders);
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) dispatch(fetchOrdersThunk());
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return <div className={styles.message}>Please login to view your orders.</div>;
  }
  if (loading) {
    return <div className={styles.message}>Loading your orders...</div>;
  }
  if (!orders || orders.length === 0) {
    return <div className={styles.message}>You haven't placed any orders yet.</div>;
  }

  return (
    <div className={styles.ordersPage}>
      <h1 className={styles.title}>Your Orders</h1>

      <div className={styles.ordersList}>
        {orders.map((order) => {
          // Calculate cancellation window
          const createdTime = new Date(order.createdAt).getTime();
          const now = Date.now();
          const diffMinutes = (now - createdTime) / (1000 * 60);

          const canCancel =
            diffMinutes <= 5 && order.status !== "Cancelled";

          return (
            <div key={order._id} className={styles.orderCard}>
              {/* Header */}
              <div className={styles.orderHeader}>
                <div>
                  <span className={styles.orderLabel}>Order ID:</span>{" "}
                  {order._id}
                </div>
                <div className={styles.orderDate}>
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              {/* STATUS */}
              <div className={styles.statusRow}>
                <span
                  className={
                    order.status === "Cancelled"
                      ? styles.statusCancelled
                      : styles.statusPlaced
                  }
                >
                  {order.status}
                </span>

                {order.status === "Cancelled" && (
                  <span className={styles.cancelledAt}>
                    Cancelled at:{" "}
                    {new Date(order.cancelledAt).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Items */}
              <div className={styles.itemList}>
                {order.items.map((it) => (
                  <div key={it._id} className={styles.itemRow}>
                    <img
                      src={it.thumbnail}
                      alt={it.name}
                      className={styles.itemImg}
                    />
                    <div className={styles.itemDetails}>
                      <p className={styles.itemName}>{it.name}</p>
                      <p className={styles.itemQty}>Qty: {it.qty}</p>
                      <p className={styles.itemPrice}>₹{it.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className={styles.orderFooter}>
                <div className={styles.totalText}>
                  <span>Total:</span> ₹{order.total}
                </div>

                <div className={styles.addressBox}>
                  <p className={styles.addressTitle}>Delivery Address</p>
                  <p>{order.address.tempName}</p>
                  <p>
                    {order.address.tempAddress}, {order.address.tempCity}
                  </p>
                  <p>
                    {order.address.tempState}, {order.address.tempCountry}
                  </p>
                  <p>Pin: {order.address.tempPincode}</p>
                  <p>Phone: {order.address.tempPhoneNo}</p>
                </div>
              </div>

              {/* CANCEL BUTTON */}
              {canCancel && (
                <button
                  className={styles.cancelBtn}
                  onClick={() => dispatch(cancelOrderThunk(order._id))}
                >
                  Cancel Order
                </button>
              )}

              {/* If not cancellable, and not cancelled */}
              {!canCancel && order.status !== "Cancelled" && (
                <p className={styles.expiredText}>
                  Cancellation window has expired.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
