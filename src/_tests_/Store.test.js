import React from "react";
import Store from "./../pages/Store/Store.jsx";
import { shallow } from "enzyme";
import "./../setupTests";

describe("Header component", () => {
  // testing redering of header component
  it("should render without throwing any error", () => {
    const wrapper = shallow(<Store />);
    expect(wrapper.exists()).toBe(true);
  });
});
