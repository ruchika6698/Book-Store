import React from 'react';
import {shallow} from 'enzyme';
import BookDecription  from  './../pages/Dashboard/BookDecription'

const setUp =()=>{
    const BookComponent = shallow(<BookDecription/>);
    return BookComponent;
};
const setUpWithProps = (props)=>{
    const BookComponent = shallow(<BookDecription bookData={props}/>)
    return BookComponent;
}

describe('BookDetails  component passititve test cases',()=>{

    // withoutProps
    describe('Book Description Component without props',()=>{
        let component;
        beforeEach(()=>{
            component = setUp();
        });        
        it(' BookDescription container Render WithOut Error',()=>{
            const result = component.find(".BookDetailsAdmin");
            expect(result.length).toBe(1);
        });
        it(' image display render without fail', ()=>{
            const result = component.find(".imageContainerAdmin");
            expect(result.length).toBe(1);
        });
        it(' Buttons container to be render without fail ',()=>{
            const result = component.find(".ButtonsBookDetailsAdmin");
            expect(result.length).toBe(1);
        })   
        it("should respond to change event and change the state (title)of the BookDecription Component",()=>{
            component.find('.titleField')
                     .simulate('change', {
                        target: {
                        name: 'title',
                        value: 'Concrete Techknolodgy'
                    }})
            expect(component.state('title')).toEqual('Concrete Techknolodgy');   
        });
        let bookdecription = "Concrete technology deals with study of properties of concrete and its practical applications. ... Various types of cements are used for concrete works which have different properties and applications. Some of the type of cement are Portland Pozzolana Cement (PPC), rapid hardening cement, Sulphate resistant cement etc."
        it("should respond to change event and change the state(decription)of the BookDecription Component",()=>{
            component.find('.decriptionField')
                     .simulate('change', {
                        target: {
                        name: 'decription',
                        value: {bookdecription}
                    }})
            expect(component.state('decription')).toEqual({bookdecription});   
        });
        it("should respond to change event and change the state (author)of the BookDecription Component",()=>{
            component.find('.authorField')
                     .simulate('change', {
                        target: {
                        name: 'author',
                        value: 'Basak'
                    }})
            expect(component.state('author')).toEqual('Basak');   
        });        
        it("should respond to change event and change the state(price)of the BookDecription Component",()=>{
            component.find('.priceField')
                     .simulate('change', {
                        target: {
                        name: 'price',
                        value: 100
                    }})
            expect(component.state('price')).toEqual(100);   
        });
        it("should respond to change event and change the state(Quantity)of the BookDecription Component",()=>{
            component.find('.quantityField')
                     .simulate('change', {
                        target: {
                        name: 'quantity',
                        value: 20
                    }})
            expect(component.state('quantity')).toEqual(20);   
        });
        // negitive test cases
        it('Book image should not render',()=>{
            const result = component.find(".BookImageAdmin")
            expect(result.length).toBe(0);
        })        
    });

    // with props
    describe("Book Decription Component with props",()=>{
        let component;
        beforeEach(()=>{
            const bookData={
                title : "FluidMechanics" ,     
                description : "Fluid Mechanics is the study of fluids at rest (fluid statics) and in motion (fluid dynamics). A fluid is defined as a substance that continually deforms (flows) under an applied shear stress regardless of the magnitude of the applied stress. Whereas a solid can resist an applied force by static deformation",
                author : "Bansal",
                imageUrl : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FTextbook-Fluid-Mechanics-Part%2Fdp%2F8121916674&psig=AOvVaw3rV2aQSmzEXWk7AMVFMavc&ust=1595608598727000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJj50cTn4-oCFQAAAAAdAAAAABAD",
                price : 300,
                booksAvailable : 5,
                bookId : 121,
            }
            component = setUpWithProps(bookData);
        }); 

        it(' title should be match with props ',()=>{
            expect(component.state('title')).toEqual("FluidMechanics"); 
        });
        it(' decription  should be match with props ', ()=>{
            expect(component.state("decription")).toEqual("Fluid Mechanics is the study of fluids at rest (fluid statics) and in motion (fluid dynamics). A fluid is defined as a substance that continually deforms (flows) under an applied shear stress regardless of the magnitude of the applied stress. Whereas a solid can resist an applied force by static deformation");
        }); 
        it(' author should be match with props ',()=>{
            expect(component.state('author')).toEqual("Bansal"); 
        });
        it(' price  should be match with props ',()=>{
            expect(component.state('price')).toEqual(300); 
        });
        it(' quantity  should be match with props ',()=>{
            expect(component.state('quantity')).toEqual(5); 
        });
        it(' BookDescription container Render WithOut Error',()=>{
            expect(component.state('bookId')).toEqual(121); 
        });

        // negitive test cases
        it("should not render ImageIconText  when passing image url",()=>{
            const result = component.find('.ImageIconText')                     
            expect(result.length).toBe(0);   
        });
    });
})