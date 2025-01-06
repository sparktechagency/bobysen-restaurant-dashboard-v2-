/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import dayjs from "dayjs";
import dollarLogo from "../../assets/payment.svg";
import orderLogo from "../../assets/vendorIcon/order.png";
import { useGetAllBookingQuery } from "../../redux/features/booking/bookingApi";
const BookingCard = ({ restaurant }: any) => {
  const { data: totalBooking } = useGetAllBookingQuery({
    status: "active",
    restaurant: restaurant,
  });
  const { data: totalCanlledBooking } = useGetAllBookingQuery({
    status: "cancelled",
    restaurant: restaurant,
  });
  const { data: totalClosedBook } = useGetAllBookingQuery({
    status: "closed",
    restaurant: restaurant,
  });

  const { data: todays } = useGetAllBookingQuery({
    date: dayjs().format("YYYY-MM-DD"),
    restaurant: restaurant,
  });
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6 rounded">
          <img src={orderLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {totalBooking?.data?.length || 0}
            </h1>
            <p className="text-24">Ongoing Booking</p>
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6 rounded">
          <img src={orderLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {totalCanlledBooking?.data?.length || 0}
            </h1>
            <p className="text-24">Cancelled Booking</p>
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6 rounded">
          <img src={orderLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {" "}
              {totalClosedBook?.data?.length || 0}
            </h1>
            <p className="text-24">Closed Booking</p>
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6  rounded">
          <img src={dollarLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {todays?.data?.length || 0}
            </h1>
            <p className="text-24">Today's Booking</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default BookingCard;
