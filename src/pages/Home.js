import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, Menus, NavbarComponent } from "../components";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      keranjangs: [],
    };
  }

  componentDidMount() {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        this.props.history.push("/login");
      }
      const response = await axios({
        method: "get",
        url: "http://127.0.0.1:8080/petugas/list_produk",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjYsIm5hbWEiOiJrYXNpciIsInJvbGUiOjMsImVtYWlsIjoia2FzaXJAZ21haWwuY29tIiwiaWF0IjoxNzA4ODkzNjk1fQ.KYs-RbT1jNb68UXM9VXQCiztQ0L8K1YvScZ9NjUuKGs`,
        },
      });
      this.setState({
        menus: response.data.data,
      });
    };
    getData();
  }
  render() {
    const { menus, keranjangs } = this.state;
    return (
      <div>
        <NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <Col md={3}>
                <Sidebar />
              </Col>
              <Col className="mt-3">
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menus.map((menu) => (
                    <Menus
                      key={menu.id_produk}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} {...this.props} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
