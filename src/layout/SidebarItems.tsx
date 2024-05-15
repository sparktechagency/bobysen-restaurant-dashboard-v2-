import { RiUserShared2Line } from "react-icons/ri";
import { GiBattleAxe } from "react-icons/gi";
import { IoWalletOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
// import { BiSupport } from "react-icons/bi";
import { IoLogInOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { MdPeopleOutline } from "react-icons/md";

const handleLogout = async () => {
  console.log("done");
};
export const SidebarItems = [
  {
    key: "/vendor",
    icon: <MdPeopleOutline />,
    label: <NavLink to="/vendor">Vendor</NavLink>,
  },
  {
    key: "/users",
    icon: <RiUserShared2Line />,
    label: <NavLink to="/users">Users</NavLink>,
  },
  {
    key: "/contest",
    icon: <GiBattleAxe />,
    label: <NavLink to="/contest">Contest</NavLink>,
  },
  {
    key: "/wallet",
    icon: <IoWalletOutline />,
    label: <NavLink to="/wallet">Wallet</NavLink>,
  },
  {
    key: "/setting",
    icon: <CiSettings />,
    label: <NavLink to="/setting">Setting</NavLink>,
  },
  // {
  //   key: "/support",
  //   icon: <BiSupport />,
  //   label: <NavLink to="/support">Support</NavLink>,
  // },
  {
    key: "logout",
    icon: <IoLogInOutline />,
    label: (
      <NavLink to="/login" onClick={handleLogout}>
        Log Out
      </NavLink>
    ),
  },
];
