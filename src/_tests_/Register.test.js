import React from 'react';
import Register from "./../pages/Register/Register";
import { shallow } from "enzyme";
import "./../setupTests";

describe('Registration Component', () => {
  //testing rendering of registration component
    it('should render without throwing an error', () => {
        expect(shallow( < Register /> )
                .exists())
            .toBe(true)
    })
//testing existence of firstname and lastname
    it('renders a firstName input', () => {
        expect(shallow( < Register /> ).find('#firstName').length).toEqual(1)
    })
    it('renders a lastName input', () => {
        expect(shallow( < Register /> ).find('#lastName').length).toEqual(1)
    })
    it('renders a Email input', () => {
        expect(shallow( < Register /> ).find('#outlined-required').length).toEqual(1)
    })
    it('renders a Password input', () => {
        expect(shallow( < Register /> ).find('#outlined-adornment-password').length).toEqual(1)
    })
    it('renders a Address input', () => {
        expect(shallow( < Register /> ).find('#address').length).toEqual(1)
    })
    it('renders a City input', () => {
        expect(shallow( < Register /> ).find('#city').length).toEqual(1)
    })
    it('renders a Phone Number input', () => {
        expect(shallow( < Register /> ).find('#phoneNumber').length).toEqual(1)
    })

    describe('firstName input', () => {
        //testing given input
        it('should respond to change event and change the state of the Registration Component', () => {
             const wrapper = shallow( < Register /> );
            wrapper.find('#firstName').simulate('change', {
                target: {
                    name: 'firstname',
                    value: 'Rajesh'
                }
            });
            expect(wrapper.state('firstName')).toEqual('Rajesh');
        })
    })
    describe('lastName input', () => {
        //testing given input
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Register /> );
            wrapper.find('#lastName').simulate('change', {
                target: {
                    name: 'lastName',
                    value: 'Patil'
                }
            });
            expect(wrapper.state('lastName')).toEqual('Patil');
        })
    })
    describe('Email input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Register /> );
            wrapper.find('#outlined-required').simulate('change', {
                target: {
                    name: 'email',
                    value: 'sdbcndc@gmail.com'
                }
            });
            expect(wrapper.state('email')).toEqual('sdbcndc@gmail.com');
        })
    })
    describe('Password input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Register /> );
            wrapper.find('#outlined-adornment-password')
                .simulate('change', {
                    target: {
                        name: 'password',
                        value: 'dxcvdfxvf'
                    }
                });
            expect(wrapper.state('password')).toEqual('dxcvdfxvf');
        })
    })
    describe('Address input', () => {
        //testing given input
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Register /> );
            wrapper.find('#address').simulate('change', {
                target: {
                    name: 'address',
                    value: 'Pune,Maharashtra'
                }
            });
            expect(wrapper.state('address')).toEqual('Pune,Maharashtra');
        })
    })
    describe('City input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Register /> );
            wrapper.find('#city').simulate('change', {
                target: {
                    name: 'city',
                    value: 'Pune'
                }
            });
            expect(wrapper.state('city')).toEqual('Pune');
        })
    })
    describe('Phone Number input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Register /> );
            wrapper.find('#phoneNumber')
                .simulate('change', {
                    target: {
                        name: 'phoneNumber',
                        value: '9999999999'
                    }
                });
            expect(wrapper.state('phoneNumber')).toEqual('9999999999');
        })
    })
})