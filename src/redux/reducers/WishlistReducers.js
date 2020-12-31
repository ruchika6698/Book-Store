import { GetWishlist } from "../actions/WishlistActions";
import { RemoveWishlist } from "../actions/WishlistActions";
// Reducers file of Wishlist

const initialState = {
  wishlist: [],
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GetWishlist:
      return action.payload;
    case RemoveWishlist:
      return action.payload;
    default:
      return state;
  }
};
