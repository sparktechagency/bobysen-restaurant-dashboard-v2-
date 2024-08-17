import { FaHome } from "react-icons/fa";
import { MdPeopleOutline } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import AdminDashboard from "../pages/AdminDashboard";
import Restaurant from "../pages/AdminDashboard/Restaurant";
import Transaction from "../pages/AdminDashboard/Transaction";
// import Payment from "../pages/AdminDashboard/Payment";
import { BsBorderStyle } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import AboutUs from "../pages/AboutUs";

import ABooking from "../pages/AdminDashboard/ABooking";
import TopRestaurant from "../pages/AdminDashboard/TopRestaurant";
import ChangePasswordFrom from "../pages/ChangePasswordForm";
import Notification from "../pages/Notification";
import Otp from "../pages/Otp";
import PrivacyPolicy from "../pages/PrivaryPolicy";
import Profile from "../pages/Profile";
import Setting from "../pages/Setting";
import TermsAndCondition from "../pages/TermsAndCondition";
import UpdatePassword from "../pages/UpdatePassword";

export const adminRoute = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <MdPeopleOutline />,
    element: <AdminDashboard />,
  },
  {
    name: "Top Restaurant",
    path: "top-restaurant",
    icon: <FaHome />,
    element: <TopRestaurant />,
  },
  {
    name: "Restaurants",
    path: "restaurant",
    icon: <FaHome />,
    element: <Restaurant />,
  },
  {
    name: "Booking",
    path: "booking",
    icon: <BsBorderStyle />,
    element: <ABooking />,
  },
  {
    name: "Wallet",
    path: "wallet",
    icon: <RiMoneyDollarCircleLine />,
    element: <Transaction />,
  },
  // {
  //   name: "Make Payment",
  //   path: "payment",
  //   icon: <RiMoneyDollarCircleLine />,
  //   element: <Payment />,
  // },
  {
    name: "Setting",
    path: "setting",
    icon: <CiSettings />,
    element: <Setting />,
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
  {
    path: "privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "terms",
    element: <TermsAndCondition />,
  },
  {
    path: "about",
    element: <AboutUs />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];
