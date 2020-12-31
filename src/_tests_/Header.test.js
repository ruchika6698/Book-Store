import React from "react";
import Header from "./../component/header/Header";
import { shallow } from "enzyme";
import "./../setupTests";

describe("Header component", () => {
  // testing redering of header component
  it("should render without throwing any error", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });
});
