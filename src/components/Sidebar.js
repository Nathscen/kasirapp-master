import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Sidebar = () => {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#365486" backgroundColor="#FFFFFF" shadow>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact
              as={Link}
              to="/manage-customer"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">
                Manage Customer
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              as={Link}
              to="/manage-product"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="table">
                Manage Product
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              as={Link}
              to="/manage-worker"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">Manage Worker</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              as={Link}
              to="/manage-transaction"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="chart-line">
                Manage Transaction
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div style={{ padding: "20px 5px" }}>Sidebar Footer</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
