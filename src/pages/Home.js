import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, Menus, NavbarComponent } from "../components";
import axios from "axios";
import SidebarKasir from "../components/SidebarKasir";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      keranjangs: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:8080/petugas/list_produk",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const productList = response.data.data.listProduk || [];
      this.setState({
        menus: productList,
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  tambahProduk = (produk) => {
    const { keranjangs } = this.state;
    const newKeranjangs = [...keranjangs, produk];
    this.setState({ keranjangs: newKeranjangs });
  };

  render() {
    const { menus, keranjangs } = this.state;
    return (
      <div>
        <NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <Col md={3}>
                <SidebarKasir />
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
                      tambahProduk={this.tambahProduk}
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
