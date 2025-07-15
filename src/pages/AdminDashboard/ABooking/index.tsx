/* eslint-disable @typescript-eslint/no-loss-of-precision */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import ABookingCard from "../../../component/ABookingCard/ABookingCard";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import { useGetAllBookingForAdminQuery, useUpdateBookingMutation } from "../../../redux/features/booking/bookingApi";
const ABooking = () => {
  const query: any = {};
  query["limit"] = 9999999;
  const { data: ABdata, isLoading } = useGetAllBookingForAdminQuery(query);
  const [UpdateBooking] = useUpdateBookingMutation()
 const handleDeleteBookingByAdmin = async (id: string) => {
    const toastId = toast.loading("Deleting..");
    try {
      await UpdateBooking({id:id,body:{isDeleted:true}}).unwrap();
      toast.success("Reservation deleted successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  const column = [
    // {
    //   title: "#SL",
    //   dataIndex: "index",
    //   key: "index",
    // },
    {
      title: "Name",
      dataIndex: "user",

      render: (text: any) => <p>{text?.fullName}</p>,
    },

    {
      title: "Restaurant",
      dataIndex: "restaurant",
      render: (text: any) => <p>{text?.name}</p>,
    },
    {
      title: "Table No",
      dataIndex: "table",
      render: (text: any) => <p>{text?.tableNo}</p>,
    },
    {
      title: "Seats",
      dataIndex: "table",
      render: (text: any) => <p>{text?.seats}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },

    {
      title: "Delete",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="text-center">
             <ResConfirm
              handleOk={() => handleDeleteBookingByAdmin(data?._id)}
              description="this action cannot be undone!"
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
      <h1 className="text-32 font-500 ">All Booking</h1>
      <div className="my-2">
        <ABookingCard />
      </div>
      <ResTable
        loading={isLoading}
        column={column}
        data={ABdata?.data?.data}
        pagination={{ total: ABdata?.meta?.total, pageSize: 8 }}
      />
    </div>
  );
};

export default ABooking;
