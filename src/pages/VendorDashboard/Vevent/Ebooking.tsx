/* eslint-disable @typescript-eslint/no-explicit-any */
import { GrView } from "react-icons/gr";
import { NavLink, useParams } from "react-router-dom";
import ResTable from "../../../component/Table";
import { useGetAllBookingQuery } from "../../../redux/features/booking/bookingApi";

const Ebooking = () => {
  const { id } = useParams();
  const query: any = {};
  query["event"] = id;

  const {
    data: bookingData,
    isLoading,
    isFetching,
  } = useGetAllBookingQuery(query);
  console.log(bookingData, query);
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
  ];
  return (
    <div>
      <ResTable
        column={column}
        data={bookingData?.data}
        loading={isFetching || isLoading}
        pagination={{ pageSize: 10, total: bookingData?.data?.length }}
      />
    </div>
  );
};

export default Ebooking;
