/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import GuruForm from "../../component/Form/FormProvider";
import image from "./../../assets/bg_2.jpg";
import { authValidationSchema } from "../../schema/auth.schema";
import ResInput from "../../component/Form/ResInput";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import ErrorResponse from "../../component/UI/ErrorResponse";
import { toast } from "sonner";

interface FieldValues {
  email: string;
}

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Sending Otp..");
    try {
      const res = await forgotPassword(data).unwrap();
      toast.success("An otp successfully sent your email", {
        id: toastId,
        duration: 2000,
      });
      sessionStorage.setItem("email", data?.email);
      sessionStorage.setItem("token", res?.data?.token);
      navigate("/verify-otp");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };

  return (
    <div
      className="bg-cover bg-center "
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex justify-center items-center h-screen ">
        <div className="w-[490px] h-[430px]  bg-white px-4 rounded">
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
            <h1 className="text-primary text-32 font-600 mt-2">Email</h1>
            <p className="text-20 text-gray">
              Enter your email address to ger a verification code for resetting
              your password.
            </p>
          </div>
          <div className="mt-[25px]">
            <GuruForm
              onSubmit={onSubmit}
              resolver={zodResolver(authValidationSchema.fogotpasswordSchema)}
            >
              <ResInput
                size="large"
                type="email"
                name="email"
                label="Email"
                placeholder="enter your gmail"
              />
              <Button
                className="w-full mt-[50px]    text-18 font-600 h-10 bg-primary text-white"
                htmlType="submit"
              >
                Get OTP
              </Button>
            </GuruForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
