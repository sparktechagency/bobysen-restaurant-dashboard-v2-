import { Button } from "antd";
import PaymentCards from "../../../component/PaymentCards/PaymentCards";
import ResTable from "../../../component/Table";
import { paymentHistory } from "../../../db/paymentHistory";
import { paymentTableTheme } from "../../../themes";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import ResModal from "../../../component/Modal/Modal";
import MakePaymentForm from "../../../component/MakePaymentForm";

const Payment = () => {
  const [show, setshow] = useState<boolean>(false);
  const column = [
    {
      title: "#SL",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Vendor",
      dataIndex: "vendorName",
      key: "vendorName",
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
  ];
  const handlePaymentModal = () => {
    setshow((prev) => !prev);
  };
  return (
    <div>
      <ResModal title="MAKE PAYMENT" showModal={show} setShowModal={setshow}>
        <MakePaymentForm />
      </ResModal>
      <PaymentCards />
      <div className="flex items-center justify-between">
        <h1 className="text-primary text-32 font-600 my-2">Payment History</h1>
        <div className="flex justify-end mb-4">
          <Button
            onClick={handlePaymentModal}
            className="bg-primary text-white font-500"
            icon={<PlusCircleOutlined />}
          >
            Make Payment
          </Button>
        </div>
      </div>
      <ResTable
        theme={paymentTableTheme}
        loading={false}
        column={column}
        data={paymentHistory}
        pagination={{ total: paymentHistory.length, pageSize: 10 }}
      />
    </div>
  );
};

export default Payment;
