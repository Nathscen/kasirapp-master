import React, { Component } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Container } from "react-bootstrap";
import DetailTransaksi from "../components/DetailTransaksi";

export default class DetailTransaksiPage extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <Container>
          <DetailTransaksi />
        </Container>
      </div>
    );
  }
}
