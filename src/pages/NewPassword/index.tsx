import { NavLink, useNavigate } from "react-router-dom";
import bgImage from "./../../assets/bg_2.jpg";
import { LeftOutlined } from "@ant-design/icons";
import GuruForm from "../../component/Form/FormProvider";
import ResInput from "../../component/Form/ResInput";
import { Button } from "antd";
import { GiConfirmed } from "react-icons/gi";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import ErrorResponse from "../../component/UI/ErrorResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidationSchema } from "../../schema/auth.schema";
interface PasswordProps {
  newPassword: string;
  confirmPassword: string;
}
const NewPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: PasswordProps) => {
    const toastId = toast.loading("Password resetting....");
    try {
      await resetPassword(data).unwrap();
      toast.success("Password reseted successfully", {
        id: toastId,
        duration: 200,
      });
      sessionStorage.clear();
      navigate("/login");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  return (
    <div
      className="bg-cover bg-center "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex justify-center items-center h-screen ">
        <div className="w-[490px] h-[440px]  bg-white px-4 rounded">
          <div className=" mt-8 ">
            <NavLink to="/verify-otp">
              <LeftOutlined
                style={{
                  backgroundColor: "#CCCCCC",
                  padding: "12px",
                  borderRadius: "50%",
                }}
              />
            </NavLink>
            <h1 className="text-primary text-32 font-600 mt-2">
              Set New Password
            </h1>
            <p className="text-20">
              A password should be more than 8 characters, including digits,
              letters, and symbols
            </p>
          </div>

          <div>
            <GuruForm
              onSubmit={onSubmit}
              resolver={zodResolver(authValidationSchema.resetPasswordSchema)}
            >
              <ResInput
                size="large"
                label="New Password"
                type="password"
                name="newPassword"
                placeholder="enter your current password"
              />
              <ResInput
                size="large"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="enter your confirm password"
              />

              <Button
                htmlType="submit"
                className="bg-primary w-full h-[38px] flex justify-center items-center font-600 text-18 border-0"
                icon={<GiConfirmed />}
              >
                Confirm
              </Button>
            </GuruForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
