import { MdOutlineMoneyOff } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";

const PaymentCards = () => {
  return (
    <div className="flex gap-x-4">
      <div className="bg-white w-[400px] py-6 px-4 rounded">
        <div className="flex justify-between">
          <div>
            <MdOutlineAttachMoney size={80} />
          </div>
          <div>
            <h1 className="text-32 font-600 text-primary text-end">1000000</h1>
            <h1 className="text-24 font-600 text-gray ">Available Balance</h1>
          </div>
        </div>
      </div>
      <div className="bg-white w-[400px] py-6 px-4 rounded">
        <div className="flex justify-between">
          <div>
            <MdOutlineMoneyOff size={80} />
          </div>
          <div>
            <h1 className="text-32 font-600 text-primary text-end">50000</h1>
            <h1 className="text-24 font-600 text-gray ">Total Payment</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCards;
