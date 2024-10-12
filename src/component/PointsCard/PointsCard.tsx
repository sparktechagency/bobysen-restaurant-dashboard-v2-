/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import orderLogo from "../../assets/vendorIcon/order.png";
import { useGetAllReedemRequestQuery } from "../../redux/features/points/pointsApi";
const PointsCard = () => {
  const { data: Pdata } = useGetAllReedemRequestQuery({ status: "pending" });
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6 rounded">
          <img src={orderLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {Pdata?.data?.length || 0}
            </h1>
            <p className="text-24">Pending Request</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PointsCard;
