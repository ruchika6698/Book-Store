import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Truncate from "react-truncate";
import Tooltip from "react-tooltip-lite";
import "./Book.scss";

export default class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addToBagClicked: false,
      wishlistClicked: false,
    };
  }

  // Click handler for add to bag button
  AddToBagHandler = (bookId) => {
    if (this.state.addToBagClicked === false) {
      if (localStorage.getItem("Token")) {
        this.setState(
          {
            addToBagClicked: true,
          },
          () => this.props.addToCart(bookId)
        );
      } else {
        this.props.openPopup();
      }
    } else {
      this.setState({
        addToBagClicked: false,
      });
    }
  };

  // click handler for add to woshlist button
  AddtoWishlist = (bookId) => {
    if (this.state.wishlistClicked === false) {
      if (localStorage.getItem("Token")) {
        this.setState(
          {
            wishlistClicked: true,
          },
          () => this.props.addToWishlist(bookId)
        );
      } else {
        this.props.openPopup();
      }
    } else {
      this.setState({
        wishlistClicked: false,
      });
    }
  };

  // button variant for store books
  normalButtons = (bookId) => (
    <div className="bookButtons">
      <div className="addToBag" onClick={() => this.AddToBagHandler(bookId)}>
        ADD TO BAG
      </div>
      <div className="wishlist" onClick={() => this.AddtoWishlist(bookId)}>
        WISHLIST
      </div>
    </div>
  );

  // button variant for whislisted books
  wishlistButtons = (bookId) => (
    <div className="bookButtons">
      <div className="addToBag" onClick={() => this.AddToBagHandler(bookId)}>
        ADD TO BAG
      </div>
      <div className="wishlist" onClick={() => this.props.removeFromWishlist()}>
        REMOVE
      </div>
    </div>
  );

  // button variant for out fo stock books
  outOfStockButtons = (bookId) => (
    <div className="bookButtons">
      <div></div>
      <div className="wishlist" onClick={() => this.AddtoWishlist(bookId)}>
        WISHLIST
      </div>
      <div></div>
    </div>
  );

  afterClickOnAdd = localStorage.getItem("Token") ? (
    <div className="bookButtons">
      <div className="addedToBag">ADDED TO BAG</div>
    </div>
  ) : (
    this.normalButtons
  );

  afterClickOnwishlist = (
    <div className="bookButtons">
      <div className="wishlisted">ADDED TO WISHLIST</div>
    </div>
  );

  afterClickOnRemove = (
    <div className="bookButtons">
      <div className="wishlisted">REMOVED FROM WISHLIST</div>
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <div className="book">
          {this.props.variant === "wishlist" ? (
            <Grid
              container
              item
              alignItems="center"
              justify="center"
              className="bookImage"
            >
              <img
                src={`${this.props.children.bookImage}`}
                height="130px"
                width="90px"
                alt="bookCover"
              />
              {this.props.children.booksAvailable === 0 ? (
                <div className="outOfStock">
                  <Grid className="outOfStock-label">OUT OF STOCK</Grid>
                </div>
              ) : null}
            </Grid>
          ) : (
            <Tooltip
              content={<div>{this.props.children.description}</div>}
              direction="right-start"
            >
              <Grid
                container
                item
                alignItems="center"
                justify="center"
                className="bookImage"
              >
                <img
                  src={`${this.props.children.bookImage}`}
                  height="130px"
                  width="90px"
                  alt="bookCover"
                />
                {this.props.children.booksAvailable === 0 ? (
                  <div className="outOfStock">
                    <Grid className="outOfStock-label">OUT OF STOCK</Grid>
                  </div>
                ) : null}
              </Grid>
            </Tooltip>
          )}

          <Grid
            container
            item
            direction="column"
            alignItems="flex-start"
            justify="flex-start"
            className="bookInfo"
          >
            <Truncate
              className="bookTitle"
              lines={1}
              ellipsis={
                <span className="show">
                  ... <span className="hide">{this.props.children.title}</span>
                </span>
              }
            >
              {this.props.children.title}
            </Truncate>
            <Truncate
              className="bookAuthor"
              lines={1}
              ellipsis={
                <span className="show">
                  ... <span className="hide">{this.props.children.author}</span>
                </span>
              }
            >
              by {this.props.children.author}
            </Truncate>
            <div className="bookPrice">Rs. {this.props.children.price}</div>
            {this.props.variant === "wishlist"
              ? this.state.addToBagClicked
                ? this.afterClickOnAdd
                : this.state.wishlistClicked
                ? this.afterClickOnwishlist
                : this.wishlistButtons(this.props.children.bookId)
              : this.state.addToBagClicked
              ? this.afterClickOnAdd
              : this.state.wishlistClicked
              ? this.afterClickOnwishlist
              : this.props.children.booksAvailable === 0
              ? this.outOfStockButtons(this.props.children.bookId)
              : this.normalButtons(this.props.children.bookId)}
          </Grid>
        </div>
        {this.popup}
      </React.Fragment>
    );
  }
}
