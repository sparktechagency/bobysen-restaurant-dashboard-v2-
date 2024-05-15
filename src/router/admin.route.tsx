import AdminDashboard from "../pages/AdminDashboard";
import { MdPeopleOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Restaurant from "../pages/AdminDashboard/Restaurant";
import Transaction from "../pages/AdminDashboard/Transaction";
// import Payment from "../pages/AdminDashboard/Payment";
import { CiSettings } from "react-icons/ci";
import Setting from "../pages/Setting";
import Notification from "../pages/Notification";
import ChangePasswordFrom from "../pages/ChangePasswordForm";
import PrivacyPolicy from "../pages/PrivaryPolicy";
import TermsAndCondition from "../pages/TermsAndCondition";
import AboutUs from "../pages/AboutUs";
import Otp from "../pages/Otp";
import UpdatePassword from "../pages/UpdatePassword";

export const adminRoute = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <MdPeopleOutline />,
    element: <AdminDashboard />,
  },
  {
    name: "Restaurants",
    path: "restaurant",
    icon: <FaHome />,
    element: <Restaurant />,
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
];
