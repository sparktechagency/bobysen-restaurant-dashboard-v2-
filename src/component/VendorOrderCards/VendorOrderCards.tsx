/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import orderLogo from "../../assets/vendorIcon/order.png";
import dollarLogo from "../../assets/payment.svg";
const VendorOrderCards = ({ data }: any) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6 rounded">
          <img src={orderLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {data?.totalAmount}
            </h1>
            <p className="text-24">Total Amount</p>
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6  rounded">
          <img src={dollarLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">{data?.totalPaid}</h1>
            <p className="text-24">Total Paid</p>
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6  rounded">
          <img src={dollarLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-red text-32">{data?.totalDue}</h1>
            <p className="text-24">Total Due</p>
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6  rounded">
          <img src={dollarLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-24">{data?.status}</h1>
            <p className="text-24">Status</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default VendorOrderCards;
