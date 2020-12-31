import React, { Component } from "react";
import { Grid, Container } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Book from "../../component/Book/Book";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getStoreBooks,
  searchStoreBooks,
  sortPriceLowToHigh,
  sortPriceHighToLow,
  getCart,
} from "./../../redux/actions/StoreActions.js";
import CartService from "../../service/cartService";
import WishlistService from "../../service/wishlistService";
import Logo from "../../component/logo/Logo";

const cartService = new CartService();
const wishlistService = new WishlistService();

class BookContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      page: 1,
      itemsPerPage: 12,
      itemsInCart: 0,
      popupStatus: "popup-hidden",
      cartItemsNo: 0,
    };
  }

  changePage = (event, value) => {
    this.setState({ page: value });
  };
  // Add book to cart
  addToCart = (bookId) => {
    cartService
      .AddToCart(bookId, 1, localStorage.getItem("Token"))
      .then((json) => {
        this.props.getCartLength();
      });
  };

  // Add book to wishlist
  addTowishlist = (bookId) => {
    const token = localStorage.getItem("Token");
    wishlistService.AddToWishlist(bookId, token).then((json) => {});
  };
  openPopup = () => {
    if (!localStorage.getItem("Token")) {
      this.setState({ popupStatus: "popup-show" });
    }
  };

  closePopup = () => {
    if (this.state.popupStatus === "popup-show") {
      this.setState({ popupStatus: "popup-hidden" });
    }
  };
  goToLogin = () => {
    this.props.history.push("/login");
  };
  goToRegister = () => {
    this.props.history.push("/register");
  };
  render() {
    return (
      <React.Fragment>
        <div
          className={this.state.popupStatus}
          onClick={(event) => this.closePopup(event)}
        >
          <div className="popupDialog">
            <div className="popupHeaderLogo">
              <Logo></Logo>
            </div>
            <div className="popupHeader">You are not logged in !!!</div>
            <div className="popupDeclaration">
              If you are returning Customer
            </div>

            <div className="popupInfo">
              <div className="popupKey">
                <div>Please</div>
              </div>
              <div className="popupButtons">
                <div className="button" onClick={() => this.goToLogin()}>
                  Login
                </div>
              </div>
            </div>

            <div className="popupDeclaration">If you are new to our store</div>
            <div className="popupInfo">
              <div className="popupKey">
                <div>Please</div>
              </div>
              <div className="popupButtons">
                <div className="button" onClick={() => this.goToRegister()}>
                  Register
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container maxWidth="lg" className="storeContainer">
          <Grid
            container
            item
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <Grid
              container
              item
              xs={6}
              alignItems="baseline"
              justify="flex-start"
              className="booksHeader"
            >
              Books
              <span className="bookCount">
                &nbsp;({this.props.books.length} items)
              </span>
            </Grid>
            <Grid
              container
              item
              xs={6}
              justify="flex-end"
              alignItems="baseline"
              className="booksSort"
            >
              <Grid
                container
                item
                alignItems="baseline"
                className="dropdown"
                justify="flex-end"
                style={{ backgroundColor: "#fff" }}
              >
                <span>Sort by relevance</span>
                <ExpandMoreIcon className="opendropdown" />
                <ExpandLessIcon className="closedropdown" />
              </Grid>
              <ul className="dropmenu">
                <li onClick={() => this.props.sortPriceLowToHigh()}>
                  Price : Low to High
                </li>
                <li onClick={() => this.props.sortPriceHighToLow()}>
                  Price : High to Low
                </li>
              </ul>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="row"
            alignItems="flex-start"
            justify="flex-start"
            className="booksContainer"
          >
            {this.props.books
              .filter((book) => book.isDeleted === false)
              .slice(
                (this.state.page - 1) * this.state.itemsPerPage,
                this.state.page * this.state.itemsPerPage
              )
              .map((book, index) => {
                return (
                  <Grid
                    container
                    item
                    key={index}
                    md={3}
                    sm={6}
                    xs={12}
                    className="singleBookContainer"
                    alignItems="center"
                    justify="center"
                  >
                    <Book
                      key={index}
                      addToCart={(bookId) => this.addToCart(bookId)}
                      addToWishlist={(bookId) => this.addTowishlist(bookId)}
                      openPopup={() => this.openPopup()}
                    >
                      {book}
                    </Book>
                  </Grid>
                );
              })}
          </Grid>
          <Grid
            container
            item
            alignItems="center"
            justify="center"
            className="pagination"
          >
            <Pagination
              count={Math.ceil(
                this.props.books.length / this.state.itemsPerPage
              )}
              page={this.state.page}
              onChange={(event, value) => this.changePage(event, value)}
              defaultPage={1}
              color="secondary"
            />
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(BookContainer);
