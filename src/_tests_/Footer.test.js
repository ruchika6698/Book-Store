import React from "react";
import Footer from "./../component/Footer/Footer";
import { shallow } from "enzyme";
import "./../setupTests";

describe("Footer component", () => {
  // testing redering of header component
  it("should render without throwing any error", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });
});