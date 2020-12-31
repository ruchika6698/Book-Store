import React, { Component } from "react";
import bookLogo from "./../../assets/logo.svg";
import "./Logo.scss";
export default class Logo extends Component {
  render() {
    return (
      <div className="bookstoreLogo">
        <img
          src={bookLogo}
          alt="bookStore Logo"
          className="bookstoreLogo-icon"
        ></img>

        <div className="bookstoreLogo-text">Bookstore</div>
      </div>
    );
  }
}
