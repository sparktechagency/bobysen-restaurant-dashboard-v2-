/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import ResForm from "../../../component/Form/FormProvider";
import ResInput from "../../../component/Form/ResInput";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { useEditMyMenuCategoriesMutation } from "../../../redux/features/menu/menuApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuValidationSchema } from "../../../schema/menu.schema";
import UseImageUpload from "../../../hooks/useImageUpload";

import FileUpload from "../../../component/FileUpload";
import { Form } from "antd";
import showImage from "../../../utils/showImage";

const EditCategory = ({ setshowEditModal }: any) => {
  const [EditMenuCategory] = useEditMyMenuCategoriesMutation();
  const categoryData: any = useAppSelector((state) => state.menu.category);

  const { setFile, imageUrl, imageFile } = UseImageUpload();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Createing category....");
    const formData = new FormData();
    if (imageFile) {
      formData.append("file", imageFile);
    }

    formData.append("data", JSON.stringify(data));
    try {
      await EditMenuCategory({
        id: categoryData?._id,
        body: formData,
      }).unwrap();
      toast.success("Menu category added successfully", {
        id: toastId,
        duration: 2000,
      });
      setshowEditModal((prev: boolean) => !prev);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  return (
    <div className="mt-4">
      <ResForm
        onSubmit={onSubmit}
        defaultValues={categoryData}
        resolver={zodResolver(menuValidationSchema.menuCategorySchema)}
      >
        <Form.Item className="flex justify-center">
          <FileUpload
            imageUrl={imageUrl ?? showImage(categoryData?.image)}
            setSelectedFile={setFile}
          />
        </Form.Item>

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
          Edit
        </Button>
      </ResForm>
    </div>
  );
};

export default EditCategory;
