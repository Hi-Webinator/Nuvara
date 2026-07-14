import { wishlistActions } from "../Slices/wishListSlice";
import { toast } from "react-toastify";

const addPrdToWishlist = (product) => {
  return async (dispatch) => {
    try {
      dispatch(wishlistActions.addToWishList(product));
      toast.success("Product added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
};

const deleteFromWishList = (product) => {
  return async (dispatch) => {
    try {
      dispatch(wishlistActions.deleteFromWishList(product));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
};

const clearWishlist = () => {
  return async (dispatch) => {
    try {
      dispatch(wishlistActions.clear());
      toast.success("Wishlist deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
};

export { addPrdToWishlist, deleteFromWishList, clearWishlist };
