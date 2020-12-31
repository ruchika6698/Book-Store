import React, { Component, Suspense } from "react";
import Header from "./../../component/header/Header";
import Footer from "../../component/Footer/Footer";
import Logo from "./../../component/logo/Logo";
import { Grid, Container } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Book from "../../component/Book/Book";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import CartService from "./../../service/cartService";
import WishlistService from "./../../service/wishlistService";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getStoreBooks,
  searchStoreBooks,
  sortPriceLowToHigh,
  sortPriceHighToLow,
  getCart,
} from "./../../redux/actions/StoreActions.js";
import "./Store.scss";
import { Skeleton } from "@material-ui/lab";
import { Observable } from "rxjs";
import BookStoreService from "../../service/bookStoreService";

const cartService = new CartService();
const bookStoreService = new BookStoreService();
const wishlistService = new WishlistService();
let BookContainer = React.lazy(() => import("./BookContainer"));

// let BookContainer = "";

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      page: 1,
      itemsPerPage: 12,
      itemsInCart: 0,
      popupStatus: "popup-hidden",
      cartItemsNo: 0,
    };
  }

  onProfileClick = () => {
    if (localStorage.getItem("Token")) {
      this.props.history.push("/profile");
    } else {
      this.props.history.push("/login");
    }
  };

  onLogoutClick = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("FirstName");
    localStorage.removeItem("LastName");
    localStorage.removeItem("Email");
    localStorage.removeItem("User Role");
    localStorage.removeItem("Address");
    localStorage.removeItem("City");
    localStorage.removeItem("Phone Number");
    this.props.history.push("/login");
  };

  getNoOfItemsInCart = (value) => {
    this.setState({ itemsInCart: value });
  };

  showBooks =
    new Observable((subscriber) => {
      console.log("shwoing..");
      console.log(this.props.books);
      subscriber.next(this.props.books);
    });

  goToStore = () => {
    this.props.history.push("/");
  };

  goToLogin = () => {
    this.props.history.push("/login");
  };
  goToRegister = () => {
    this.props.history.push("/register");
  };
  goToCart = () => {
    this.props.history.push("/checkout");
  };
  getCart = () => {
    cartService.GetCart(localStorage.getItem("Token")).then((json) => {
      this.setState({
        cartItemsNo: json.data.data.length,
      });
    });
  };

  componentDidMount() {
    this.props.showBooks();

    if (localStorage.getItem("Token")) {
      this.props.getCartLength();
    }
  }

  fallback = () => (
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
        {this.state.books.map((book, index) => {
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
              <Skeleton variant="rect" height={340} width={220}>
                <Skeleton variant="rect" height={170} width={220}></Skeleton>
                <Skeleton variant="rect" height={170} width={220}></Skeleton>
              </Skeleton>
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
          count={Math.ceil(this.props.books.length / this.state.itemsPerPage)}
          page={this.state.page}
          onChange={(event, value) => this.changePage(event, value)}
          defaultPage={1}
          color="secondary"
        />
      </Grid>
    </Container>
  );

  render() {
    return (
      <React.Fragment>
        <Grid container direction="column">
          <Header
            variant="rich"
            onSearch={(value) => this.props.onSearch(value)}
            // onSearch={(value) => this.searchBook(value).subscribe()}
            onProfileClick={this.onProfileClick}
            onLogout={this.onLogoutClick}
            goToStore={this.goToStore}
            goToLogin={this.goToLogin}
            goToRegister={this.goToRegister}
            goToCart={this.goToCart}
            cartItemsNo={this.state.cartItemsNo}
          ></Header>
          <Suspense fallback={this.fallback()}>
            <BookContainer books={()=>this.showBooks} {...this.props}></BookContainer>
          </Suspense>
        </Grid>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.store.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showBooks: () => dispatch(getStoreBooks()),
    onSearch: (value) => dispatch(searchStoreBooks(value)),
    sortPriceLowToHigh: () => dispatch(sortPriceLowToHigh()),
    sortPriceHighToLow: () => dispatch(sortPriceHighToLow()),
    getCartLength: () => dispatch(getCart()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Store));
