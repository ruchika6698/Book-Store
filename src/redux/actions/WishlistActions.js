import WishlistService from "./../../service/wishlistService";
const wishlistService = new WishlistService();

export const GetWishlist = "GET_Wish_List";
export const RemoveWishlist = "Remove_Wish_List";

export const getWishlistBooks = () => {
return (dispatch) => {
       wishlistService.GetWishlist(localStorage.getItem("Token")).then((json) => {
        dispatch({
          type: GetWishlist,
          payload: { wishlist: json.data.data },
        });
      })
      .catch((error) => {
        console.log(error.message, "Server not avalible");
        dispatch({
          type: GetWishlist,
          payload: { wishlist: [] },
        });
      });
  };
};

export const removeWishlistBooks = (wishlistId) => {
return (dispatch) => {
       wishlistService
      .RemoveFromWishlist(wishlistId, localStorage.getItem("Token"))
      .then((json) => {
        wishlistService.GetWishlist(localStorage.getItem("Token")).then((json) => {
        dispatch({
          type: RemoveWishlist,
          payload: { wishlist: json.data.data },
        });
      })
      .catch((error) => {
        console.log(error.message, "Server not avalible");
        dispatch({
          type: RemoveWishlist,
          payload: { wishlist: [] },
        });
      });
      })
  };
};
