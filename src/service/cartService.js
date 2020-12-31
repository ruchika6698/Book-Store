import Configuration from "../Configuration/configuration";
import AxiosService from "./axiosServices";

const axiosService = new AxiosService();
const apiUrl = Configuration.url;

class CartService {
  AddToCart(bookId, quantity, token) {
    return axiosService.Post(process.env.REACT_APP_CART, {}, true, {
      params: {
        BookId: bookId,
        Quantity: quantity,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  AddToCartFromWishlist(wishlistId, token) {
    return axiosService.Post(
      `${process.env.REACT_APP_ADD_TO_CART_FROM_WISHLIST}${wishlistId}`,
      {},
      true,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  GetCart(token) {
    return axiosService.Get(process.env.REACT_APP_CART, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  RemoveFromCart(cartId, token) {
    return axiosService.Delete(
      `${process.env.REACT_APP_CART}${cartId}`,
      true,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
export default CartService;
