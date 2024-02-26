import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, Menus, NavbarComponent } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import SidebarKasir from "../components/SidebarKasir";

export default class HomeKasir extends Component {
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExLCJuYW1hIjoiY2FoeWEiLCJyb2xlIjozLCJlbWFpbCI6ImNhaHlhQGdtYWlsLmNvbSIsImlhdCI6MTcwODg4NTEzNH0.OCjAt4aqH2M4uB8_VCMfqdZyy7auM0FG_0yP_IyBVf8`,
        },
      });
      this.setState({
        menus: response.data.data,
      });
    };
    getData();
  }

  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch((error) => {
          console.log("Error yaa ", error);
        });
    }
  }

  masukKeranjang = (value) => {
    axios
      .get("petugas/list_produk?id_produk" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
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
                  {menus &&
                    menus.map((menu) => (
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

