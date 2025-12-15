import React, { useState } from 'react'
import styles from './AddressModel.module.css'
import { useDispatch } from 'react-redux';
import { addAddressThunk } from '../../redux/slices/addressSlice';


function AddressModel({ showAddressModel, onClose }) {
  const dispatch = useDispatch();

  const [tempAddress, setTempAddress] = useState({
    tempName: "",
    tempPhoneNo: "",
    tempAddress: "",
    tempCity: "",
    tempState: "",
    tempCountry: "",
    tempPincode: "",
  });

  const handleChange = (e) => {
    setTempAddress({
      ...tempAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Validation 
    if (!tempAddress.tempName || !tempAddress.tempAddress) {
      alert("Please fill all required fields");
      return;
    }

    // Add to backend
    dispatch(addAddressThunk(tempAddress));

    // Close modal
    onClose();
  };
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