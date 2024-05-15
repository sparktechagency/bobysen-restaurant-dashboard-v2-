/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import menuLogo from "../../assets/vendorIcon/menu.png";
import AvailableNowLogo from "../../assets/vendorIcon/menu.png";
import { useGetAllMenuQuery } from "../../redux/features/menu/menuApi";
const MenuHeaderCards = () => {
  const { data: menuData } = useGetAllMenuQuery(undefined);
  const { data: activeData } = useGetAllMenuQuery({ available: true });
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6 rounded">
          <img src={menuLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {menuData?.meta?.total}
            </h1>
            <p className="text-24">Total Menu</p>
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6  rounded">
          <img src={AvailableNowLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {activeData?.meta?.total || 0}
            </h1>
            <p className="text-24">Available</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default MenuHeaderCards;
