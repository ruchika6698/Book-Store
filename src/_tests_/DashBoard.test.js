import React from 'react';
import {shallow} from 'enzyme';
import AdminDashboard from  './../pages/Dashboard/DashboardAdmin'

const setUp =()=>{
    const dashboardComponent = shallow(<AdminDashboard/>);
    return dashboardComponent;
};

describe('DashBoard component',()=>{

    let component;
    beforeEach(()=>{
        component = setUp();
    });

    it(' dashboard Headder Render WithOut Error',()=>{
        const result = component.find(".headderAdmin");
        expect(result.length).toBe(1);
    });
    it(' books table display render without fail', ()=>{
        const result = component.find(".BooksDisplayContainerAdmin");
        expect(result.length).toBe(1);
    });
    it(' add new book dialog box to be render without fail ',()=>{
        const result = component.find(".AddBookDialogAdmin");
        expect(result.length).toBe(1);
    })
    it('headder of add book dialog box Render without fail',()=>{
        const result = component.find(".AddBookDilogheadderAdmin")
        expect(result.length).toBe(1);
    })
    it('logo in headder ',()=>{
        const result = component.find('.LogoAdmin');
        expect(result.length).toBe(1);
    })
    it('add button icons in headder',()=>{
        const result = component.find('.AddButtonAdmin');
        expect(result.length).toBe(1);        
    })
})