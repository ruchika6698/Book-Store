import React from "react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from "./../pages/Login/Login";
import { shallow } from "enzyme";
import "./../setupTests";

describe("Login component", () => {
  // testing redering of header component
  it('should render without throwing an error', () => {
        expect(shallow(<Login />).exists()).toBe(true)
    })
    //testing the email and password input existence
    it('renders a email input', () => {
        expect(shallow( <Login /> ).find('#outlined-required').length).toEqual(1)
      })
      it('renders a password input', () => {
        expect(shallow( <Login /> ).find('#outlined-adornment-password').length).toEqual(1)
      })
}); 

describe('Email input', () => {
  //testing email input for Fundoo notes
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( <Login /> );
      wrapper.find('#outlined-required').simulate('change', {
        target: {
          name: 'email',
          value: 'Diksha.Rane@gmail.com'
        }
      });
      expect(wrapper.state('email')).toEqual('Diksha.Rane@gmail.com');
    })
  })
  describe('Password input', () => {
    //testing password input for Fundoo notes
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( <Login /> );
      wrapper.find('#outlined-adornment-password')
        .simulate('change', {
          target: {
            name: 'password',
            value: 'Diksha@123'
          }
        });
      expect(wrapper.state('password')).toEqual('Diksha@123');
    })
  })
  //negative test cases for login
describe('Login Component', () => {
  //testing rendering of login component
    it('should render without throwing an error', () => {
        expect(shallow(< Login />).exists()).toBe(true)
    })
    //testing the email and password input existence
    it('renders a email input', () => {
        expect(shallow( < Login /> ).find('#outlined-required').length).toEqual(1)
      })
      it('renders a password input', () => {
        expect(shallow( < Login /> ).find('#outlined-adornment-password').length).toEqual(1)
      })
})
  describe('Email input', () => {
  //testing email input for Fundoo notes
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login /> );
      wrapper.find('#outlined-required').simulate('change', {
        target: {
          name: 'email',
          value: 'Diksha.Rane@gmail.com'
        }
      });
      expect(wrapper.state('email')).toEqual('Diksha.Rane@gmail.com');
    })
  })
  describe('Password input', () => {
    //testing password input for Fundoo notes
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login /> );
      wrapper.find('#outlined-adornment-password')
        .simulate('change', {
          target: {
            name: 'password',
            value: 'vfcvbvg'
          }
        });
      expect(wrapper.state('password')).not.toEqual('fbvg');
    })
  })

  describe('Login Component', () => {
  //testing rendering of login component
    it('should render without throwing an error', () => {
        expect(shallow(< Login />).exists()).toBe(true)
    })
    //testing the email and password input existence
    it('renders a email input', () => {
        expect(shallow( < Login /> ).find('#outlined-required').length).toEqual(1)
      })
      it('renders a password input', () => {
        expect(shallow( < Login /> ).find('#outlined-adornment-password').length).toEqual(1)
      })
})
  describe('Email input', () => {
  //testing email input for Fundoo notes
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login /> );
      wrapper.find('#outlined-required').simulate('change', {
        target: {
          name: 'email',
          value: 'Dikshavcv12ane@gmail.com'
        }
      });
      expect(wrapper.state('email')).not.toEqual('Diksha.Rane@gmail.com');
    })
  })
  describe('Password input', () => {
    //testing password input for Fundoo notes
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login /> );
      wrapper.find('#outlined-adornment-password')
        .simulate('change', {
          target: {
            name: 'password',
            value: 'vfcvbvg'
          }
        });
      expect(wrapper.state('password')).toEqual('vfcvbvg');
    })
  })

it('Dispatches authorization', () => {
    let mock = new MockAdapter(axios);
    mock.onPost(`https://localhost:44387/api/User/Login`, { 
        email: 'Diksha.Rane@gmail.com', 
        password: 'Diksha@123'
    }).reply(200, {success: 'true' });
});

it('Dispatches authorization', () => {
    let mock = new MockAdapter(axios);
    mock.onPost(`https://localhost:44387/api/User/Login`, { 
        email: 'admin@gmail.com', 
        password: 'Admin@123'
    }).reply(200, {success: 'true' });
});

it('Dispatches authorization', () => {
    let mock = new MockAdapter(axios);
    mock.onPost(`https://localhost:44387/api/User/Login`, { 
        email: 'Diksha.Rane@gmail.com', 
        password: 'diksha@1234'
    }).reply(200, {success: 'false' });
});

it('Dispatches authorization', () => {
    let mock = new MockAdapter(axios);
    mock.onPost(`https://localhost:44387/api/User/Login`, { 
        email: 'admin@gmail.com', 
        password: 'Admin@1234'
    }).reply((config) => {
    console.log("data",config);
  const data = JSON.parse(config.data)});
});
