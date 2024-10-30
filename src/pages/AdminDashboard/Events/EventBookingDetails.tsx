/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import ResTable from "../../../component/Table";
import { useGetCustomerEventPaymentsQuery } from "../../../redux/features/event/eventApi";

const EventBookingDetails = () => {
  const { id } = useParams();

  const { data } = useGetCustomerEventPaymentsQuery({ event: id });

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "user",
      render: (data: any) => <p>{data?.fullName}</p>,
    },
    {
      title: "Customer Phone",
      dataIndex: "user",
      render: (data: any) => <p>{data?.phoneNumber}</p>,
    },
    {
      title: "Reservation Date",
      dataIndex: "booking",
      render: (data: any) => <p>{data?.date}</p>,
    },
    {
      title: "Reservation Time",
      dataIndex: "booking",
      render: (data: any) => <p>{data?.time}</p>,
    },
    {
      title: "Ticket Number",
      dataIndex: "booking",
      render: (data: any) => <p>#{data?.id}</p>,
    },
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Total paid",
      dataIndex: "amount",
      render: (amount: any) => <p>Rs. {amount}</p>,
    },
  ];
  return (
    <div>
      <h1 className="mb-2 font-500 text-20 text-gray">Customer Details</h1>
      <ResTable column={columns} data={data?.data} />
    </div>
  );
};

export default EventBookingDetails;
