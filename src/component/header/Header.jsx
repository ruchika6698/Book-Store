import React, { Component, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  InputBase,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import bookstoreLogo from "./../../assets/logo.svg";
import SearchBooks from "./../../redux/Observables/searchObservable"
import "./Header.scss";
import { connect } from "react-redux";

/*
  Two variants - simple & rich
  *** PROPS ***
  variant="simple"  // gives app bar only with Logo and brand name
  variant="rich"    // gives app bar with logo, brand name, searchBar, account and cart icon
  onProfileClick    // pass your onClick handler for account here
  onCartClick       // pass your onClick handler for cart here
  onLogoutClick     // pass your onClick handler for logout here
*/

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      cartItemsNo: 0,
    };
  }

  search = (event) => {
    this.props.onSearch(event.target.value);
    
  };

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null }, this.handleMobileMenuClose());
  };

  profile = () => {
    this.props.onProfileClick();
  };

  logout = () => {
    this.props.onLogout();
  };

  cart = () => {
    this.props.onCartClick();
  };

  updateOnChange = () => {
    this.setState({ cartItemsNo: this.props.cartItemsNo });
  };

  componentDidMount() {
    this.updateOnChange();
  }

  menuId = "primary-search-account-menu";

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.grow}>
          <AppBar position="fixed" className={classes.appbar}>
            <Container maxWidth="lg">
              <Toolbar className="toolbar">
                <IconButton
                  className="bookstoreLogo"
                  onClick={() => {
                    this.props.goToStore();
                  }}
                >
                  <Tooltip title="Go to store">
                    <img
                      src={bookstoreLogo}
                      className="bookstoreLogo-icon"
                      alt="bookstoreLogo"
                    />
                  </Tooltip>
                </IconButton>
                {this.props.variant === "rich" ? (
                  <Typography className={classes.titleRich} variant="h6" noWrap>
                    Bookstore
                  </Typography>
                ) : (
                  <Typography
                    className={classes.titleNormal}
                    variant="h6"
                    noWrap
                  >
                    Bookstore
                  </Typography>
                )}

                {this.props.variant === "rich" ? (
                  <React.Fragment>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                        onChange={(event) => this.search(event)}
                      />
                    </div>
                    <div className={classes.grow} />

                    {localStorage.getItem("Token") ? (
                      <Fragment>
                        <Tooltip title="Go to Cart">
                          <IconButton
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={() => this.props.goToCart()}
                          >
                            <Badge
                              badgeContent={this.props.cartLength}
                              color="secondary"
                            >
                              <ShoppingCartOutlinedIcon />
                            </Badge>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Open menu">
                          <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={this.menuId}
                            aria-haspopup="true"
                            onClick={this.handleProfileMenuOpen}
                            color="inherit"
                          >
                            <AccountCircle />
                          </IconButton>
                        </Tooltip>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Tooltip title="Login">
                          <div
                            className="appBarButton"
                            onClick={() => this.props.goToLogin()}
                          >
                            Login
                          </div>
                        </Tooltip>
                        <Tooltip title="Register">
                          <div
                            className="appBarButton"
                            onClick={() => this.props.goToRegister()}
                          >
                            Register
                          </div>
                        </Tooltip>
                      </Fragment>
                    )}
                    <div className={classes.menuContainer}>
                      <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        // keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={() => this.handleMenuClose()}
                        className={classes.userAccountMenu}
                      >
                        <MenuItem
                          onClick={() => this.profile()}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <label htmlFor="contained-button-file">Profile</label>
                        </MenuItem>

                        <MenuItem
                          onClick={() => this.logout()}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {" "}
                          <label htmlFor="contained-button-file">Logout</label>
                        </MenuItem>
                      </Menu>
                    </div>
                  </React.Fragment>
                ) : null}
              </Toolbar>
            </Container>
          </AppBar>
        </div>
      </React.Fragment>
    );
  }
}

const useStyles = (theme) => ({
  appbar: {
    backgroundColor: "#a03037",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleRich: {
    fontFamily: "'Lato', sans-serif",

    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  titleNormal: {
    fontFamily: "'Lato', sans-serif",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
    color: "#000",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "35%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "40%",
    },

    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      padding: 0,
      width: "100%",
    },
  },
  searchIcon: {
    color: "#9d9d9d",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("xs")]: {
      padding: 0,
      display: "none",
      visibility: "hidden",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "60ch",
    },

    [theme.breakpoints.down("xs")]: {
      paddingLeft: 5,
      fontSize: 12,
    },

    fontFamily: "'Lato', sans-serif",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  menuContainer: {
    position: "relative",
  },

  "MuiMenu-list": {
    textAlign: "center",
    display: "inline",
    color: "black",

    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  },
});

const mapStateToProps = (state) => {
  return {
    cartLength: state.store.cartItems,
  };
};

export default withStyles(useStyles)(connect(mapStateToProps)(Header));
