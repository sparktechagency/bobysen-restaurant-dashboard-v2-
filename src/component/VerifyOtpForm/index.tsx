/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Button, Col, Input, InputRef, Row } from "antd";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./verifyOtpForm.module.css";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../redux/features/otp/otpApi";
import { toast } from "sonner";
import ErrorResponse from "../UI/ErrorResponse";

const VerifyOtpFrom = () => {
  const navigate = useNavigate();
  const [VerifyOtp] = useVerifyOtpMutation();
  const [resendOtps] = useResendOtpMutation();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const otpBoxReference: React.MutableRefObject<
    (InputRef | HTMLInputElement)[]
  > = useRef<(InputRef | HTMLInputElement)[]>([]);
  const handleChange = (value: string, index: number) => {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
    if (value && index < 6 - 1) {
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
    const toastId = toast.loading("VERIFYING...");
    const formatedOtp = otp.join("");
    try {
      const res = await VerifyOtp({ otp: formatedOtp }).unwrap();
      toast.success("Otp verified successfully", {
        id: toastId,
        duration: 2000,
      });
      sessionStorage.setItem("token", res?.data?.token);
      navigate("/new-password");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  const resendOtp = async () => {
    const toastId = toast.loading("Resending....");

    try {
      const res: any = await resendOtps({
        email: sessionStorage.getItem("email"),
      }).unwrap();
      console.log(res);
      toast.success("Otp sent successfully", { id: toastId, duration: 2000 });
      sessionStorage.setItem("token", res?.data?.token);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <div className={`mt-2  flex flex-col`} style={{ height: "300px" }}>
      <Row justify="center">
        {otp.map((digit, index) => (
          <Col lg={5}>
            <Input
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              ref={(reference) =>
                (otpBoxReference.current[index] = reference as InputRef)
              }
              className={`${style.otpInput}`}
            />
          </Col>
        ))}
      </Row>
      <div className="flex justify-between my-4">
        <p className="text-gray text-18 text-600">Don't received code?</p>
        <p
          className="reset-password-resend text-gray  font-600 text-18 hover:text-primary cursor-pointer"
          onClick={resendOtp}
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
export default VerifyOtpFrom;
