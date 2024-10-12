/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tag } from "antd";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { toast } from "sonner";
import PointsCard from "../../../component/PointsCard/PointsCard";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import {
  useGetAllReedemRequestQuery,
  useUpdateRequestMutation,
} from "../../../redux/features/points/pointsApi";

const Points = () => {
  const updateEvent = async (id: string, status: string) => {
    const toastId = toast.loading("Updating....");
    try {
      await updateRequest({ id: id, body: { status: status } }).unwrap();
      toast.success("Status updated successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  const { data: Pdata } = useGetAllReedemRequestQuery({});
  const [updateRequest] = useUpdateRequestMutation({});
  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      render: (data: any) => <p>{data?.fullName}</p>,
    },
    {
      title: "Customer Phone",
      dataIndex: "customer",
      render: (data: any) => <p>{data?.phoneNumber}</p>,
    },
    {
      title: "Customer Email",
      dataIndex: "customer",
      render: (data: any) => <p>{data?.email}</p>,
    },
    {
      title: "Points",
      dataIndex: "coins",
      key: "coins",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status: string) => {
        let color = "";
        switch (status) {
          case "pending":
            color = "orange";
            break;
          case "accepted":
            color = "green";
            break;
          case "rejected":
            color = "red";
            break;
          default:
            color = "gray"; // default color for unknown statuses
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (data: any, index: number) => {
        // Only show the icons if the status is "pending"
        if (data?.status === "pending") {
          return (
            <div className="flex gap-x-4">
              <ResConfirm
                description="Do you want to accept the request?"
                handleOk={() => updateEvent(data?._id, "accepted")}
              >
                <IoCheckmarkDoneCircle className="cursor-pointer" key={index} />
              </ResConfirm>
              <ResConfirm
                description="Do you want to reject the request?"
                handleOk={() => updateEvent(data?._id, "rejected")}
              >
                <FaRegCircleXmark className="cursor-pointer" key={index} />
              </ResConfirm>
            </div>
          );
        }
        // Return null or empty element when status is not "pending"
        return null;
      },
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <PointsCard />
      </div>
      <ResTable
        column={columns}
        data={Pdata?.data}
        pagination={{ pageSize: 10, total: Pdata?.data?.length }}
      />
    </div>
  );
};

export default Points;
