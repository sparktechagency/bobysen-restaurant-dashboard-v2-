/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditOutlined } from "@ant-design/icons";
import ResTable from "../../../component/Table";
import TransactionCards from "../../../component/TransactionCards/TransactionCards";
import { transactionData } from "../../../db";
import {
  useGetVendorWalletDetailsbyAdminQuery,
  useGetVendorWalletDetailsQuery,
} from "../../../redux/features/wallet/walletApi";
import { transactionTableTheme } from "../../../themes";
import { GrView } from "react-icons/gr";
import { Button } from "antd";
import { useState } from "react";
import Drawers from "../../../component/Drawer/Drawer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setPaymentHistory } from "../../../redux/features/wallet/walletSlice";
import ResModal from "../../../component/Modal/Modal";
import MakePaymentForm from "../../../component/MakePaymentForm";
import Input, { SearchProps } from "antd/es/input";

const Transaction = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  if (searchTerm) query["searchTerm"] = searchTerm;
  const onSearch: SearchProps["onSearch"] = (value, _e) => setSearchTerm(value);
  const { data: walletData, isLoading } =
    useGetVendorWalletDetailsbyAdminQuery(query);
  const [show, setshow] = useState<boolean>(false);
  const [id, setId] = useState<string | null>();
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const paymentHistory: any = useAppSelector(
    (state) => state.wallet.paymentHistory
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const column = [
    {
      title: "Vendor",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Restaurant Name",
      dataIndex: "restaurant",
      key: "restaurant",
    },
    {
      title: "Balance",
      dataIndex: "due",
      key: "due",
    },
    {
      title: "Total Paid",
      dataIndex: "totalPaid",
      key: "totalPaid",
    },
    {
      title: "Payment Hitory",
      dataIndex: "paymentHistory",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex gap-x-4 " key={index}>
            <GrView
              className="cursor-pointer"
              key={index}
              onClick={() => {
                dispatch(setPaymentHistory(data));
                setOpenDrawer(true);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Make Payment",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <Button
            onClick={() => {
              setId(data?._id);
              setshow(true);
            }}
            className="bg-primary text-white font-500"
          >
            Send Payment
          </Button>
        );
      },
    },
  ];
  const paymentColumn = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      key: "subTotal",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "method",
    },
  ];
  return (
    <div>
      <ResModal title="MAKE PAYMENT" showModal={show} setShowModal={setshow}>
        <MakePaymentForm id={id} setshow={setshow} />
      </ResModal>
      <Drawers
        title="Payment History"
        open={openDrawer}
        setOpen={setOpenDrawer}
      >
        <h1 className="text-center font-700 text-32 text-primary mb-2">
          Payment History
        </h1>
        <ResTable
          theme={transactionTableTheme}
          loading={false}
          column={paymentColumn}
          data={paymentHistory}
          pagination={{ total: paymentColumn?.length, pageSize: 10 }}
        />
      </Drawers>
      <div className="mb-4">
        <TransactionCards />
        <div className="flex justify-end">
          <Input.Search
            onSearch={onSearch}
            placeholder="search vendor by name or restaurant name"
            className="w-[400px]"
            size="large"
            allowClear
          />
        </div>
      </div>
      <ResTable
        theme={transactionTableTheme}
        loading={isLoading}
        column={column}
        data={walletData?.data}
        pagination={{ total: transactionData?.length, pageSize: 10 }}
      />
    </div>
  );
};

export default Transaction;
