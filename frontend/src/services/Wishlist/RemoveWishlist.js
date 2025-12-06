import { removeFromWishlistThunk } from "../../redux/slices/wishlistSlice";
import { toast } from "react-toastify";

export const removeWishlistService = async (id, dispatch) => {
  debugger
  dispatch(removeFromWishlistThunk(id))
    .unwrap()
    .then(() => {
      toast.error("Removed from wishlist", {
        position: "bottom-center",
        autoClose: 2000,
      });
    })
    .catch(() => {
      toast.error("Failed to remove", {
        position: "bottom-center",
        autoClose: 2000,
      });
    });
};
