import React, { Component } from "react";
import { Grid, Container } from "@material-ui/core";
import "./Footer.scss";

export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          className="globalFooter"
          alignItems="center"
          justify="flex-start"
        >
          <Container maxWidth="lg">
            Copyright &#169; 2020. Bookstore Private Limited. All Rights
            Reserved
          </Container>
        </Grid>
      </React.Fragment>
    );
  }
}
