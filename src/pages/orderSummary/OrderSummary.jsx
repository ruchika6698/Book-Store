import React from "react";
import "./OrderSummary.scss";
import Card from "@material-ui/core/Card";
import CheckoutMessage from "./../../assets/CheckoutMessage.jpg";
import { Button } from "@material-ui/core";
import Header from "./../../component/header/Header";
import Footer from "./../../component/Footer/Footer";

export default function OrderSummary(props) {
  const goToStore = () => {
    props.history.push("/");
  };
  const summaryDetails = props.match.params.Summary;

  return summaryDetails !== null ? (
    <div className="orderPage">
      <Header variant="normal" goToStore={() => goToStore()}></Header>
      <div className="order">
        <div className="orderimage">
          <img src={CheckoutMessage} className="image" alt="Book logo" />
        </div>
        <br />
        <div className="paymentComfirm">
          Hurray!!!your order is confirmed the order id is #{summaryDetails}{" "}
          save order id for further communication..
        </div>
        <br />
        <br />
        <br />
        <div>
          <Card className="table">
            <div className="aboutus">
              <div className="email">
                <div className="header">Email Id</div>
                <br />
                <div className="header">admin@bookstore.com</div>
              </div>
              <div className="email">
                <div className="header">Contact us</div>
                <br />
                <div className="header">+91816347588</div>
              </div>
              <div className="email">
                <div className="header">Address</div>
                <br />
                <div className="header">
                  42, 14th Main, 15th Cross,Sector 4,opp to BDA complex, near
                  Kumarakom restraurant,HSR Layout,Banglore 560034
                </div>
              </div>
            </div>
          </Card>
        </div>
        <br />
        <br />
        <div>
          <Button
            className="button-Login"
            variant="contained"
            color="primary"
            onClick={() => props.history.push("/")}
          >
            CONTINUE SHOPPING
          </Button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <Footer />
      </div>
    </div>
  ) : (
    this.props.history.push("/")
  );
}
