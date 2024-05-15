/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { sidebarItemsGenerator } from "../utils/sidebarItemsGenerator";
import { adminRoute } from "../router/admin.route";
import { IoLogInOutline } from "react-icons/io5";
import { vendorRoute } from "../router/vendor.route";
import { logout, useCurrentUser } from "../redux/features/auth/authSlice";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = location;
  const collapsed = useAppSelector((state) => state.layout.collapsed);
  const { role }: any = useAppSelector(useCurrentUser) || {};
  let SidebarItems;
  switch (role) {
    case "admin":
      SidebarItems = sidebarItemsGenerator(adminRoute, role);
      break;
    case "vendor":
      SidebarItems = sidebarItemsGenerator(vendorRoute, role);
      break;

    default:
      break;
  }
  const handeLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      // collapsedWidth="0"
      style={{
        height: "100vh",
        zIndex: 154,
        overflow: "auto",
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "#D2D9CC",
      }}
    >
      <div
        style={{
          color: "white",
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="" />
      </div>
      <Menu
        style={{
          backgroundColor: "#D2D9CC",
          marginTop: "10px",
        }}
        // theme="dark"
        mode="inline"
        // selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        // @ts-ignore
        items={SidebarItems}
      />

      {!collapsed ? (
        <div className=" absolute w-full bottom-5 flex justify-center items-center">
          <Button
            onClick={handeLogout}
            icon={<IoLogInOutline />}
            className="w-full bg-primary flex items-center justify-center font-600 text-18 h-[40px]"
          >
            Log Out
          </Button>
        </div>
      ) : null}
    </Sider>
  );
};

export default Sidebar;
