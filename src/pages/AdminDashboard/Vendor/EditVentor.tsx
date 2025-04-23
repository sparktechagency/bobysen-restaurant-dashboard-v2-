/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "antd";
import ResForm from "../../../component/Form/FormProvider";
import ResInput from "../../../component/Form/ResInput";
import UseImageUpload from "../../../hooks/useImageUpload";

import FileUpload from "../../../component/FileUpload";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../../../redux/features/auth/authApi";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import showImage from "../../../utils/showImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidationSchema } from "../../../schema/auth.schema";

const EditVentor = ({ setShowEditModal }: any) => {
  const { imageUrl, setFile, imageFile } = UseImageUpload();
  const [editVendor] = useUpdateUserMutation();
  const vendorData = useAppSelector((state) => state.auth.vendorDetails);

  const onSubmit = async (data: any) => {
    const formatedData = {
      fullName: data?.fullName,
      phoneNumber: data?.phoneNumber,
      email: data?.email,
      currentEmail: vendorData?.email,
    };
    const toastId = toast.loading("Editing......");
    const formData = new FormData();
    if (imageFile) {
      formData.append("file", imageFile);
    }
    formData.append("data", JSON.stringify(formatedData));
    try {
      await editVendor({ id: vendorData?._id, body: formData }).unwrap();
      toast.success("Vendor updated successfully", {
        id: toastId,
        duration: 2000,
      });
      setShowEditModal((prev: boolean) => !prev);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  return (
    <ResForm
      onSubmit={onSubmit}
      defaultValues={vendorData}
      resolver={zodResolver(authValidationSchema.EditVendorSchema)}
    >
      <Form.Item className="flex justify-center">
        <FileUpload
          imageUrl={imageUrl ?? showImage(vendorData?.image)}
          setSelectedFile={setFile}
        />
        <p className="text-center">upload image</p>
      </Form.Item>
      <ResInput
        size="large"
        type="text"
        label="Enter name"
        name="fullName"
        placeholder="name"
      />

      <ResInput
        size="large"
        type="number"
        label="Enter phoneNumber"
        name="phoneNumber"
        placeholder="number"
      />
      <ResInput
        size="large"
        type="text"
        label="Enter Email"
        name="email"
        placeholder="email"
      />

      <Button
        htmlType="submit"
        className="bg-primary text-white w-full h-[36px]"
      >
        Submit
      </Button>
    </ResForm>
  );
};

export default EditVentor;
