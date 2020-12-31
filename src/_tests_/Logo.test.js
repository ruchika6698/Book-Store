import React from "react";
import Logo from "./../component/logo/Logo";
import { shallow } from "enzyme";
import "./../setupTests";

describe("Logo component", () => {
  // testing redering of header component
  it("should render without throwing any error", () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper.exists()).toBe(true);
  });
});