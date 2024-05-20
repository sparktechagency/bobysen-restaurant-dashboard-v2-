import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { useGetWalletStaticsForAdminQuery } from "../../redux/features/wallet/walletApi";
const TransactionCards = () => {
  const { data } = useGetWalletStaticsForAdminQuery({});
  //console.log(data);
  return (
    <div className="flex gap-x-4">
      <div className="bg-white w-[400px] py-6 px-4 rounded">
        <div className="flex justify-between">
          <div>
            <RiMoneyDollarBoxLine size={80} />
          </div>
          <div>
            <h1 className="text-32 font-600 text-primary text-end">
              $ {data?.data?.totalDue}
            </h1>
            <h1 className="text-24 font-600 text-gray ">Total Due</h1>
          </div>
        </div>
      </div>
      <div className="bg-white w-[400px] py-6 px-4 rounded">
        <div className="flex justify-between">
          <div>
            <RiMoneyDollarBoxLine size={80} />
          </div>
          <div>
            <h1 className="text-32 font-600 text-primary text-end">
              $ {data?.data?.totalPaid}
            </h1>
            <h1 className="text-24 font-600 text-gray ">Total Paid</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCards;
