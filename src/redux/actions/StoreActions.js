// Actions file for Book Store

import BookStoreService from "../../service/bookStoreService";
import CartService from "../../service/cartService";

const bookStoreService = new BookStoreService();
const cartService = new CartService();

export const GetAllBooks = "GET_ALL_BOOKS";
export const SearchBooks = "SEARCH_BOOKS";
export const LowToHigh = "LOW_TO_HIGH";
export const HighToLow = "HIGH_TO_LOW";
export const GetCartLength = "GET_CART_LENGTH";

export const getStoreBooks = () => {
  return (dispatch) => {
    bookStoreService
      .GetAllBooks()
      .then((response) => {
        dispatch({
          type: GetAllBooks,
          payload: { books: response.data.data.filter( data => data.isDeleted === false) },
        });
      })
      .catch((error) => {
        console.log(error.message, "Server not avalible");
        dispatch({
          type: GetAllBooks,
          payload: { books: [] },
        });
      });
  };
};

export const searchStoreBooks = (value) => {
  if (value === "") {
    return getStoreBooks();
  } else {
    return (dispatch) => {
      bookStoreService.GetAllBooksByKeyword(value).then((json) => {
        if (json.data.success === true) {
          dispatch({
            type: SearchBooks,
            payload: { books: [...json.data.data] },
          });
        } else {
          dispatch({
            type: SearchBooks,
            payload: { books: [] },
          });
        }
      });
    };
  }
};

export const sortPriceLowToHigh = () => {
  return (dispatch) => {
    bookStoreService.SortBooks("price", "ascending").then((json) => {
      if (json.data.success === true) {
        dispatch({
          type: LowToHigh,
          payload: { books: json.data.data },
        });
      }
    });
  };
};

export const sortPriceHighToLow = () => {
  return (dispatch) => {
    bookStoreService.SortBooks("price", "descending").then((json) => {
      if (json.data.success === true) {
        dispatch({
          type: HighToLow,
          payload: { books: json.data.data },
        });
      } 
    });
  };
};

export const getCart = (bookId) => {
  return (dispatch) => {
    cartService.GetCart(localStorage.getItem("Token")).then((json) => {
      dispatch({
        type: GetCartLength,
        payload: {
          cartItems: json.data.data
            .filter((item) => item.isUsed === false)
            .filter((item) => item.isDeleted === false).length,
        },
      });
    });
  };
};
