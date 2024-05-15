import { Col } from "antd";
import moment from "moment";
import { IoNotificationsCircleOutline } from "react-icons/io5";

/* eslint-disable @typescript-eslint/no-explicit-any */
const NotificationCard = ({ data }: any) => {
  const backgroundColor = !data.read ? "#dee6db" : "##EDF5EA";
  return (
    <Col span={24}>
      <div
        className="flex gap-x-2  text-black pb-2  p-2 rounded "
        style={{ backgroundColor }}
      >
        <IoNotificationsCircleOutline style={{ fontSize: "40px" }} />

        <div>
          <h1 className="text-20 pb-2">{data?.message}</h1>
          <p>{data?.description}</p>
          <p>{moment(data?.createdAt).format("YYYY-MM-DD hh:mm a")}</p>
        </div>
      </div>
      <hr className="text-primary " />
    </Col>
  );
};

export default NotificationCard;
