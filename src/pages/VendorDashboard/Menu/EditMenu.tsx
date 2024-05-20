/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "antd";
import ResForm from "../../../component/Form/FormProvider";
import UseImageUpload from "../../../hooks/useImageUpload";
import ResInput from "../../../component/Form/ResInput";
import ResSelect from "../../../component/Form/ResSelect";
import ResTextArea from "../../../component/Form/ResTextarea";
import FileUpload from "../../../component/FileUpload";
import showImage from "../../../utils/showImage";
import {
  useGetMYmenuCategoriesQuery,
  useUpdateMenuMutation,
} from "../../../redux/features/menu/menuApi";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuValidationSchema } from "../../../schema/menu.schema";
const EditMenu = ({ data, setShow }: any) => {
  //console.log(data);
  const { imageUrl, setFile, imageFile } = UseImageUpload();
  const { data: categoryData } = useGetMYmenuCategoriesQuery(undefined);
  const [editMenu] = useUpdateMenuMutation();
  const options = categoryData?.data?.map((data: any) => {
    return {
      label: data?.title,
      value: data?._id,
    };
  });
  const id = data?._id;
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("file", imageFile);
    }
    if (data) {
      formData.append("data", JSON.stringify(data));
    }
    const toastId = toast.loading("Editing menu...");
    try {
      await editMenu({ id: id, body: formData }).unwrap();
      toast.success("Menu updated successfully", {
        id: toastId,
        duration: 2000,
      });
      setShow((prev: boolean) => !prev);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  const options2 = [
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ];
  return (
    <ResForm
      onSubmit={onSubmit}
      defaultValues={data}
      resolver={zodResolver(menuValidationSchema.menuSchema)}
    >
      <Form.Item className="flex justify-center">
        <FileUpload
          imageUrl={imageUrl ?? showImage(data?.image)}
          setSelectedFile={setFile}
        />
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
        defaultValue={data?.category}
        label="Select Category"
        name="category"
        options={options}
        placeholder="select status"
        size="large"
      />
      <ResSelect
        label="Select Available Status"
        name="available"
        defaultValue={data?.Available}
        // @ts-ignore
        options={options2}
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
        EDIT
      </Button>
    </ResForm>
  );
};

export default EditMenu;
