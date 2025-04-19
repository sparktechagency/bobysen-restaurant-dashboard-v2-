/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button, DatePicker, DatePickerProps } from "antd";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import {
  useGetAllEventsQuery,
  useUpdateEventsMutation,
} from "../../../redux/features/event/eventApi";
import {
  useGetReviewsQuery,
  useUpdateAreviewMutation,
} from "../../../redux/features/restaurant/restaurantApi";
import { useUpdateRequestMutation } from "../../../redux/features/points/pointsApi";

const Reviews = () => {
  const { id } = useParams();
  //   const [date, setDate] = useState("");
  //   const query: Record<string, any> = {};
  //   if (date) query["date"] = date;
  const { data: Rdata, isFetching } = useGetReviewsQuery(id);

  const [deleteReview] = useUpdateAreviewMutation();
  const handleDeleteReview = async (id: string) => {
    const toastId = toast.loading("Deleting...");
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  const columns = [
    {
      title: "User",

      render: (data: any) => <p>{data?.user?.name}</p>,
    },
    {
      title: "Rating",
      //   dataIndex: "rating",
      key: "rating", // Use "restaurant" as the key for consistency
      render: (data: any) => (
        <p className="flex items-center gap-x-3">
          <p>{data?.rating}</p>
          <StarFilled />
        </p>
      ), // Ensure you're safely accessing data
    },
    {
      title: "Comments",
      dataIndex: "comment",
      key: "comment",
    },

    {
      title: "Action",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex gap-x-4">
            {/* Uncomment and implement the EditOutlined icon functionality as needed */}

            <ResConfirm
              description="This action cannot be undone!"
              handleOk={() => handleDeleteReview(data?._id)}
            >
              <DeleteOutlined className="cursor-pointer" key={index} />
            </ResConfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div>
        <ResTable
          loading={isFetching}
          column={columns}
          data={Rdata?.data?.reviews}
        />
      </div>
    </div>
  );
};

export default Reviews;
