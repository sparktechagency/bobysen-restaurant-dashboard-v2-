/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import ResForm from "../../../component/Form/FormProvider";
import ResDatePicker from "../../../component/Form/ResDatePicker";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import {
  useGetSingleTopRestaurantQuery,
  useUpdateTopRestaurantMutation,
} from "../../../redux/features/restaurant/restaurantApi";
import { restaurantSchema } from "../../../schema/restaurant.schema";

const EditTopRestaurant = ({ id, setEditModal }: any) => {
  const [updateTopRestaurant] = useUpdateTopRestaurantMutation();
  const { data: TRdata } = useGetSingleTopRestaurantQuery(id);
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Updating....");
    try {
      await updateTopRestaurant({ id, body: data }).unwrap();
      toast.success("Data updated successfully", {
        id: toastId,
        duration: 2000,
      });
      setEditModal((prev: boolean) => !prev);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <div>
      <div className="text-20 text-center mt-6 text-deepGray">
        <h1>
          You can extend the Top Restaurant status by updating the end date
          here.
        </h1>
        <h1 className="text-primary my-2">
          Restaurant: {TRdata?.data?.restaurant?.name}
        </h1>
      </div>
      <ResForm
        onSubmit={onSubmit}
        defaultValues={TRdata?.data}
        resolver={zodResolver(restaurantSchema.updateTopRestaurant)}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <ResDatePicker
              format="YYYY-MM-DD"
              label="Select Start Date"
              name="startDate"
              size="large"
            />
          </Col>
          <Col span={12}>
            <ResDatePicker
              format="YYYY-MM-DD"
              label="Select End Date"
              name="endDate"
              size="large"
            />
          </Col>
          <Col span={24}>
            <Button
              htmlType="submit"
              className="bg-primary text-white w-full h-[40px] font-500 text-20"
            >
              SUBMIT
            </Button>
          </Col>
        </Row>
      </ResForm>
    </div>
  );
};

export default EditTopRestaurant;
