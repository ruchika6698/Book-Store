import React from "react";
import OrderSummary from "./../pages/orderSummary/OrderSummary";
import { shallow } from "enzyme";
import "./../setupTests";

describe("Order Summary component", () => {
  // testing redering of header component
  it("should render without throwing any error", () => {
    const wrapper = shallow(<OrderSummary />);
    expect(wrapper.exists()).toBe(true);
  });
});
