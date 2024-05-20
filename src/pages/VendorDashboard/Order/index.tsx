/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import ResTable from "../../../component/Table";
import VendorOrderCards from "../../../component/VendorOrderCards/VendorOrderCards";
import { vendorTableTheme } from "../../../themes";
import { useGetorderByBookingIdQuery } from "../../../redux/features/order/orderApi";
import { Col, Divider, Row } from "antd";
import moment from "moment";

const Order = () => {
  const { id } = useParams();

  const { data: orderData, isLoading } = useGetorderByBookingIdQuery(id);
  //console.log();
  const formatedData = orderData?.data?.items?.map(
    (data: any, index: number) => {
      return {
        item: data?.menu?.name,
        amount: data?.amount,
        quantity: data?.quantity,
        index,
      };
    }
  );
  const column = [
    {
      title: "#SL",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Menu",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  const transactionData = orderData?.data?.transactions?.map((data: any) => {
    return {
      orderId: data?.orderId,
      amount: data?.amount,
      date: moment(data?.date).format("YYYY-MM-DD HH:mm:ss"),
      status: data?.status || "false",
    };
  });
  const paymentColumn = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <div>
      <VendorOrderCards data={orderData?.data} />
      <div className="mt-6">
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <h1 className="text-24 text-primary font-700">Menu</h1>
            <Divider />
            <ResTable
              theme={vendorTableTheme}
              loading={isLoading}
              column={column}
              data={formatedData}
              pagination={{ total: orderData?.meta?.total, pageSize: 11 }}
            />
          </Col>
          <Col lg={12}>
            <h1 className="text-24 text-primary font-700">Payment Details</h1>
            <Divider />
            <ResTable
              theme={vendorTableTheme}
              loading={isLoading}
              column={paymentColumn}
              data={transactionData}
              // pagination={{ total: orderData?.meta?.total, pageSize: 11 }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Order;
