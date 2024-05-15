import { LeftOutlined } from "@ant-design/icons";
import bgImage from "../../assets/bg_2.jpg";
import { NavLink } from "react-router-dom";

import VerifyOtpFrom from "../../component/VerifyOtpForm";
const VerifyOtp = () => {
  return (
    <div
      className="bg-cover bg-center "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex justify-center items-center h-screen ">
        <div className="w-[490px] h-[440px]  bg-white px-4 rounded">
          <div className=" mt-8 ">
            <NavLink to="/login">
              <LeftOutlined
                style={{
                  backgroundColor: "#CCCCCC",
                  padding: "12px",
                  borderRadius: "50%",
                }}
              />
            </NavLink>
            <h1 className="text-primary text-32 font-600 mt-2">Verify OTP</h1>
            <p className="text-20">
              We have sent you an OTP to your email address.Please check it and
              place the otp for resetting password
            </p>
          </div>

          <VerifyOtpFrom />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
