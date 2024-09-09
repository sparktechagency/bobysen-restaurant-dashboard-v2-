/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ABookingCard from "../../../component/BookingCard/BookingCard";

import { DatePicker, Input, Tag } from "antd";
import dayjs from "dayjs";
import { GrView } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import {
  useGetAllBookingQuery,
  useUpdateBookingMutation,
} from "../../../redux/features/booking/bookingApi";
const Booking = () => {
  const [date, setDate] = useState<string | null>();
  const [searchTerm, setSearchTerm] = useState<string | null>();
  const query: Record<string, any> = {};
  if (date) query["date"] = date;
  if (searchTerm) query["searchTerm"] = searchTerm;
  query["status"] = "active";
  const { data: bookingData, isLoading } = useGetAllBookingQuery(query);
  const [updateBooking] = useUpdateBookingMutation();
  const handleChangeStatus = async (id: string, status: string) => {
    const toastId = toast.loading("Updating...");
    const data = { status };
    try {
      await updateBooking({ id, body: data }).unwrap();
      toast.success("Status updated successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  const onSearch = async (val: string) => {
    setSearchTerm(val);
  };

  const onDateChange = async (date: any) => {
    setDate(dayjs(date).format("YYYY-MM-DD"));
  };

  const column = [
    // {
    //   title: "#SL",
    //   dataIndex: "index",
    //   key: "index",
    // },
    {
      title: "Name",
      dataIndex: "userName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Booking Number",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Table No",
      dataIndex: "tableNo",
      key: "tableNo",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: "seats",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "status",
      render: (data: any) => {
        return data.status === "active" ? (
          <>
            <ResConfirm
              description="This action cannot be undone"
              handleOk={() => handleChangeStatus(data?._id, "cancelled")}
            >
              {/* Render the Cancel and Closed tags */}
              <Tag color="red" className="cursor-pointer">
                Cancel
              </Tag>
            </ResConfirm>
            <ResConfirm
              description="This action cannot be undone"
              handleOk={() => handleChangeStatus(data?._id, "closed")}
            >
              <Tag className="cursor-pointer">Closed</Tag>
            </ResConfirm>
          </>
        ) : (
          <p>N/A</p>
        );
      },
    },
    {
      title: "Menu",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <NavLink to={`/vendor/order/${data?._id}`}>
            <GrView className="cursor-pointer" key={index} />
          </NavLink>
        );
      },
    },
    // {
    //   title: "Delete",
    //   key: "action",
    //   render: (data: any, index: number) => {
    //     return (
    //       <div className="text-center">
    //         <DeleteOutlined
    //           onClick={() => {}}
    //           className="cursor-pointer"
    //           key={index}
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];
  return (
    <div>
      <ABookingCard />

      <div className="flex justify-end gap-x-4 my-4">
        <DatePicker
          // defaultValue={dayjs(dayjs(), "YYYY-MM-DD")}
          className="w-[200px]"
          size="large"
          onChange={onDateChange}
        />
        <Input.Search
          onSearch={onSearch}
          placeholder="search vendor by email or name or bookingId"
          className="w-[400px]"
          size="large"
          allowClear
        />
      </div>
      <ResTable
        loading={isLoading}
        column={column}
        data={bookingData?.data}
        pagination={{ total: bookingData?.meta?.total, pageSize: 8 }}
      />
    </div>
  );
};

export default Booking;
