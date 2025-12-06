import React, { useState } from 'react'
import styles from'./AddressModel.module.css'


function AddressModel({ showAddressModel, onClose,address,setAddress }) {
    const [tempAddress, setTempAddress] = useState({
        tempName: "",
        tempPhoneNo: 0,
        tempAddress: "",
        tempCity: "",
        tempState: "",
        tempCountry: "",
        tempPincode: 0,
      });

      const handleChange = (e) => {
        setTempAddress({
          ...tempAddress,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit=()=>{
        const newAddress=[...address,tempAddress]
        setAddress(newAddress)
        onClose();
        const localAddress=JSON.stringify(newAddress)
        localStorage.setItem("userAddress",localAddress)
      }
 return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.modalTitle}>Add New Address</div>

        <div className={styles.inputGroup}>
          <input
            className={styles.inputField}
            placeholder="Full Name"
            name="tempName"
            onChange={handleChange}
          />

          <input
            className={styles.inputField}
            placeholder="Phone Number"
            type="number"
            name="tempPhoneNo"
            onChange={handleChange}
          />

          <input
            className={styles.inputField}
            placeholder="Address Line"
            name="tempAddress"
            onChange={handleChange}
          />

          <input
            className={styles.inputField}
            placeholder="City"
            name="tempCity"
            onChange={handleChange}
          />

          <input
            className={styles.inputField}
            placeholder="State"
            name="tempState"
            onChange={handleChange}
          />

          <input
            className={styles.inputField}
            placeholder="Country"
            name="tempCountry"
            onChange={handleChange}
          />

          <input
            className={styles.inputField}
            placeholder="Pincode"
            type="number"
            name="tempPincode"
            onChange={handleChange}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressModel