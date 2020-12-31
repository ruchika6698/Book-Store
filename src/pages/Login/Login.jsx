import React from "react";
import Card from "@material-ui/core/Card";
import "./Login.scss";
import Loginimage from "./../../assets/Loginimage.jpg";
import Header from "./../../component/header/Header";
import Alert from "@material-ui/lab/Alert";
import Footer from "./../../component/Footer/Footer";
import { TextField, Snackbar, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import auth from "./../../service/auth";
import RegEx from "./../../service/regrex";
import userServices from "./../../service/userServices";
let service = new userServices();

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      openSnackbar: false,
      snackbarVarient: "error",
      email: "",
      password: "",
      responseMessage: "",
      emailErrorStatus: false,
      emailErrorMessage: "",
      emailValid: false,
      passwordErrorStatus: false,
      passwordErrorMessage: "",
      passwordValid: false,
    };
  }
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value }, (email) =>
      this.validateEmail(this.state.email)
    );
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value }, (password) =>
      this.validatePassword(this.state.password)
    );
  };

  /* =====================================
    VALIDATIONS
    =======================================*/
  //Regular Expression Validation for Email
  validateEmail = (input) => {
    let error = RegEx.regexEmail.test(String(input)) ? "" : "Email is Invalid";
    if (error === "") {
      this.setState({ emailErrorStatus: false });
      this.setState({ emailErrorMessage: error });
      this.setState({ emailValid: true });
    } else {
      this.setState({ emailErrorStatus: true });
      this.setState({ emailErrorMessage: error });
      this.setState({ emailValid: false });
    }
  };
  //Regular Expression Validation for Password
  validatePassword = (input) => {
    let error = RegEx.regexPassword.test(String(input))
      ? ""
      : "Password is Invalid";
    if (error === "") {
      this.setState({ passwordErrorStatus: false });
      this.setState({ passwordErrorMessage: error });
      this.setState({ passwordValid: true });
    } else {
      this.setState({ passwordErrorStatus: true });
      this.setState({ passwordErrorMessage: error });
      this.setState({ passwordValid: false });
    }
  };

  //API Integration and Required field Validation
  signIn = () => {
    let errorEmail = this.state.email ? "" : "Email is Required";
    if (errorEmail === "") {
      this.setState({ emailErrorStatus: false });
      this.setState({ emailErrorMessage: errorEmail });
      this.setState({ emailValid: true });
    } else {
      this.setState({ emailErrorStatus: true });
      this.setState({ emailErrorMessage: errorEmail });
      this.setState({ emailValid: false });
    }
    let errorPassword = this.state.password ? "" : "Password is Required";
    if (errorPassword === "") {
      this.setState({ passwordErrorStatus: false });
      this.setState({ passwordErrorMessage: errorPassword });
      this.setState({ passwordValid: true });
    } else {
      this.setState({ passwordErrorStatus: true });
      this.setState({ passwordErrorMessage: errorPassword });
      this.setState({ passwordValid: false });
    }
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    service
      .Login(user)
      .then((json) => {
        if (json.data.success === true) {
          localStorage.setItem("Token", json.data.jsonToken);
          localStorage.setItem("FirstName", json.data.data.firstName);
          localStorage.setItem("LastName", json.data.data.lastName);
          localStorage.setItem("Email", json.data.data.email);
          localStorage.setItem("User Role", json.data.data.userRole);
          localStorage.setItem("Address", json.data.data.address);
          localStorage.setItem("City", json.data.data.city);
          localStorage.setItem("Phone Number", json.data.data.phoneNumber);
          this.setState({ responseMessage: "Login Successful" });
          this.setState({ snackbarVarient: "success" });
          this.setState({ OpenSnackbar: true });
          if (json.data.data.userRole === "Admin") {
            auth.login();
            if (auth.isAuthenticated) {
              setTimeout(() => {
                this.props.history.push("/dashboard");
              }, 2000);
            }
          } else {
            auth.login();
            if (auth.isAuthenticated) {
              setTimeout(() => {
                this.props.history.push("/");
              }, 2000);
            }
          }
        }
      })
      .catch((err) => {
        this.setState({
          responseMessage: "Username or Password is Incorrect",
        });
        this.setState({ snackbarVarient: "error" });
        this.setState({ OpenSnackbar: true });
      });
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ OpenSnackbar: false });
  };
  goToStore = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="loginPage">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.OpenSnackbar}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            severity={this.state.snackbarVarient}
          >
            {this.state.responseMessage}
          </Alert>
        </Snackbar>
        <Header variant="normal" goToStore={() => this.goToStore()}></Header>
        <div className="Login">
          <Card className="LoginCard" variant="outlined">
            <div className="loginImage">
              <img
                src={Loginimage}
                alt="Book logo"
                height="120px"
                width="300px"
              />
            </div>
            <span className="Bookstore">Login</span>
            <br />
            <div className="Loginform">
              <TextField
                className="name"
                name="email"
                variant="outlined"
                id="outlined-required"
                label="Email"
                required
                onChange={(e) => this.handleEmailChange(e)}
                error={this.state.emailErrorStatus}
                helperText={this.state.emailErrorMessage}
              />
              <br />
              <TextField
                className="name"
                name="password"
                id="outlined-adornment-password"
                type={this.state.showPassword ? "text" : "password"}
                variant="outlined"
                required
                label="Password"
                onChange={(e) => this.handlePasswordChange(e)}
                error={this.state.passwordErrorStatus}
                helperText={this.state.passwordErrorMessage}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sytle={{ width: "1px" }}>
                      <IconButton
                        onClick={() =>
                          this.setState({
                            showPassword: !this.state.showPassword,
                          })
                        }
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <br />
              <div className="buttonLogin">
                <div>
                  <Button
                    className="signup"
                    color="primary"
                    onClick={() => this.props.history.push("/register")}
                  >
                    Create account
                  </Button>
                </div>
                <div>
                  <Button
                    className="button-Login"
                    variant="contained"
                    color="primary"
                    onClick={this.signIn}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default Login;
