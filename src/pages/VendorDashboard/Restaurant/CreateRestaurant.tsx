/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import MultiUpload from "../../../component/MultiUpload/MultiUpload";
import { Button, Col, Divider, Form, Row, Switch, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

import ResInput from "../../../component/Form/ResInput";
import ResTextArea from "../../../component/Form/ResTextarea";
import ResTimePicker from "../../../component/Form/ResTimepicker";
import { useAddRestaurantMutation } from "../../../redux/features/restaurant/restaurantApi";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { toast } from "sonner";
import ResDatePicker from "../../../component/Form/ResDatePicker";
import moment from "moment";
import { days } from "../../../constant/days";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantSchema } from "../../../schema/restaurant.schema";
import ResForm from "../../../component/Form/FormProvider";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const CreateRestaurant = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const [reviewStatus, setReviewStatus] = useState(true);
  const [addRestaurant] = useAddRestaurantMutation();
  const onChange = (value: boolean) => {
    setReviewStatus(value);
  };
  const onSubmit = async (data: any) => {
    // check at least 5 images
    if (fileList.length !== 5) {
      toast.error("Please select 5 image before submitting..");
      return;
    }
    const formData = new FormData();
    if (fileList.length > 0) {
      fileList.forEach((file: any) => {
        formData.append("files", file.originFileObj); // Append the file object
      });
    }
    formData.append("data", JSON.stringify({ ...data, reviewStatus }));
    const toastId = toast.loading("Creating new restaurant...");
    try {
      const res = await addRestaurant(formData).unwrap();
      toast.success("Restaurant added successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate("/vendor/restaurant");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  return (
    <div>
      <ResForm
        onSubmit={onSubmit}
        resolver={zodResolver(restaurantSchema.insertRestaurantSchema)}
      >
        <Row gutter={[14, 0]}>
          <Col span={24}>
            <Form.Item>
              <MultiUpload
                fileList={fileList as RcFile[]}
                setFileList={setFileList}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <ResInput
              size="large"
              label="Enter Restaurant name"
              type="text"
              name="name"
              placeholder="type name here"
            />
          </Col>
          <Col span={12}>
            <ResInput
              size="large"
              label="Enter Restaurant Location"
              type="text"
              name="location"
              placeholder="type restaurant location"
            />
          </Col>
          <Col span={24}>
            <ResTextArea
              label="Description"
              name="description"
              placeholder="type restaurant description"
            />
          </Col>
          <Col span={6}>
            <ResDatePicker
              showTime={true}
              size="large"
              label="Enter Close From"
              name="close.from"
              placeholder="select date and time"
            />
          </Col>
          <Col span={6}>
            <ResDatePicker
              showTime={true}
              size="large"
              label="Enter Close To"
              name="close.to"
              placeholder="select date and time"
            />
          </Col>
          <Col span={24}>
            <Form.Item name="review-status">
              <div className="flex gap-x-2 items-center">
                <p>Review Status</p>
                <Switch defaultChecked onChange={onChange} />
              </div>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Divider className="bg-deepGray" />
            <Row gutter={16}>
              <Col span={12}>
                <ResTimePicker
                  label="Saturday Open Time"
                  name="saturday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Saturday Close Time"
                  name="saturday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Sunday Open Time"
                  name="sunday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Sunday Close Time"
                  name="sunday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Monday Open Time"
                  name="monday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Monday Close Time"
                  name="monday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Friday Open Time"
                  name="friday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Friday Close Time"
                  name="friday.closingTime"
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Divider className="bg-deepGray" />
            <Row gutter={16}>
              <Col span={12}>
                <ResTimePicker
                  label="Tuesday Open Time"
                  name="tuesday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Tuesday Close Time"
                  name="tuesday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="WednesDay Open Time"
                  name="wednesday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="WednesDay Close Time"
                  name="wednesday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Thursday Open Time"
                  name="thursday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Thursday Close Time"
                  name="thursday.closingTime"
                />
              </Col>
            </Row>

            <div className="flex justify-end mt-6 ">
              <Button
                htmlType="submit"
                className=" bg-primary text-white font-600 w-[150px] text-18 h-[40px]"
              >
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </ResForm>
    </div>
  );
};

export default CreateRestaurant;
