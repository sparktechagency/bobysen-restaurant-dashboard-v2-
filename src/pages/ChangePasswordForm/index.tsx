/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import GuruForm from "../../component/Form/FormProvider";
import ResInput from "../../component/Form/ResInput";
import { NavLink, useNavigate } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useProfileQuery,
} from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import ErrorResponse from "../../component/UI/ErrorResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidationSchema } from "../../schema/auth.schema";
import { useAppDispatch } from "../../redux/hooks";
import { setToken } from "../../redux/features/otp/otpSlice";
import ResForm from "../../component/Form/FormProvider";

interface SubmitProps {
  currentPassword: string;
  newPassword: string;
  oldPassword: string;
}
const ChangePasswordFrom = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [changePassword] = useChangePasswordMutation();
  const { data: profile } = useProfileQuery(undefined);
  const [forgotPassword] = useForgotPasswordMutation();
  const onSubmit = async (data: SubmitProps) => {
    console.log(data);
    const toastId = toast("Changing");
    try {
      const res: any = await changePassword(data).unwrap();
      toast.success("Password changed successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  const handleForgotPassword = async () => {
    const toastId = toast.loading("Sending Otp");
    try {
      const res = await forgotPassword(profile?.data).unwrap();
      console.log(res);
      toast.success("An otp sent to your email address", {
        id: toastId,
        duration: 2000,
      });
      dispatch(setToken(res?.data));
      sessionStorage.setItem("token", res?.data?.token);
      navigate(`/${profile?.data?.role}/otp`);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  const role = "admin";
  return (
    <div className="flex  items-center justify-center h-[80vh]">
      <div className="w-[800px] text-black">
        <div className="flex items-center gap-x-2 mb-4">
          <h1 className="font-600 text-32 text-primary ">
            Change Your Password
          </h1>
        </div>
        <ResForm
          onSubmit={onSubmit}
          resolver={zodResolver(authValidationSchema.changePasswordSchema)}
        >
          <ResInput
            label="Current Password"
            type="password"
            size="large"
            name="oldPassword"
            placeholder="enter your current password"
          />
          <ResInput
            label="New Password"
            type="password"
            size="large"
            name="newPassword"
            placeholder="enter your new  password"
          />
          <ResInput
            label="Old Password"
            type="password"
            size="large"
            name="confirmPassword"
            placeholder="enter confirm password"
          />

          <p
            onClick={handleForgotPassword}
            className="text-gray text-end text-18 mb-4 font-600 cursor-pointer"
          >
            Forgot Password
          </p>

          <Button
            htmlType="submit"
            className="bg-primary w-full h-[38px] flex justify-center items-center font-600 text-18 border-0"
            icon={<GiConfirmed />}
          >
            Confirm
          </Button>
        </ResForm>
      </div>
    </div>
  );
};

export default ChangePasswordFrom;
