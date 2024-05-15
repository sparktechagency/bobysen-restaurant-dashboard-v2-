/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "antd";
import ResForm from "../../../component/Form/FormProvider";
import ResInput from "../../../component/Form/ResInput";
import { useAddMenuCategortyMutation } from "../../../redux/features/menu/menuApi";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuValidationSchema } from "../../../schema/menu.schema";
import FileUpload from "../../../component/FileUpload";
import UseImageUpload from "../../../hooks/useImageUpload";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetAllRestaurantsQuery } from "../../../redux/features/restaurant/restaurantApi";
// import ResSelect from "../../../component/Form/ResSelect";

const AddCategory = ({ setShow }: any) => {
  const { setFile, imageUrl, imageFile } = UseImageUpload();
  const [addcategory] = useAddMenuCategortyMutation();
  const user = useAppSelector(useCurrentUser);
  const { data: restaurantData } = useGetAllRestaurantsQuery({
    owner: user?.userId,
  });
  // const options = restaurantData?.data?.map((data: any) => {
  //   return {
  //     label: data?.name,
  //     value: data?._id,
  //   };
  // });
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Createing category....");
    if (!restaurantData?.data[0]) {
      toast.error("Please create an restaurant before upload category", {
        id: toastId,
        duration: 2000,
      });
      return;
    }
    const formData = new FormData();
    if (!imageFile) {
      toast.error("Please select an category image", {
        id: toastId,
        duration: 2000,
      });
      return;
    }
    formData.append("file", imageFile);
    formData.append(
      "data",
      JSON.stringify({ ...data, restaurant: restaurantData?.data[0]?._id })
    );
    try {
      await addcategory(formData).unwrap();
      toast.success("Menu category added successfully", {
        id: toastId,
        duration: 2000,
      });
      setShow((prev: boolean) => !prev);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  return (
    <div className="mt-4">
      <ResForm
        onSubmit={onSubmit}
        resolver={zodResolver(menuValidationSchema.menuCategorySchema)}
      >
        <Form.Item className="flex justify-center">
          <FileUpload imageUrl={imageUrl} setSelectedFile={setFile} />
        </Form.Item>
        {/* <ResSelect
          options={options}
          placeholder="Select restaurant"
          name="restaurant"
          size="large"
          label="Select Restaurant"
        /> */}
        <ResInput
          type="text"
          label="Enter Category Title"
          name="title"
          placeholder="category name"
          size="large"
        />

        <Button
          htmlType="submit"
          className="bg-primary text-white w-full  h-[40px]"
        >
          Submit
        </Button>
      </ResForm>
    </div>
  );
};

export default AddCategory;
