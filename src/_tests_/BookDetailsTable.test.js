import React from 'react';
import {shallow} from 'enzyme';
import BookDetailsTable  from  './../pages/Dashboard/BookDetailsTable'

const setUp =()=>{
    const Component = shallow(<BookDetailsTable/>);
    return Component;
};
const setUpWithProps = (props)=>{
    const Component = shallow(<BookdDetailsTable {...props}/>)
    return Component;
}

describe('BookDetailsTable  component  test cases',()=>{

    // withoutProps
    describe('Book Description Component without props',()=>{
        let component;
        beforeEach(()=>{
            component = setUp();
        }); 

        it(' books table container Render WithOut Error',()=>{
            const result = component.find('.tableContainer');
            expect(result.length).toBe(1);
        });
        it('  S.No render without fail', ()=>{
            const result = component.find('.SNo');
            expect(result.length).toBe(1);
        });
        it(' Title to be render without fail ',()=>{
            const result = component.find('.Title');
            expect(result.length).toBe(1);
        })   
        it(' Author container Render WithOut Error',()=>{
            const result = component.find('.Author');
            expect(result.length).toBe(1);
        });
        it(' Price render without fail', ()=>{
            const result = component.find(".Price");
            expect(result.length).toBe(1);
        });
        it(' Quantity to be render without fail ',()=>{
            const result = component.find(".Quantity");
            expect(result.length).toBe(1);
        }) 
        it(' Edit Button render without fail', ()=>{
            const result = component.find(".Edit");
            expect(result.length).toBe(1);
        });
        it(' Remove to be render without fail ',()=>{
            const result = component.find(".Remove");
            expect(result.length).toBe(1);
        }) ;
    });        
})