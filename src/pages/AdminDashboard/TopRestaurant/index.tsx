/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import ResModal from "../../../component/Modal/Modal";
import RestaurantCard from "../../../component/RestaurantCard/RestaurantCard";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import {
  useGetAllTopRestaurantsQuery,
  useUpdateTopRestaurantMutation,
} from "../../../redux/features/restaurant/restaurantApi";
import AddTopRestaurant from "./AddTopRestaurant";
import EditTopRestaurant from "./EditTopRestaurant";

const TopRestaurant = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [id, setId] = useState();
  const [deleteTopRestaurant] = useUpdateTopRestaurantMutation();
  const {
    data: TRdata,
    isLoading,
    isFetching,
  } = useGetAllTopRestaurantsQuery(undefined);

  const handleDeleteTopRestaurant = async (id: string): Promise<void> => {
    const toastId = toast.loading("Deleting.....");
    try {
      await deleteTopRestaurant({ id, body: { isDeleted: true } }).unwrap();
      toast.success("Restaurant successfully removed from the list", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  const column = [
    {
      title: "Restaurant Name",
      dataIndex: "restaurant",
      key: "restaurant",
      render: (data: any) => {
        return <p>{data?.name}</p>;
      },
    },
    {
      title: "Address",
      dataIndex: "restaurant",
      key: "restaurant",
      render: (data: any) => {
        return <p>{data?.address}</p>;
      },
    },
    {
      title: "StartDate",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Days Left",
      render: (data: any, index: number) => {
        return (
          <div className="flex justify-center" key={index}>
            <p>
              {moment(data?.endDate, "YYYY-MM-DD").diff(
                moment(data?.startDate, "YYYY-MM-DD"),
                "days"
              )}{" "}
              days
            </p>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex justify-center gap-x-2">
            <ResConfirm
              handleOk={() => handleDeleteTopRestaurant(data?._id)}
              description="this action cannot be undone!"
            >
              <DeleteOutlined className="cursor-pointer" key={index} />
            </ResConfirm>
            <EditOutlined
              onClick={() => {
                setId(data?._id);
                setShowEditModal((prev) => !prev);
              }}
              className="cursor-pointer"
              key={index}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ResModal showModal={show} setShowModal={setShow}>
        <AddTopRestaurant setShow={setShow} />
      </ResModal>
      <ResModal showModal={showEditModal} setShowModal={setShowEditModal}>
        <EditTopRestaurant setEditModal={setShowEditModal} id={id} />
      </ResModal>
      <RestaurantCard total={TRdata?.data?.length} />
      <div className="flex items-center justify-between mt-4 ">
        <h1 className="text-32 font-600 mb-4 text-primary">Top Restaurant</h1>

        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setShow((prev) => !prev)}
            className="bg-primary text-white font-500"
            icon={<PlusCircleOutlined />}
          >
            Add Top Restaurant
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <ResTable
          // theme={RestaurantTableTheme}
          column={column}
          data={TRdata?.data}
          pagination={{ total: TRdata?.data?.length, pageSize: 10 }}
          loading={isLoading || isFetching}
        />
      </div>
    </div>
  );
};

export default TopRestaurant;
