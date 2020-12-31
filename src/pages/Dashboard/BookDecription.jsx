import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core';
import  './DashboardAdmin.scss'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import ImageIcon from '@material-ui/icons/Image';
import {AddBook,UpdateBook,ImageBook} from './../../service/AdminServices'
import {getStoreBooks} from "./../../redux/actions/StoreActions.js"
import { connect } from 'react-redux'

let formData = new FormData()
class BookDecription extends Component {
    constructor(props){
        super(props);
        this.state={
            isEditable : false,
            anchorEl : null,
            title : '',
            decription :'',
            author : '',
            image:null,
            imageUrl :null,
            price : 0,
            quantity :0,    
            bookId: null,
            status : 'addBook',
            snackbarOpen : false,
            snackBarMessage : '',
            snackbarSeverity : 'success',
            // validation variables
            v_title: true,
            v_author : true,
            v_decription : true,
            error_message : "field required"
        }
    }


  // if the book data is present show the book data
  componentDidMount() {
    if (Boolean(this.props.bookData)) {
      this.setState({
        title: this.props.bookData.title,
        decription: this.props.bookData.description,
        author: this.props.bookData.author,
        bookImage: this.props.bookData.bookImage,
        price: this.props.bookData.price,
        quantity: this.props.bookData.booksAvailable,
        bookId: this.props.bookData.bookId,
        status: "updateBook",
      });
    }
  }


    // on change of any field
    onChange = eve =>{
        this.setState({             
            [eve.target.name] : eve.target.value,
            ["v_"+eve.target.name] : true
        })
      
    }
    //on change of image file
    fileChangedHandler = (event) => {
        event.preventDefault();
        this.setState({ image : event.target.files[0],
                        imageUrl : URL.createObjectURL(event.target.files[0]) });
        
    }
   
    // validation function 
    validate = ()=>{
        let valid = true;
        if(this.state.title.trim().length < 3){
            valid = false;
            this.setState({
                v_title : false
            })            
        }
        if(this.state.decription.trim().length <3 ){
            valid = false;
            this.setState({
                v_decription : false
            })            
        }
        if(this.state.author.trim() < 2 ) {
            valid = false;
            this.setState ({
                v_author : false
            })            
        }
        return valid
    }
    // when Click save validate it is update or new add book
    // call reltive api   
    onSave = async ()=>{
        if(this.validate()){
            // make book object with book details
            let Book = {
                "Title": this.state.title,
                "Description": this.state.decription,
                "Author": this.state.author,
                "BooksAvailable": this.state.quantity,
                "Price": this.state.price,            
            }
            // if it is update book call update api
            if(this.state.status === "updateBook") {     
                if(this.state.image !== null && this.state.image !== undefined){
                    formData.append('BookImage',this.state.image)
                    await ImageBook(this.state.bookId,formData)
                    .then(responce=>{  })
                    .catch(error=>{ })
                }
                // update book api call
                await UpdateBook(Book,this.state.bookId) 
                .then(responce=>{    })
                .catch(error=>{   })
            }
            else{       // else call add book api
                await AddBook(Book)        
                .then(responce=>{               
                    if(this.state.image !== null && this.state.image !== undefined){
                        formData.append('BookImage',this.state.image)
                        ImageBook(responce.data.data.bookId,formData)
                        .then(responce=>{                          
                            this.props.updateBooks();                                      
                        })
                        .catch(error=>{  }) 
                    }

                })
                .catch(error=>{                   
                })
            }
            // callback function to close dialog box       
            this.props.updateBooks();
            this.props.closeDialog('');
        }
    }
    // snackbar method
    SnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        } 
      };

    render() {
        return (
            <div className='BookDetailsAdmin' >    
                <div className='imageContainerAdmin'>
                    {(this.state.imageUrl !== null && this.state.imageUrl !== undefined ) ?
                        <img src={this.state.imageUrl}  
                            className='BookImageAdmin'
                            alt="BookImage"
                            onClick={() =>
                            this.fileUpload.click()
                                }                                
                        />  
                        :  <div  className='ImageIconText'
                                onClick={() =>
                                this.fileUpload.click()
                                }>
                                <Button style={{textTransform: 'none'}}><ImageIcon/>BookImage</Button>
                            </div>
                    }
                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.fileChangedHandler}
                        ref={(fileUpload) =>
                        (this.fileUpload = fileUpload)
                        }
                    ></input>                             
                </div>
                <div>
                    <TextField 
                        className='titleField'
                        value={this.state.title} 
                        variant='outlined'
                        label = 'Title'
                        name='title'
                        size='small'
                        error={!this.state.v_title}
                        helperText={this.state.v_title ? '' : this.state.error_message}
                        fullWidth
                        inputProps={{style: { fontSize:'14px'}}}
                        onChange={this.onChange}   
                    />
                </div>
                <div>
                    <TextField 
                        className='authorField'
                        value={this.state.author} 
                        fullWidth
                        variant='outlined'
                        label = 'Author'
                        name='author'
                        size='small'
                        error={!this.state.v_author}
                        helperText={this.state.v_author ? '' : this.state.error_message}
                        inputProps={{style: {  fontSize:'14px'}}}
                        onChange={this.onChange}   
                    />
                </div>
                <div>
                    <TextField 
                        className='decriptionField'
                        value={this.state.decription} 
                        multiline
                        fullWidth
                        rowsMax='6'                        
                        variant='outlined'
                        label = 'Decription'
                        name='decription'
                        error={!this.state.v_decription}
                        helperText={this.state.v_decription? '' : this.state.error_message}
                        size='small'
                        inputProps={{style: { fontSize:'14px'}}}
                        onChange={this.onChange}   
                    />
                </div>
                <div>
                    <TextField 
                        className='priceField'
                        value={this.state.price} 
                        variant='outlined'
                        label = 'Price'
                        fullWidth
                        type='number'
                        name='price'
                        size='small'
                        inputProps={{style: { fontSize:'14px'}}}
                        onChange={this.onChange}   
                    />
                </div>
                <div>
                    <TextField 
                        className='quantityField'
                        value={this.state.quantity} 
                        type='number'
                        variant='outlined'
                        label = 'Quantity'
                        fullWidth
                        name='quantity'
                        size='small'
                        inputProps={{style: { fontSize:'14px'}}}
                        onChange={this.onChange}   
                    />
                </div>           
                <div className='ButtonsBookDetailsAdmin'>
                    <Button style={{color:'white', backgroundColor : '#4285F4' , textTransform: 'none'}}
                            onClick={this.onSave}
                    > 
                        <DoneOutlinedIcon/> Save</Button>
                    <Button style={{backgroundColor:'#61605e' ,color : 'white', textTransform: 'none'}}
                            onClick={this.props.closeDialog}
                    >
                        <ClearOutlinedIcon/> Cancel
                    </Button>
                </div>   
            </div>
        );
    }
}
// redux dispatch util method
const mapDispatchToProps = dispatch =>{
  return {
    updateBooks: () => dispatch(getStoreBooks()),
  }
}
export default connect(null,mapDispatchToProps) (BookDecription);