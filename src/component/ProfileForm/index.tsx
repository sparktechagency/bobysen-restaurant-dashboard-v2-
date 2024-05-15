/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "antd";

import ResInput from "../Form/ResInput";
import { MdEditSquare } from "react-icons/md";
import ResForm from "../Form/FormProvider";
import ErrorResponse from "../UI/ErrorResponse";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "../../redux/features/auth/authApi";

interface ProfilePros {
  usrName: string;
  name: string;
  email: string;
}
const ProfileForm = ({ ProfileData, imageFile }: any) => {
  const [updateProfile] = useUpdateProfileMutation();
  const defaultValues = {
    fullName: ProfileData?.data?.fullName,
  };
  const onSubmit = async (data: ProfilePros) => {
    console.log(data);
    const toastId = toast.loading("Updating profile...");

    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("file", imageFile);
      }
      formData.append("data", JSON.stringify(data));
      const res = await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };

  return (
    // @ts-ignore

    <ResForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <ResInput
        labelColor="#FD8533"
        label="Name"
        type="text"
        name="fullName"
        placeholder="your name"
      />
      {/* <ResInput
        labelColor="#FD8533"
        label="Email"
        type="text"
        name="email"
        placeholder="your email"
      /> */}
      <div className="flex items-center gap-x-2">
        <Button
          htmlType="submit"
          className="bg-primary w-full flex justify-center items-center font-600 text-18 border-0"
          icon={<MdEditSquare />}
        >
          Edit
        </Button>
      </div>
    </ResForm>
  );
};

export default ProfileForm;
