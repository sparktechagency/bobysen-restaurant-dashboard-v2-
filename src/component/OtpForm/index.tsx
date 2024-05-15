/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Input, InputRef, Row } from "antd";
import { useRef, useState } from "react";
import style from "./otpForm.module.css";
import { useNavigate } from "react-router-dom";
import {
  useProfileQuery,
  useResetPasswordMutation,
} from "../../redux/features/auth/authApi";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../redux/features/otp/otpApi";
import { toast } from "sonner";
import ErrorResponse from "../UI/ErrorResponse";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
interface IotpForm {
  type?: string;
  onSubmit?: (otp: string) => void;
}
const OtpForm = ({ type }: IotpForm) => {
  const [resendOtp] = useResendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const { data: profileData } = useProfileQuery(undefined);
  const token = useAppSelector((state) => state.otp.token);
  const user: TUser | null = useAppSelector(useCurrentUser);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const otpBoxReference: React.MutableRefObject<
    (InputRef | HTMLInputElement)[]
  > = useRef<(InputRef | HTMLInputElement)[]>([]);
  const handleChange = (value: string, index: number) => {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
    if (value && index < 4 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };
  const handleBackspaceAndEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.currentTarget.value && index < 4 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };
  const handleSubmit = async () => {
    const toastId = toast.loading("Verifying Otp");
    try {
      const formatedOtp = otp.join("");
      const res = await verifyOtp({ otp: formatedOtp, token }).unwrap();
      toast.success("Otp verified successfully", {
        id: toastId,
        duration: 2000,
      });
      sessionStorage.setItem("token", res?.data?.token);
      navigate(`/${user?.role}/update-password`);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  const handleResendOtp = async () => {
    const toastId = toast.loading("Resending");
    try {
      const res = await resendOtp(profileData?.data).unwrap();
      toast.success("Otp sent successfully", { id: toastId, duration: 2000 });
      sessionStorage.setItem("token", res?.data?.token);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  return (
    <div className={` mt-2  flex flex-col`} style={{ height: "300px" }}>
      <Row>
        {otp.map((digit, index) => (
          <Col lg={4} className="flex justify-center">
            <Input
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              ref={(reference) =>
                (otpBoxReference.current[index] = reference as InputRef)
              }
              className={`${
                type === "verify" ? style.otpInput2 : style.otpInput1
              }`}
            />
          </Col>
        ))}
      </Row>
      <div className="flex justify-between my-4">
        <p className="text-black font-600 text-18 text-600">
          Don't received code?
        </p>
        <p
          className="reset-password-resend text-black  font-600 text-18 hover:text-primary cursor-pointer"
          onClick={handleResendOtp}
        >
          Resend
        </p>
      </div>
      <div>
        <Button
          onClick={handleSubmit}
          disabled={otp.join("").length !== 4}
          htmlType="submit"
          className={`${style.otpButton}  `}
          block
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default OtpForm;
