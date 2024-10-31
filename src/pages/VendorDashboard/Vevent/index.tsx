/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GrView } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import ResTable from "../../../component/Table";
import { useGetAllEventsQuery } from "../../../redux/features/event/eventApi";
import { useGetAllRestaurantsQuery } from "../../../redux/features/restaurant/restaurantApi";

const Vevent = () => {
  const { data: restaurantData } = useGetAllRestaurantsQuery({});
  const { data: eventData, isFetching } = useGetAllEventsQuery(
    {
      restaurant: restaurantData?.data?.[0]?._id,
    },
    {
      skip: !restaurantData?.data?.[0]?._id,
    }
  );
  const column = [
    {
      title: "Event Title",
      dataIndex: "title",
      key: "title",
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
      title: "View Booking",
      key: "action",
      render: (data: any, index: number) => {
        // Only show the icons if the status is "pending"

        return (
          <div className="flex gap-x-4">
            <NavLink to={`/vendor/booking/${data?._id}`}>
              <GrView className="cursor-pointer" />
            </NavLink>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <h1 className="text-32 font-600 mb-4 text-primary">Active Event</h1>
      <ResTable
        column={column}
        data={eventData?.data}
        loading={isFetching}
        pagination={{ pageSize: 10, total: eventData?.data?.length }}
      />
    </div>
  );
};

export default Vevent;
