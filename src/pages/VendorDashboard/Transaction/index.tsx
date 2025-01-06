/* eslint-disable @typescript-eslint/no-explicit-any */
import ResTable from "../../../component/Table";
import VendorTransactionCard from "../../../component/VendorTransactionCard/VendorTransactionCard";
import { vendorTransactionData } from "../../../db";
import { useGetVendorWalletDetailsQuery } from "../../../redux/features/wallet/walletApi";
import { vendorTableTheme } from "../../../themes";

const VendorTransaction = () => {
  // const [restaurantId, setRestaurantId] = useState<String | null>(null);
  // const query: Record<string, any> = {};
  // const { data: ResData } = useGetVendorWiseRestaurantIdQuery({});
  // if (restaurantId) query["restaurant"] = restaurantId;
  const { data: walletData, isLoading } = useGetVendorWalletDetailsQuery({});
  // const handleChange = (value: string) => {
  //   setRestaurantId(value);
  // };
  //console.log(walletData?.data[0]?.paymentHistory);
  const column = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
    },
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Getway",
      dataIndex: "method",
      key: "method",
    },
  ];
  const formatedData = walletData?.data[0]?.paymentHistory.map(
    (data: any, index: number) => {
      return {
        serial: index + 1,
        amount: data?.amount,
        percentage: `${data?.percentage}%`,
        date: data?.date,
        method: data?.method,
        subTotal: data?.subTotal,
      };
    }
  );
  return (
    <div>
      {/* <div className="flex justify-end">
        <Select
          style={{ width: 200, height: 33 }}
          placeholder="Select Restaurant"
          onChange={handleChange}
          options={ResData?.data?.map((data: any) => {
            return { label: data?.name, value: data?._id };
          })}
        />
      </div> */}
      <VendorTransactionCard data={walletData?.data[0]} />
      <div className="mt-4">
        <ResTable
          theme={vendorTableTheme}
          data={formatedData}
          column={column}
          loading={isLoading}
          pagination={{ total: vendorTransactionData?.length, pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default VendorTransaction;
