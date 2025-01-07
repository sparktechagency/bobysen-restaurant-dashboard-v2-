/* eslint-disable @typescript-eslint/no-loss-of-precision */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ABookingCard from "../../../component/ABookingCard/ABookingCard";
import ResTable from "../../../component/Table";
import { useGetAllBookingForAdminQuery } from "../../../redux/features/booking/bookingApi";
const ABooking = () => {
  const query: any = {};
  query["limit"] = 999999999999;
  const { data: ABdata, isLoading } = useGetAllBookingForAdminQuery(query);

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
