import React from "react";
import Book from "./../component/Book/Book";
import { shallow } from "enzyme";
import "./../setupTests";

describe("Book component", () => {
  // testing redering of header component
  it("should render without throwing any error", () => {
    const book = {
      title: "BookTitle",
      description: "BookDescription",
      price: 100,
      author: "BookAuthor",
    };
    const wrapper = shallow(<Book>{book}</Book>);
    expect(wrapper.exists()).toBe(true);
  });
});
