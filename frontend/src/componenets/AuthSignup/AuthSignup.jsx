import { useEffect, useState } from "react";
import styles from './AuthSignup.module.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupThunk } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

export function AuthSignup() {
  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuth } = useSelector((state) => state.auth);
  const { firstName, lastName, email, password } = userDetail;

  // field updates
  const handleChange = (e) => {
    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value,
    });
  };

  // form validation
  useEffect(() => {
    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email && !emailRegex.test(email)) {
      setEmailError("Enter valid email");
    } else {
      setEmailError("");
    }

    // Password verify validation
    if (password !== verifyPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [email, password, verifyPassword]);

  // Signup handler
  const handleSignup = async () => {
    if (!firstName) return toast.error("Enter valid first name");
    if (!lastName) return toast.error("Enter valid last name");
    if (!email) return toast.error("Email cannot be empty");
    if (emailError) return toast.error("Email is not valid");
    if (!password) return toast.error("Password cannot be empty");
    if (!verifyPassword) return toast.error("Verify password required");
    if (passwordError) return toast.error("Passwords do not match");

    const res = await dispatch(
      signupThunk({ firstName, lastName, email, password })
    );

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/profile");
    }
  };

 return (
  <div className={styles.wrapper}>
    
    {/* Background Image */}
    <div className={styles.bgImage}>
      <img 
        src="https://images7.alphacoders.com/327/327601.jpg" 
        alt="background"
      />
    </div>

    {/* Signup Card */}
    <div className={styles.card}>
      <h2 className={styles.heading}>Create Account</h2>

      {/* FIRST NAME */}
      <label className={styles.label}>
        First Name
        <input
          className={styles.input}
          name="firstName"
          onChange={handleChange}
          placeholder="Enter first name"
        />
      </label>

      {/* LAST NAME */}
      <label className={styles.label}>
        Last Name
        <input
          className={styles.input}
          name="lastName"
          onChange={handleChange}
          placeholder="Enter last name"
        />
      </label>

      {/* EMAIL */}
      <label className={styles.label}>
        Email
        <input
          className={styles.input}
          name="email"
          onChange={handleChange}
          placeholder="Enter email"
        />
      </label>

      {emailError && <p className={styles.error}>{emailError}</p>}

      {/* PASSWORD */}
      <label className={styles.label}>
        Password
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
          />

          <button
            className={styles.toggleBtn}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </label>

      {/* VERIFY PASSWORD */}
      <label className={styles.label}>
        Verify Password
        <input
          className={styles.input}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setVerifyPassword(e.target.value)}
          placeholder="Re-enter password"
        />
      </label>

      {passwordError && <p className={styles.error}>{passwordError}</p>}

      {/* SUBMIT BUTTON */}
      <button className={styles.primaryBtn} onClick={handleSignup}>
        Submit
      </button>
    </div>
  </div>
);

}
