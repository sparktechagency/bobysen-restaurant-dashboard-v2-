/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import ResForm from "../../../component/Form/FormProvider";
import ResDatePicker from "../../../component/Form/ResDatePicker";
import ResSelect from "../../../component/Form/ResSelect";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import {
  useGetAllRestaurantForadminQuery,
  useInsertTopRestaurantIntoDbMutation,
} from "../../../redux/features/restaurant/restaurantApi";
import { restaurantSchema } from "../../../schema/restaurant.schema";

const AddTopRestaurant = ({ setShow }: any) => {
  const [addTopRestaurant] = useInsertTopRestaurantIntoDbMutation();
  const {
    data: Rdata,
    isLoading,
    isFetching,
  } = useGetAllRestaurantForadminQuery({});
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Adding....");
    try {
      await addTopRestaurant(data).unwrap();
      toast.success("Restaurant added successfully", {
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
      <ResForm
        onSubmit={onSubmit}
        resolver={zodResolver(restaurantSchema.insertTopRestaurant)}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ResSelect
              label="Select Or Search Restaurant"
              size="large"
              name="restaurant"
              showSearch
              placeholder="Select or Search Restaurant"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={Rdata?.data?.map((data: any) => ({
                label: data?.name,
                value: data?._id,
              }))}
            />
          </Col>
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

export default AddTopRestaurant;
