import React from 'react';
import {shallow} from 'enzyme';
import {AddBook,GetAllBooks,UpdateBook,DeleteBook,SearchList} from './../service/AdminServices'

describe("Test cases for Admin DashBoard Services",()=>{

      
    describe("Positive test cases",()=>{
        let bookResponce;
        let bookError;
        GetAllBooks()
        .then(responce=>{
            bookResponce = responce
        })
        .catch(error=>{
            bookError = error;
        })
        it('get data without fail', ()=>{              
            if(Boolean(bookResponce)) {    
                expect(bookResponce.data.message ).toEqual("successfull");
            }
        });
        it('get data without fail', ()=>{  
            if(Boolean(bookResponce)) {                     
                expect(bookResponce.data.success).toEqual(true);
            }
        });

    })
});
