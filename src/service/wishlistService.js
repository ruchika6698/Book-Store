import Configuration from "../Configuration/configuration";
import AxiosService from "./axiosServices";

const axiosService = new AxiosService();
const apiUrl = Configuration.url;

class WishlistService {
  AddToWishlist(bookId, token) {
    return axiosService.Post(process.env.REACT_APP_WISHLIST, {}, true, {
      params: {
        BookId: `${bookId}`,
        Quantity: 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetWishlist(token) {
    return axiosService.Get(process.env.REACT_APP_WISHLIST, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  RemoveFromWishlist(wishlistId, token) {
    return axiosService.Delete(
      `${process.env.REACT_APP_WISHLIST}${wishlistId}`,
      true,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
export default WishlistService;
