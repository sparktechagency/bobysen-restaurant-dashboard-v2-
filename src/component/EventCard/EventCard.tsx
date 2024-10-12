/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import orderLogo from "../../assets/vendorIcon/order.png";
const EventCard = ({ data }: any) => {
  console.log(data?.length);
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6 rounded">
          <img src={orderLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {data?.length || 0}
            </h1>
            <p className="text-24">Active Events</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default EventCard;
