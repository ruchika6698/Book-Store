import React from "react";
import Profile from "./../pages/profile/Profile";
import { shallow } from "enzyme";
import "./../setupTests";

describe("Profile component", () => {
  // testing redering of header component
  it("should render without throwing any error", () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper.exists()).toBe(true);
  });
});

