/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import tableLogo from "../../assets/vendorIcon/table.png";

const TableCards = ({ tableData }: any) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <div className="flex items-center justify-between bg-white p-6 rounded">
          <img src={tableLogo} alt="" />
          <div className="font-600 ">
            <h1 className="text-end text-primary text-32">
              {tableData?.data?.tables?.length ?? 0}
            </h1>
            <p className="text-24">Total Tables</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TableCards;
