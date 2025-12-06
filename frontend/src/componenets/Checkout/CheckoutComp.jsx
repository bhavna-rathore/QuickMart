import React, { useState } from 'react'
import styles from './Checkout.module.css'
import AddressModel from '../AdressModel/AddressModel';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function CheckoutComp() {
    const [showAddressModel, setShowAddressModel] = useState(false);
    const localAddress = JSON.parse(localStorage.getItem("userAddress"));
    const [selectedAddress, setSelectedAddress] = useState({});
    const setaddress = localAddress ? localAddress : []
    const [address, setAddress] = useState(setaddress);


    // const { stateCart } = useCart();
     const { myCart } = useSelector((state) => state.cart);

    const finalPrice = myCart.reduce(
        (acc, curr) => (acc += curr.originalPrice * curr.qty),
        0
    );
    const Discount = myCart.reduce(
        (acc, curr) => (acc += ((curr.originalPrice - curr.price) * curr.qty)),
        0
    );
    const total = finalPrice - Discount;
    const HandleOrder =()=>
    {
        if(Object.keys(selectedAddress).length)
        toast.success("Order Placed", {
            position: "bottom-center",
            autoClose: 2000,
          });
        else{
            toast.error("Please Select Address", {
                position: "bottom-center",
                autoClose: 2000,
              });
        }
    }

    // const bgColor=(item)=>
    // {
    //     if(item.tempName===selectedAddress.tempName)
    //     {
    //         return "#29b9f0ff"
    //     }
    //     else return "#070720"
    // }
      const isSelected = (item) =>
    selectedAddress.tempName === item.tempName ? styles.selectedAddress : "";


    // console.log( ?"yes":"no")
    return (
    <div className={styles.pageWrapper}>
      <div className={styles.checkoutPageContainer}>
        
        {/* LEFT: ADDRESS SECTION */}
        <div className={styles.addressSection}>
          <h2 className={styles.sectionHeader}>Saved Addresses</h2>

          {address.map((item) => (
            <div
              key={item.tempName}
              className={`${styles.addressCard} ${isSelected(item)}`}
              onClick={() => setSelectedAddress(item)}
            >
              <p className={styles.addressName}>{item.tempName}</p>
              <p>{item.tempAddress}, {item.tempCity}, {item.tempState}</p>
              <p>{item.tempCountry} - {item.tempPincode}</p>
              <p>Phone: {item.tempPhoneNo}</p>
            </div>
          ))}

          <button
            className={styles.addAddressButton}
            onClick={() => setShowAddressModel(true)}
          >
            Add New Address
          </button>

          {showAddressModel && (
            <AddressModel
              showAddressModel={showAddressModel}
              onClose={() => setShowAddressModel(false)}
              address={address}
              setAddress={setAddress}
            />
          )}
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className={styles.orderSection}>
          <div className={styles.orderBox}>
            <h2 className={styles.summaryHeader}>Order Summary</h2>

            {myCart.map((item) => (
              <div key={item._id} className={styles.summaryListItem}>
                <p>{item.name} ({item.qty})</p>
                <p>₹{item.price * item.qty}</p>
              </div>
            ))}

            <div className={styles.costBreakdown}>
              <hr />
              <div className={styles.summaryRow}>
                <p>Price ({myCart.reduce((acc, cv) => acc + cv.qty, 0)} items)</p>
                <p>₹{finalPrice}</p>
              </div>

              <div className={styles.summaryRow}>
                <p>Discount</p>
                <p>₹{Discount}</p>
              </div>

              <div className={styles.summaryRow}>
                <p>Delivery Charges</p>
                <p>Free</p>
              </div>

              <hr />

              <div className={`${styles.summaryRow} ${styles.totalAmount}`}>
                <p>Total Amount</p>
                <p>₹{total}</p>
              </div>

              <hr />

              <h3 className={styles.addressHeader}>Delivery Address:</h3>

              {Object.keys(selectedAddress).length > 0 ? (
                <div className={styles.finalAddressBox}>
                  <p className={styles.addressName}>{selectedAddress.tempName}</p>
                  <p>{selectedAddress.tempAddress}, {selectedAddress.tempCity}, {selectedAddress.tempState}</p>
                  <p>{selectedAddress.tempCountry} - {selectedAddress.tempPincode}</p>
                  <p>Phone: {selectedAddress.tempPhoneNo}</p>
                </div>
              ) : (
                <p className={styles.noAddressSelected}>No address selected</p>
              )}

              <p className={styles.savingsText}>
                You saved ₹ {Discount} on this order
              </p>

              <button className={styles.placeOrderButton} onClick={HandleOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


export default CheckoutComp