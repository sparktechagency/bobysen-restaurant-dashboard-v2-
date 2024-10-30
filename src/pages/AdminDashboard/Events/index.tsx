/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, DatePickerProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import EventCard from "../../../component/EventCard/EventCard";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import {
  useGetAllEventsQuery,
  useUpdateEventsMutation,
} from "../../../redux/features/event/eventApi";
import CreateEvents from "./createEvents";

const Event = () => {
  const [show, setShow] = useState(false);

  const [date, setDate] = useState("");
  const query: Record<string, any> = {};
  if (date) query["date"] = date;
  const { data: Edata, isFetching } = useGetAllEventsQuery(query);
  const [deleteEvent] = useUpdateEventsMutation();
  const handleDeleteEvent = async (data: any) => {
    const toastId = toast.loading("Deleting...");
    try {
      await deleteEvent({ id: data, body: { isActive: false } }).unwrap();
      toast.success("Event deleted successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  const columns = [
    {
      title: "Event Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Restaurant Name",
      dataIndex: "restaurant",
      key: "restaurant", // Use "restaurant" as the key for consistency
      render: (data: any) => <p>{data?.name}</p>, // Ensure you're safely accessing data
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },

    {
      title: "Action",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex gap-x-4">
            {/* Uncomment and implement the EditOutlined icon functionality as needed */}
            <Link to={`/admin/events-booking/${data?._id}`}>
              <EyeOutlined className="cursor-pointer" key={index} />
            </Link>
            <ResConfirm
              description="This action cannot be undone!"
              handleOk={() => handleDeleteEvent(data?._id)}
            >
              <DeleteOutlined className="cursor-pointer" key={index} />
            </ResConfirm>
          </div>
        );
      },
    },
  ];

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(dateString as string);
  };
  return (
    <div>
      <ResModal
        showModal={show}
        setShowModal={setShow}
        title="Create an event"
        width={700}
      >
        <CreateEvents setShow={setShow} />
      </ResModal>
      <EventCard data={Edata?.data} />
      <div className="flex justify-end gap-x-4 mb-4">
        <DatePicker onChange={onChange} />
        <Button
          onClick={() => setShow((prev) => !prev)}
          className="bg-primary text-white font-500"
          icon={<PlusCircleOutlined />}
        >
          Add Event
        </Button>
      </div>

      <div>
        <ResTable loading={isFetching} column={columns} data={Edata?.data} />
      </div>
    </div>
  );
};

export default Event;
