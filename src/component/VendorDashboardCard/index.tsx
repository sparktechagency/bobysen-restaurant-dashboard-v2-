import { Col, Row } from "antd";
import menoLogo from "../../assets/vendorIcon/menu.png";
import orderLogo from "../../assets/vendorIcon/order.png";
import tableLogo from "../../assets/vendorIcon/table.png";
import { useGetAllBookingQuery } from "../../redux/features/booking/bookingApi";
import { useGetAllMenuQuery } from "../../redux/features/menu/menuApi";
import { useGetTablesQuery } from "../../redux/features/table/tableApi";
const VendorDashboardCard = ({ query }: any) => {
  const { data: menuData } = useGetAllMenuQuery(query);
  const { data: tableData } = useGetTablesQuery(query);
  const { data: bookingData } = useGetAllBookingQuery({
    ...query,
    status: "active",
  });

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <div className="flex items-center gap-x-4 bg-white p-4 rounded">
          <img src={menoLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {menuData?.meta?.total || 0}
            </h1>
            <p className="text-24">Total Menus</p>
          </div>
        </div>
      </Col>
      <Col span={8}>
        <div className="flex items-center gap-x-4 bg-white p-4 rounded">
          <img src={tableLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {tableData?.data?.tables?.length || 0}
            </h1>
            <p className="text-24">Total Tables</p>
          </div>
        </div>
      </Col>
      <Col span={8}>
        <div className="flex items-center gap-x-4 bg-white p-4 rounded">
          <img src={orderLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {bookingData?.data?.length}
            </h1>
            <p className="text-24">Active Booking</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default VendorDashboardCard;
