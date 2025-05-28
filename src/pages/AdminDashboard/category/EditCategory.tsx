import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { toast } from "sonner";
import ResForm from "../../../component/Form/FormProvider";
import ResInput from "../../../component/Form/ResInput";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import { useAppSelector } from "../../../redux/hooks";
import { editCategorySchema } from "../../../schema/category.schema";

// Only name field is required

const EditCategory = ({ setShow }: any) => {
  const [EditMenuCategory] = useUpdateCategoryMutation();
  const categoryData: any = useAppSelector((state) => state.category);

  const onSubmit = async (data: any) => {
    console.log(data);
    const toastId = toast.loading("Updating category...");
    try {
      await EditMenuCategory({
        id: categoryData?._id,
        body: {
          ...data,
        },
      }).unwrap();
      toast.success("Category updated successfully", {
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
        defaultValues={{ name: categoryData?.name || "" }}
        resolver={zodResolver(editCategorySchema)}
      >
        <ResInput
          type="text"
          label="Enter Category name"
          name="name"
          placeholder="category name"
          size="large"
        />
        <Button
          htmlType="submit"
          className="bg-primary text-white w-full h-[40px]"
        >
          Edit
        </Button>
      </ResForm>
    </div>
  );
};

export default EditCategory;
