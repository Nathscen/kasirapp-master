import React, { Component } from "react";
import LoginForm from "../components/LoginForm";


export default class LoginPage extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#C9D7DD", height: "100vh" }}>
        <LoginForm />
      </div>
    );
  }
}
