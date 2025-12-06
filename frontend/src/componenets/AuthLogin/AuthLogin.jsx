import { useEffect, useState } from "react"
import { loginService } from "../../services/Auth/Login"
import styles from "./AuthLogin.module.css";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/slices/authSlice";

export function AuthLogin() {

  const [error, setError] = useState("")
  const [password, setPassword] = useState()
  const [email, setEmail] = useState("")
  const dispatch = useDispatch();
  const { isAuth, loading, err } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email !== "" && !emailRegex.test(email)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  }

  const handleLogin = () => {
    if (error === "" && password !== "" && email !== "") {
      dispatch(loginThunk({ email, password }));
      // loginService(email,password,dispatchAuth)
      navigate("/Productlist")
    }

    else if (email === "") {
      toast.error("Email Cannot Be Empty", {
        position: "bottom-center",
        autoClose: 2000,
      });
      // setEmail("")
      // setPassword("")
    }
    else if (password === "") {
      toast.error("Password Cannot Be Empty", {
        position: "bottom-center",
        autoClose: 2000,
      });
      // setEmail("")
      // setPassword("")
    }
    else if (error !== "") {
      toast.error("Email Is Not Valid", {
        position: "bottom-center",
        autoClose: 2000,
      });
      // setEmail("")
      // setPassword("")
    }
  }

  useEffect(() => {
    validateEmail();
  }, [email])

  const handleGuestLogin = () => {
    const guestEmail = "testuser@gmail.com";
    const guestPassword = "1234";
    setEmail(guestEmail);
    setPassword(guestPassword);
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

    {/* Login Card */}
    <div className={styles.card}>
      <h2 className={styles.heading}>Login</h2>

      {/* Email */}
      <label className={styles.label}>Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
        type="email"
        placeholder="Enter your email"
      />
      {error && <p className={styles.error}>{error}</p>}

      {/* Password */}
      <label className={styles.label}>Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        type="password"
        placeholder="Enter your password"
      />

      {/* Buttons */}
      <button className={styles.primaryBtn} onClick={handleLogin}>
        Login
      </button>

      <button className={styles.secondaryBtn} onClick={handleGuestLogin}>
        Use Guest Credentials
      </button>

      <button className={styles.linkBtn} onClick={() => navigate("/signup")}>
        Create New Account
      </button>
    </div>
  </div>
);

}