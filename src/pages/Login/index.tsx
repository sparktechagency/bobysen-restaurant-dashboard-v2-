/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GuruForm from "../../component/Form/FormProvider";
import ResInput from "../../component/Form/ResInput";
import ErrorResponse from "../../component/UI/ErrorResponse";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { authValidationSchema } from "../../schema/auth.schema";
import { verifyToken } from "../../utils/verifyToken";
import image from "./../../assets/bg_2.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Logging in");
    // navigate("/dashboard");
    try {
      const res: any = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user?.role}/dashboard`);
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
        <div className="w-[490px] h-[450px]  bg-white px-4 rounded">
          <div className="text-center mt-6">
            <h1 className="text-primary text-32  font-600">Welcome</h1>
            <p className="text-20 text-gray">Sign in here</p>
          </div>
          <div className="mt-[20px]">
            <GuruForm
              onSubmit={onSubmit}
              resolver={zodResolver(authValidationSchema.loginValidationSchema)}
            >
              <ResInput
                size="large"
                type="email"
                name="email"
                label="Email"
                placeholder="enter your gmail"
              />

              <ResInput
                type="password"
                size="large"
                name="password"
                label="Password"
                placeholder="enter your password"
              />
              <NavLink to="/forgot-password">
                <h5 className="text-18 text-gray text-end font-600 cursor-pointer">
                  Forget Password
                </h5>
              </NavLink>
              <Button
                className="w-full mt-[30px] text-18 font-600 h-10 bg-primary text-white"
                htmlType="submit"
              >
                Sign In
              </Button>
            </GuruForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
