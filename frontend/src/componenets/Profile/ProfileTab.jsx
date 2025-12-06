import { useState } from "react";
import AddressModel from "../AdressModel/AddressModel";
import styles from "./ProfileTab.module.css";
import { useSelector } from "react-redux";

export function ProfileTab() {
  const [showAddressModel, setShowAddressModel] = useState(false);

  const localAddress = JSON.parse(localStorage.getItem("userAddress")) || [];
  const [address, setAddress] = useState(localAddress);

  const { user } = useSelector((state) => state.auth);

  const handleDeleteAddress = (item) => {
    const updatedAddress = address.filter(
      (addressItem) => addressItem.tempName !== item.tempName
    );
    setAddress(updatedAddress);
    localStorage.setItem("userAddress", JSON.stringify(updatedAddress));
  };

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.Profile}>
        {/* USER DETAILS */}
        <div className={styles.UserDetails}>
          <h2 className={styles.userDetailsHeading}>User Details</h2>

          <p className={styles.userDetailsText}>
            Username: {user.firstName} {user.lastName}
          </p>
          <p className={styles.userDetailsText}>Email: {user.email}</p>
        </div>

        {/* ADDRESS SECTION */}
        <div className={styles.AddressContainer}>
          <h1 className={styles.addressContainerHeader}>Saved Addresses</h1>

          <button
            className={styles.addAddressButton}
            onClick={() => setShowAddressModel(true)}
          >
            Add New Address
          </button>

          {address.map((item) => (
            <div className={styles.addressCard} key={item.tempName}>
              <p className={styles.addressName}>{item.tempName}</p>
              <p>
                {item.tempAddress}, {item.tempCity}, {item.tempState},{" "}
                {item.tempCountry} - {item.tempPincode}
              </p>
              <p>Phone: {item.tempPhoneNo}</p>

              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteAddress(item)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* ADDRESS MODAL */}
        {showAddressModel && (
          <AddressModel
            showAddressModel={showAddressModel}
            onClose={() => setShowAddressModel(false)}
            address={address}
            setAddress={setAddress}
          />
        )}
      </div>
    </div>
  );
}
