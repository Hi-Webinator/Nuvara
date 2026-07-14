import { cartActions } from "../Slices/cartSlice";
import { toast } from "react-toastify";

const addPrdToCart = (product) => {
  return async (dispatch) => {
    try {
      dispatch(cartActions.addToCart(product));
      toast.success("Product added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
};

const deleteFromCart = (product) => {
  return async (dispatch) => {
    try {
      dispatch(cartActions.deleteFromCart(product));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
};

const clearCart = () => {
  return async (dispatch) => {
    try {
      dispatch(cartActions.clear());
      toast.success("Cart deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
};

export { addPrdToCart, deleteFromCart, clearCart };
