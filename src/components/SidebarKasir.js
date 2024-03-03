import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const SidebarKasir = () => {
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
            <NavLink exact to="/menu" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="bars">Menu</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/manage-product-kasir"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="shopping-cart">
                Manage Product
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

export default SidebarKasir;
