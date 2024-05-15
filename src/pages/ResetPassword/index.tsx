import { zodResolver } from "@hookform/resolvers/zod";
import { authValidationSchema } from "../../schema/auth.schema";
import { GiConfirmed } from "react-icons/gi";
import GuruForm from "../../component/Form/FormProvider";
import ResInput from "../../component/Form/ResInput";
import { Button } from "antd";
const ResetPassword = () => {
  const onSubmit = async () => {};
  return (
    <div className="flex  items-center justify-center h-[80vh]">
      <div className="w-[800px] text-black">
        <div className="flex items-center gap-x-2 mb-4">
          <h1 className="font-600 text-32 text-primary ">
            Reset Your Password
          </h1>
        </div>
        <GuruForm
          onSubmit={onSubmit}
          resolver={zodResolver(authValidationSchema.changePasswordSchema)}
        >
          <ResInput
            label="New Password"
            type="password"
            size="large"
            name="newPassword"
            placeholder="enter your current password"
          />
          <ResInput
            label="Confirm Password"
            type="password"
            size="large"
            name="confirmPassword"
            placeholder="enter your new  password"
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
  );
};

export default ResetPassword;
