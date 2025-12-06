import styles from "./Nav.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faHeart, faGamepad, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "../../redux/slices/filterSlice";
import { logout } from "../../redux/slices/authSlice";
import { getCartThunk } from "../../redux/slices/cartSlice";
import { getWishlistThunk } from "../../redux/slices/wishlistSlice";

export function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state (Auth + Cart + Wishlist)
    const { isAuth } = useSelector(state => state.auth);
    const { myCart } = useSelector(state => state.cart);
    const { myWishlist } = useSelector(state => state.wishlist);

    const [searchtext, setSearchText] = useState("");
    
  useEffect(() => {
    if (isAuth) {
      dispatch(getCartThunk());
      dispatch(getWishlistThunk());
    }
  }, [dispatch, isAuth]);

    const handleSearch = () => {
        if (!searchtext.trim()) return;

        dispatch(setSearchFilter(searchtext));
        navigate('/ProductList');
        setSearchText("");
    };

    const handleLogout = () => {
        dispatch(logout());

        toast.success("Successfully Logged Out", {
            position: "bottom-center",
            autoClose: 2000,
        });

        // Frontend-only data that should clear on logout
        localStorage.removeItem("Token");
        localStorage.removeItem("userDetail");
        localStorage.removeItem("userAddress");
    };

    return (
        <div>
            <nav className={styles.navbar}>
                <NavLink to="/" id="title" className={styles.title}>Game Nexus</NavLink>


                <div className={styles.searchWrapper}>
                    <input
                        placeholder="Search"
                        value={searchtext}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={styles.searchInput}
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className={styles.searchIconInside}
                        onClick={handleSearch}
                    />
                </div>


                <div className={styles.navItems}>
                    <NavLink to="/ProductList" id="explore" className={styles.navLink}>
                        <FontAwesomeIcon icon={faGamepad} />
                    </NavLink>

                    <NavLink to="/cart" id="cart" className={`${styles.navLink} ${styles.badgeContainer}`}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        {myCart.length > 0 && (
                            <span className="nav-badge">{myCart.length}</span>
                        )}
                    </NavLink>

                    <NavLink to="/wishlist" id="wishlist" className={`${styles.navLink} ${styles.badgeContainer}`}>
                        <FontAwesomeIcon icon={faHeart} />
                        {myWishlist.length > 0 && (
                            <span className="nav-badge">{myWishlist.length}</span>
                        )}
                    </NavLink>

                    <NavLink to={isAuth ? "/profile" : "/login"} id="login" className={styles.navLink}>
                        <FontAwesomeIcon icon={faUser} />
                    </NavLink>

                    {isAuth && (
                        <NavLink className={styles.navLink} to="/" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </NavLink>
                    )}
                </div>
            </nav>
        </div>
    );
}
