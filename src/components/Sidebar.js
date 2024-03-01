import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const handleLogout = () => {
    // Hapus token dari localStorage saat logout
    localStorage.removeItem("token");
  };

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#FFFFFF" backgroundColor="#565555" shadow>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="tachometer-alt">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/manage-customer"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="users">
                Manage Customer
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/manage-product" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="shopping-cart">
                Manage Product
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/manage-worker" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user-friends">
                Manage Worker
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/manage-transaction"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="money-bill-alt">
                Manage Transaction
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/login"
              activeClassName="activeClicked"
              onClick={handleLogout}
            >
              <CDBSidebarMenuItem icon="sign-out-alt">
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
