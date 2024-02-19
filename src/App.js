import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Sukses } from "./pages";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddProductPage from "./pages/AddProductPage";
import DashboardPage from "./pages/DashboardPage";
import ManageCustomerPage from "./pages/ManageCustomerPage";
import ManageProductPage from "./pages/ManageProductPage";
import ManageWorkerPage from "./pages/ManageWorkerPage";
import ManageTransactionPage from "./pages/ManageTransactionPage";
import EditProductPage from "./pages/EditProductPage";
import AddWorkPage from "./pages/AddWorkPage";
import EditWorkerPage from "./pages/EditWorkerPage";
import AddCustomerPage from "./pages/AddCustomerPage";
import QRCodePage from "./pages/QRCodePage";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/sukses" component={Sukses} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route path="/register" component={RegisterPage} exact />
            <Route path="/manage-product" component={ManageProductPage} exact />
            <Route path="/add-product" component={AddProductPage} exact />
            <Route path="/dashboard" component={DashboardPage} exact />
            <Route path="/edit-product" component={EditProductPage} exact />
            <Route
              path="/manage-customer"
              component={ManageCustomerPage}
              exact
            />
            <Route path="/manage-worker" component={ManageWorkerPage} exact />
            <Route
              path="/manage-transaction"
              component={ManageTransactionPage}
              exact
            />
            <Route path="/add-worker" component={AddWorkPage} exact />
            <Route path="/edit-worker" component={EditWorkerPage} exact />
            <Route path="/add-customer" component={AddCustomerPage} exact />
            <Route path="/qr-generator" component={QRCodePage} exact />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}
