/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ResForm from "../../../component/Form/FormProvider";
import ResDatePicker from "../../../component/Form/ResDatePicker";
import ResInput from "../../../component/Form/ResInput";
import ResSelect from "../../../component/Form/ResSelect";
import ResTextArea from "../../../component/Form/ResTextarea";
import MultiUpload from "../../../component/MultiUpload/MultiUpload";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import UseImageUpload from "../../../hooks/useImageUpload";
import {
  usePostAnEventMutation,
  useUpdateEventsMutation,
} from "../../../redux/features/event/eventApi";
import { useGetAllRestaurantForadminQuery } from "../../../redux/features/restaurant/restaurantApi";
import { insertEventSchema } from "../../../schema/event.schema";
import showImage from "../../../utils/showImage";

const EditEvent = ({ setShow, data: propsData }: any) => {
  const { data: Rdata } = useGetAllRestaurantForadminQuery({});
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const options = Rdata?.data?.map((data: any) => {
    return {
      label: data.name,
      value: data._id,
    };
  });
  const { imageFile, imageUrl, setFile } = UseImageUpload();
  const [EditEvent] = useUpdateEventsMutation();

  // Load images if available
  useEffect(() => {
    if (propsData?.images) {
      setFileList(
        propsData?.images?.map((image: any) => ({
          uid: image?._id,
          name: image?.url,
          status: "done",
          url: showImage(image?.url),
        }))
      );
    }
  }, [propsData]);

  const onSubmit = async (data: any) => {
    console.log("submitted data");
    const toastId = toast.loading("Editing...");
    try {
      const formData = new FormData();
      if (fileList.length > 0) {
        fileList.forEach((file: any) => {
          formData.append("files", file.originFileObj); // Append the file object
        });
      }
      formData.append("data", JSON.stringify(data));
      await EditEvent({ id: propsData?._id, data: formData }).unwrap();
      toast.success("Event edited successfully", {
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
        <MultiUpload
          fileList={fileList as RcFile[]}
          setFileList={setFileList}
        />
      </div>
      <ResForm
        onSubmit={onSubmit}
        defaultValues={propsData}
        resolver={zodResolver(insertEventSchema)}
      >
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
            <ResInput
              placeholder="Enter entry fee"
              label="Enter entry fee"
              name="entryFee"
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

          <Col span={12}>
            <ResDatePicker
              className="w-full"
              format="YYYY-MM-DD"
              placeholder="Select date"
              label="Select start date"
              name="startDate"
              size="large"
            />
          </Col>
          <Col span={12}>
            <ResDatePicker
              className="w-full"
              format="YYYY-MM-DD"
              placeholder="Select date"
              label="Select end date"
              name="endDate"
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

export default EditEvent;
