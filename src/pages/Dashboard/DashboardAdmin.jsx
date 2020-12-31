import "./DashboardAdmin.scss";
import React, { Component } from "react";
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
} from "@material-ui/core";
import Logo from "./../../component/logo/Logo";
import BookDetailsTable from "./BookDetailsTable";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import BookDecription from "./BookDecription";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Popover from "@material-ui/core/Popover";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import { searchStoreBooks } from "./../../redux/actions/StoreActions.js";
import  {Searchbook} from "./../../redux/Observables/searchObservable"
import {SearchList} from "./../../service/AdminServices"

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: "",
      AddBookDialogOpen: false,
      selectedBookData: "",
      isUpdateBook: false,
      hideSearch: false,
      isScreenBelow600: false,
      hedderDataVisable: true,
      data: [],
      searchWord: "",
      updateData: false,
      dataUpdated: "",
      anchorEl: null,
      // snackbarProperties
      snackbar: {
        Open: false,
        Message: "",
        Severity: "success",
      },
    };
  }
  // profile popover open handler
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };
  // profile popover close handler
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  // profile logout functionality
  LogOut = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };
  // onChange hadler for search field
  onSearchWordChange = async (eve) => {
    this.setState({
      searchWord: eve.target.value,
    });
    // this.props.GetSearchBooks(eve.target.value);
    // SearchSubscriber.next( 
    //   await SearchList(eve.target.value)
    // )    
    await Searchbook(eve.target.value);
  };
  // hanler method for open book description dialog box for add book
  OpenAddBookDialogBox = () => {
    this.setState({
      AddBookDialogOpen: true,
    });
  };
  // hanler method for open book description dialog box with book data for update book
  OpenBookDialogBoxWithData = (bookData) => {
    this.setState({
      isUpdateBook: true,
      AddBookDialogOpen: true,
      selectedBookData: bookData,
    });
  };
  // handler for close the book dialog box
  CloseAddBookDialogBox = (data) => {
    this.setState({
      AddBookDialogOpen: false,
      selectedBookData: "",
      isUpdateBook: false,
      // variable to reload data into table
      dataUpdated: data,
    });
  };
  setRefreshFalse = () => {
    this.setState({
      updateData: false,
    });
  };
  // screen size handlers to  hide search bar
  componentWillMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  resize() {
    this.setState({
      hideSearch: window.innerWidth >= 600,
      isScreenBelow600: !(window.innerWidth >= 600),
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  // onClick handler of search icon
  onSearchIconClick = () => {
    if (this.state.isScreenBelow600) {
      this.setState({
        hideSearch: !this.state.hideSearch,
        hedderDataVisable: !this.state.hedderDataVisable,
      });
    }
  };
  // snack bar handler
  SnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackbar: {
        Open: false,
        Message: "",
        Severity: "success",
      },
    });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.SnackbarClose}
        >
          <Alert
            onClose={this.SnackbarClose}
            severity={this.state.snackbarSeverity}
          >
            {this.state.snackBarMessage}
          </Alert>
        </Snackbar>
        <div>
          <div className="headderAdmin">
            {this.state.hedderDataVisable ? (
              <div className="LogoAdmin">
                <Logo />
              </div>
            ) : null}
            <div
              className={
                this.state.hideSearch ? "searchBarAdmin" : "searchBarOffAdmin"
              }
            >
              <div>
                <IconButton onClick={this.onSearchIconClick}>
                  <SearchOutlinedIcon
                    style={
                      this.state.hideSearch
                        ? null
                        : { color: "white", position: "relative", left: "20px" }
                    }
                    fontSize="large"
                  />
                </IconButton>
              </div>
              {this.state.hideSearch ? (
                <div>
                  <TextField
                    className="searchField"
                    placeholder="Search"
                    onChange={this.onSearchWordChange}
                    value={this.state.searchWord}
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </div>
              ) : null}
            </div>
            {this.state.hedderDataVisable ? (
              <div>
                <div float="right">
                  <Button
                    className="AddButtonAdmin"
                    style={{ color: "white" }}
                    onClick={this.OpenAddBookDialogBox}
                  >
                    <AddOutlinedIcon />
                    <MenuBookOutlinedIcon />
                  </Button>
                  <IconButton
                    style={{ color: "white", marginLeft: "20px" }}
                    onClick={this.handleClick}
                    className="AcoountIconAdmin"
                  >
                    <AccountCircleOutlinedIcon />
                  </IconButton>
                </div>
                <Popover
                  open={Boolean(this.state.anchorEl)}
                  anchorEl={this.state.anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Button
                    type="button"
                    style={{ padding: "5px", textTransform: "none" }}
                    onClick={this.LogOut}
                  >
                    logOut
                  </Button>
                </Popover>
              </div>
            ) : null}
          </div>
        </div>
        <Container className="BooksDisplayContainerAdmin">
          <BookDetailsTable
            showBook={this.OpenBookDialogBoxWithData}
            searchWord={this.state.searchWord}
          />
          {/* <Footer/> */}
          <div>
            <Dialog
              className="AddBookDialogAdmin"
              open={this.state.AddBookDialogOpen}
              onClose={this.CloseAddBookDialogBox}
              fullWidth
            >
              <DialogTitle
                style={{
                  backgroundColor: "#A73F46",
                  height: "60px",
                  color: "white",
                }}
              >
                {
                  <span className="AddBookDilogheadderAdmin">
                    <ImportContactsOutlinedIcon fontSize="large" />
                    {this.state.isUpdateBook ? " UpdateBook" : " AddBook"}{" "}
                  </span>
                }
              </DialogTitle>
              <DialogContent>
                <BookDecription
                  bookData={this.state.selectedBookData}
                  closeDialog={this.CloseAddBookDialogBox}
                />
              </DialogContent>
            </Dialog>
          </div>
        </Container>
      </div>
    );
  }
}

// redux dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    GetSearchBooks: (searchWord) => dispatch(searchStoreBooks(searchWord)),
  };
};

export default connect(null, mapDispatchToProps)(AdminDashboard);
