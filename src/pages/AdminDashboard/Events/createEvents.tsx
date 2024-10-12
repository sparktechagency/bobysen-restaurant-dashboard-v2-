/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import FileUpload from "../../../component/FileUpload";
import ResForm from "../../../component/Form/FormProvider";
import ResDatePicker from "../../../component/Form/ResDatePicker";
import ResInput from "../../../component/Form/ResInput";
import ResSelect from "../../../component/Form/ResSelect";
import ResTextArea from "../../../component/Form/ResTextarea";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import UseImageUpload from "../../../hooks/useImageUpload";
import { usePostAnEventMutation } from "../../../redux/features/event/eventApi";
import { useGetAllRestaurantForadminQuery } from "../../../redux/features/restaurant/restaurantApi";
import { insertEventSchema } from "../../../schema/event.schema";

const CreateEvents = ({ setShow }: any) => {
  const { data: Rdata } = useGetAllRestaurantForadminQuery({});

  const options = Rdata?.data?.map((data: any) => {
    return {
      label: data.name,
      value: data._id,
    };
  });
  const { imageFile, imageUrl, setFile } = UseImageUpload();
  const [createEvents] = usePostAnEventMutation();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creating...");
    try {
      const formData = new FormData();
      formData.append("file", imageFile as File);
      formData.append("data", JSON.stringify(data));
      await createEvents(formData).unwrap();
      toast.success("Event created successfully", {
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
      <div className="block mx-auto text-center">
        <FileUpload setSelectedFile={setFile} imageUrl={imageUrl} />
      </div>
      <ResForm onSubmit={onSubmit} resolver={zodResolver(insertEventSchema)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ResInput
              placeholder="Enter event title"
              label="Enter event title"
              name="title"
              type="text"
              size="large"
            />
          </Col>

          <Col span={24}>
            <ResSelect
              options={options}
              placeholder="Select Restaurant"
              label="Select Restaurant"
              name="restaurant"
              size="large"
            />
          </Col>

          <Col span={24}>
            <ResDatePicker
              className="w-full"
              format="YYYY-MM-DD"
              placeholder="Select date"
              label="Select date"
              name="date"
              size="large"
            />
          </Col>

          <Col span={24}>
            <ResTextArea
              placeholder="Enter description"
              label="Enter description"
              name="description"
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

export default CreateEvents;
