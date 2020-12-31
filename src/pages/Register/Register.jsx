import React from "react";
import "./Register.scss";
import Alert from "@material-ui/lab/Alert";
import { TextField, Snackbar, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Footer from "./../../component/Footer/Footer";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import RegEx from "./../../service/regrex";
import userServices from "./../../service/userServices";
import Header from "../../component/header/Header";
let service = new userServices();

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      snackbarMsg: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      city: "",
      address: "",
      phoneNumber: "",
      openSnackbar: false,
      snackbarVarient: "error",
      responseMessage: "",
      firstNameErrorStatus: false,
      firstNameErrorMessage: "",
      firstNameValid: false,
      lastNameErrorStatus: false,
      lastNameErrorMessage: "",
      lastNameValid: false,
      emailErrorStatus: false,
      emailErrorMessage: "",
      emailValid: false,
      passwordErrorStatus: false,
      passwordErrorMessage: "",
      passwordValid: false,
    };
  }

  handleChangeText = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value }, (firstName) =>
      this.validateFirstname(this.state.firstName)
    );
  };
  handleLastNameChange = (e) => {
    this.setState({ lastName: e.target.value }, (lastName) =>
      this.validateLastname(this.state.lastName)
    );
  };
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
  //Regular expression Validation for First Name
  validateFirstname = (input) => {
    let error = RegEx.regexName.test(String(input)) ? "" : "Invalid First Name";
    if (error === "") {
      this.setState({ firstNameErrorStatus: false });
      this.setState({ firstNameErrorMessage: error });
      this.setState({ firstNameValid: true });
    } else {
      this.setState({ firstNameErrorStatus: true });
      this.setState({ firstNameErrorMessage: error });
      this.setState({ firstNameValid: false });
    }
  };
  //Regular expression Validation for Last Name
  validateLastname = (input) => {
    let error = RegEx.regexName.test(String(input)) ? "" : "Invalid Last Name";
    if (error === "") {
      this.setState({ lastNameErrorStatus: false });
      this.setState({ lastNameErrorMessage: error });
      this.setState({ lastNameValid: true });
    } else {
      this.setState({ lastNameErrorStatus: true });
      this.setState({ lastNameErrorMessage: error });
      this.setState({ lastNameValid: false });
    }
  };
  //Regular expression Validation for Email
  validateEmail = (input) => {
    let error = RegEx.regexEmail.test(String(input)) ? "" : "Not a valid email";
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
  //Regular expression Validation for Password
  validatePassword = (input) => {
    let error = RegEx.regexPassword.test(String(input))
      ? ""
      : "Invalid Password";
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
  Register = () => {
    let errorFirstname = this.state.firstName ? "" : "First Name is Required";
    if (errorFirstname === "") {
      this.setState({ firstNameErrorStatus: false });
      this.setState({ firstNameErrorMessage: errorFirstname });
      this.setState({ firstNameValid: true });
    } else {
      this.setState({ firstNameErrorStatus: true });
      this.setState({ firstNameErrorMessage: errorFirstname });
      this.setState({ firstNameValid: false });
    }
    let errorLastname = this.state.lastName ? "" : "Last Name is Required";
    if (errorLastname === "") {
      this.setState({ lastNameErrorStatus: false });
      this.setState({ lastNameErrorMessage: errorLastname });
      this.setState({ lastNameValid: true });
    } else {
      this.setState({ lastNameErrorStatus: true });
      this.setState({ lastNameErrorMessage: errorLastname });
      this.setState({ lastNameValid: false });
    }
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      city: this.state.city,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
    };
    service
      .Registration(user)
      .then((json) => {
        if (json.data.success === true) {
          this.setState({ responseMessage: "Registration Successful" });
          this.setState({ snackbarVarient: "success" });
          this.setState({ OpenSnackbar: true });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 200);
        } else {
          this.setState({
            responseMessage: "Email ID is already Exsist",
          });
          this.setState({ snackbarVarient: "error" });
          this.setState({ OpenSnackbar: true });
        }
      })
      .catch((err) => {});
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
      <div>
        <Header variant="normal" goToStore={() => this.goToStore()}></Header>
        <div className="register">
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
          <Card className="registerCard" variant="outlined">
            <br />
            <span className="createAccount">Create account</span>
            <br />
            <br />
            <div className="registerform">
              <TextField
                className="name"
                variant="outlined"
                name="firstName"
                id="firstName"
                label="First Name"
                required
                onChange={(e) => this.handleFirstNameChange(e)}
                error={this.state.firstNameErrorStatus}
                helperText={this.state.firstNameErrorMessage}
              />
              <br />
              <TextField
                className="name"
                variant="outlined"
                name="lastName"
                id="lastName"
                label="Last Name"
                required
                onChange={(e) => this.handleLastNameChange(e)}
                error={this.state.lastNameErrorStatus}
                helperText={this.state.lastNameErrorMessage}
              />
              <br />
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
              <span className="textline">
                Passwords must be at least 8 characters.
              </span>
              <br />
              <TextField
                className="name"
                name="city"
                variant="outlined"
                id="city"
                label="City"
                defaultValue={this.state.city}
                onChange={this.handleChangeText}
              />
              <br />
              <TextField
                className="name"
                name="address"
                variant="outlined"
                id="address"
                label="Address"
                defaultValue={this.state.address}
                onChange={this.handleChangeText}
              />
              <br />
              <TextField
                className="name"
                name="phoneNumber"
                variant="outlined"
                id="phoneNumber"
                label="Phone Number"
                defaultValue={this.state.phoneNumber}
                onChange={this.handleChangeText}
              />
              <br />
              <br />
              <Button
                className="submitbutton"
                variant="contained"
                color="primary"
                onClick={this.Register}
              >
                Submit
              </Button>
              <br />
              <div className="accountExsists">
                <span className="text">Already have an account?</span>
                <Button
                  className="signInstead"
                  color="primary"
                  onClick={() => this.props.history.push("/login")}
                >
                  Sign in instead
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default Register;
