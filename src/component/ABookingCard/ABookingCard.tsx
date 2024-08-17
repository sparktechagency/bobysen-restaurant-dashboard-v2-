/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import orderLogo from "../../assets/vendorIcon/order.png";
import { useGetAllBookingForAdminQuery } from "../../redux/features/booking/bookingApi";
const ABookingCard = () => {
  const { data: totalBooking } = useGetAllBookingForAdminQuery({});

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6 rounded">
          <img src={orderLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {totalBooking?.data?.meta?.total || 0}
            </h1>
            <p className="text-24">Total Booking</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};
ABookingCard;

export default ABookingCard;
