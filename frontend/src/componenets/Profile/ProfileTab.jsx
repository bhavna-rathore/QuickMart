import { useEffect, useState } from "react";
import AddressModel from "../AdressModel/AddressModel";
import styles from "./ProfileTab.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddressThunk, fetchAddressesThunk } from "../../redux/slices/addressSlice";

export function ProfileTab() {
 const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { addresses } = useSelector(state => state.address);
  const { isAuth } = useSelector(state => state.auth);

  const [showAddressModel, setShowAddressModel] = useState(false);


  // Delete address from backend
  const handleDeleteAddress = (id) => {
    
    dispatch(deleteAddressThunk(id));
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

          {addresses.map((item) => (
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
            // address={addresses}
            // setAddress={setAddress}
          />
        )}
      </div>
    </div>
  );
}
