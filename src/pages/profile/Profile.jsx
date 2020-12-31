import React from "react";
import "./Profile.scss";
import Card from "@material-ui/core/Card";
import Header from "./../../component/header/Header";
import Footer from "./../../component/Footer/Footer";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Book from "../../component/Book/Book";
import Pagination from "@material-ui/lab/Pagination";
import WishlistService from "./../../service/wishlistService";
import CartService from "./../../service/cartService";
import { connect } from "react-redux";
import { getWishlistBooks,removeWishlistBooks } from "./../../redux/actions/WishlistActions.js";
import { getCart } from "../../redux/actions/StoreActions";

const cartService = new CartService();

export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      itemsPerPage: 12,
    };
  }

  changePage = (event, value) => {
    this.setState({ page: value });
  };

  addToCart = (wishlistId) => {
    cartService
      .AddToCartFromWishlist(wishlistId, localStorage.getItem("Token"))
      .then((json) => {
        this.props.getCartLength();
        this.props.BooksWishlist();
      });
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
  onSearch = (value) => {};

  onProfileClick = () => {
    if (localStorage.getItem("Token")) {
      this.props.history.push("/profile");
    } else {
      this.props.history.push("/login");
    }
  };
  goToStore = () => {
    this.props.history.push("/");
  };
  goToCart = () => {
    this.props.history.push("/checkout");
  };
  componentDidMount() {
    this.props.BooksWishlist();
    this.props.getCartLength();
  }

  render() {
    return (
      <div className="profilePage">
        <div className="profileLogo">
          <Container maxWidth="xl">
            <Header
              variant="rich"
              goToStore={() => this.goToStore()}
              goToCart={() => this.goToCart()}
              onProfileClick={() => this.onProfileClick()}
              onLogout={() => this.onLogoutClick()}
              onSearch={(value) => this.onSearch(value)}
            />
          </Container>
        </div>
        <div className="profile">
          <Card className="profileCard" variant="outlined">
            <div className="profileImage">
              <div className="name">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQYF1Mjct6rfyPLrWjrjm8dAw9oZGyf-BNtaQ&usqp=CAU"
                  alt="avtar"
                  width="100px"
                  height="100px"
                />
              </div>
              <div className="name">
                {localStorage.getItem("FirstName") +
                  " " +
                  localStorage.getItem("LastName")}
              </div>
            </div>
            <br />
            <br />
            <div className="profiledetails">
              <div className="profileName">
                <div className="name">First Name</div>
                <br />
                <div className="name">Last Name</div>
                <br />
                <div className="name">Email</div>
                <br />
                <div className="name">Address</div>
                <br />
                <div className="name">City</div>
                <br />
                <div className="name">Phone Number</div>
              </div>
              <div className="profileValue">
                <div className="name">{localStorage.getItem("FirstName")}</div>
                <br />
                <div className="name">{localStorage.getItem("LastName")}</div>
                <br />
                <div className="name">{localStorage.getItem("Email")}</div>
                <br />
                <div className="name">{localStorage.getItem("Address")}</div>
                <br />
                <div className="name">{localStorage.getItem("City")}</div>
                <br />
                <div className="name">
                  {localStorage.getItem("Phone Number")}
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Container maxWidth="lg" className="wishlistContainer">
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
              xs={12}
              alignItems="baseline"
              justify="flex-start"
              className="booksHeader"
            >
              Wishlist
              <span className="bookCount">
                &nbsp;(
                {
                  this.props.wishlist.filter(
                    (book) => book.isDeleted === false && book.isMoved === false
                  ).length
                }{" "}
                items)
              </span>
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
            {this.props.wishlist.filter(
              (book) => book.isDeleted === false && book.isMoved === false
            ).length === 0 ? (
              <Grid
                container
                item
                md={12}
                sm={6}
                xs={12}
                className="singleBookContainer"
                alignItems="center"
                justify="center"
                style={{ fontsize: 40 }}
              >
                Wishlist empty
              </Grid>
            ) : (
              this.props.wishlist
                .filter(
                  (book) => book.isDeleted === false && book.isMoved === false
                )
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
                        addToCart={() => this.addToCart(book.wishListId)}
                        removeFromWishlist={() =>
                          this.props.removeWishList(book.wishListId)
                        }
                        variant="wishlist"
                      >
                        {book}
                      </Book>
                    </Grid>
                  );
                })
            )}
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
                this.props.wishlist.filter(
                  (book) => book.isDeleted === false && book.isMoved === false
                ).length / this.state.itemsPerPage
              )}
              page={this.state.page}
              onChange={(event, value) => this.changePage(event, value)}
              color="secondary"
              defaultPage={1}
            />
          </Grid>
        </Container>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist.wishlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    BooksWishlist: () => dispatch(getWishlistBooks()),
    getCartLength: () => dispatch(getCart()),
    removeWishList:(wishlistId)=>dispatch(removeWishlistBooks(wishlistId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
