import { CiSettings } from "react-icons/ci";
import {
  MdDashboard,
  MdOutlineCategory,
  MdOutlineTableRestaurant,
  MdRestaurantMenu,
} from "react-icons/md";
import ChangePasswordFrom from "../pages/ChangePasswordForm";
import Notification from "../pages/Notification";
import Setting from "../pages/Setting";

import Otp from "../pages/Otp";
import UpdatePassword from "../pages/UpdatePassword";
import VendorDashboard from "../pages/VendorDashboard";
import Order from "../pages/VendorDashboard/Order";
import VendorRestaurant from "../pages/VendorDashboard/Restaurant";
import CreateRestaurant from "../pages/VendorDashboard/Restaurant/CreateRestaurant";
import Table from "../pages/VendorDashboard/Table";

import { BsBorderStyle } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Profile from "../pages/Profile";
import Booking from "../pages/VendorDashboard/Booking";
import Menu from "../pages/VendorDashboard/Menu";
import AddMenu from "../pages/VendorDashboard/Menu/AddMenu";
import MenuCategory from "../pages/VendorDashboard/MenuCategory";
import EditRestaurant from "../pages/VendorDashboard/Restaurant/EditRestaurant";
import VendorTransaction from "../pages/VendorDashboard/Transaction";
import Vevent from "../pages/VendorDashboard/Vevent";
import Ebooking from "../pages/VendorDashboard/Vevent/Ebooking";

export const vendorRoute = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <MdDashboard />,
    element: <VendorDashboard />,
  },
  {
    name: "Restaurant",
    path: "restaurant",
    icon: <MdOutlineTableRestaurant />,
    element: <VendorRestaurant />,
  },
  {
    name: "Booking & Order",
    path: "booking",
    icon: <BsBorderStyle />,
    element: <Booking />,
  },
  {
    name: "Event",
    path: "vendor-event",
    icon: <BsBorderStyle />,
    element: <Vevent />,
  },
  {
    path: "booking/:id",
    element: <Ebooking />,
  },
  {
    path: "order/:id",
    element: <Order />,
  },
  {
    name: "Table",
    path: "table",
    icon: <MdOutlineTableRestaurant />,
    element: <Table />,
  },
  {
    name: "Menu",
    icon: <MdRestaurantMenu />,
    children: [
      {
        name: "Category",
        path: "category",
        icon: <MdOutlineCategory />,
        element: <MenuCategory />,
      },
      {
        name: "Menu",
        path: "menu",
        icon: <MdRestaurantMenu />,
        element: <Menu />,
      },
    ],
  },
  {
    name: "Wallet",
    path: "wallet",
    icon: <RiMoneyDollarCircleLine />,
    element: <VendorTransaction />,
  },
  {
    path: "create-restaurant",
    element: <CreateRestaurant />,
  },
  {
    path: "edit-restaurant/:id",
    element: <EditRestaurant />,
  },
  {
    path: "add-menu",
    element: <AddMenu />,
  },

  {
    name: "Setting",
    path: "setting",
    icon: <CiSettings />,
    element: <Setting />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "notification",
    element: <Notification />,
  },
  {
    path: "change-password",
    element: <ChangePasswordFrom />,
  },
  {
    path: "otp",
    element: <Otp />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
];
