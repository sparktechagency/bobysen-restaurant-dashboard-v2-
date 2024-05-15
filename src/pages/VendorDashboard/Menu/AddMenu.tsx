/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "antd";
import ResForm from "../../../component/Form/FormProvider";
import UseImageUpload from "../../../hooks/useImageUpload";
import ResInput from "../../../component/Form/ResInput";
import ResSelect from "../../../component/Form/ResSelect";
import ResTextArea from "../../../component/Form/ResTextarea";
import {
  useAddMenuMutation,
  useGetMYmenuCategoriesQuery,
} from "../../../redux/features/menu/menuApi";
import { useGetAllRestaurantsQuery } from "../../../redux/features/restaurant/restaurantApi";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { toast } from "sonner";
import FileUpload from "../../../component/FileUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuValidationSchema } from "../../../schema/menu.schema";
const AddMenu = ({ setShow }: any) => {
  const { data: categoryData } = useGetMYmenuCategoriesQuery(undefined);
  const category = categoryData?.data?.map((data: any) => {
    return {
      label: data?.title,
      value: data?._id,
    };
  });
  const { data: restaurantData } = useGetAllRestaurantsQuery({});
  const [addMenu] = useAddMenuMutation();
  const { imageUrl, setFile, imageFile } = UseImageUpload();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Adding menu....");
    if (!imageFile) {
      toast.error("Please select an image", { id: toastId, duration: 2000 });
    }
    const formatedData = {
      ...data,
      restaurant: restaurantData?.data[0]?._id,
    };

    const formData = new FormData();
    if (!imageFile) {
      toast.error("Please select an image", { id: toastId, duration: 2000 });
      return;
    }
    formData.append("file", imageFile);
    formData.append("data", JSON.stringify(formatedData));

    try {
      await addMenu(formData).unwrap();
      toast.success("Menu added successfully", { id: toastId, duration: 2000 });
      setShow((prev: boolean) => !prev);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  const options = [
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ];
  return (
    <ResForm
      onSubmit={onSubmit}
      resolver={zodResolver(menuValidationSchema.menuSchema)}
    >
      <Form.Item className="flex justify-center">
        <FileUpload imageUrl={imageUrl} setSelectedFile={setFile} />
      </Form.Item>
      <ResInput
        type="text"
        label="Enter Menu Name"
        name="name"
        placeholder="menu name"
        size="large"
      />
      <ResInput
        type="number"
        label="Enter Menu Price"
        name="price"
        placeholder="price"
        size="large"
      />
      <ResSelect
        label="Select Category"
        name="category"
        options={category}
        placeholder="select status"
        size="large"
      />
      <ResSelect
        label="Select Available Status"
        name="available"
        defaultValue={"true"}
        // @ts-ignore
        options={options}
        placeholder="select status"
        size="large"
      />
      <ResTextArea
        label="Description"
        name="description"
        placeholder="description"
        size="large"
      />
      <Button
        htmlType="submit"
        className="bg-primary text-white w-full  h-[40px]"
      >
        Submit
      </Button>
    </ResForm>
  );
};

export default AddMenu;
