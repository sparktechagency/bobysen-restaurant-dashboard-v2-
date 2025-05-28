/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import ResForm from "../../../component/Form/FormProvider";
import ResInput from "../../../component/Form/ResInput";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { usePostCategoryMutation } from "../../../redux/features/category/categoryApi";
import { insertCategorySchema } from "../../../schema/category.schema";

const CreateCategory = ({ setShow }: any) => {
  const [postCategory] = usePostCategoryMutation();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creating...");
    try {
      await postCategory({ body: data }).unwrap();
      toast.success("Category created successfully", {
        id: toastId,
        duration: 2000,
      });
      setShow((prev: boolean) => !prev);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <div>
      <ResForm onSubmit={onSubmit} resolver={zodResolver(insertCategorySchema)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ResInput
              placeholder="Enter category name"
              label="Enter category name"
              name="name"
              type="text"
              size="large"
            />
          </Col>

          <Col span={24}>
            <Button
              className="w-full bg-primary h-[40px] text-white font-500"
              htmlType="submit"
            >
              SUBMIT
            </Button>
          </Col>
        </Row>
      </ResForm>
    </div>
  );
};

export default CreateCategory;
