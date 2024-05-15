/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import ResForm from "../Form/FormProvider";
import ResInput from "../Form/ResInput";
import {
  useGetSingleWalletQuery,
  useSentVendorAmountMutation,
} from "../../redux/features/wallet/walletApi";
import ErrorResponse from "../UI/ErrorResponse";
import { toast } from "sonner";
import ResSelect from "../Form/ResSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { walletValidationSchema } from "../../schema/wallet.schema";

const MakePaymentForm = ({ id, setshow }: any) => {
  const { data: walletData } = useGetSingleWalletQuery(id);
  const [sendAmount] = useSentVendorAmountMutation();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Sending..");
    if (data?.amount > walletData?.data?.due) {
      toast.error("Influence balance", { id: toastId, duration: 2000 });

      return;
    }
    try {
      await sendAmount({ id, body: data }).unwrap();
      toast.success("Amount sent successfully", {
        id: toastId,
        duration: 2000,
      });
      setshow((prev: boolean) => !prev);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  const options = [
    { label: "Bank", value: "Bank" },
    { label: "Hand Cash", value: "cash" },
    { label: "Others", value: "others" },
  ];

  return (
    <div>
      <ResForm
        onSubmit={onSubmit}
        resolver={zodResolver(walletValidationSchema.walletSchema)}
      >
        <ResInput
          size="large"
          label="Enter Amount"
          name="amount"
          type="number"
          placeholder="enter amount"
        />
        <ResInput
          size="large"
          label="Enter Perchantage"
          name="percentage"
          type="number"
          placeholder="enter perchantage"
        />
        <ResSelect
          size="large"
          options={options}
          label="Select Method"
          name="method"
          placeholder="select method"
        />
        <div className="flex gap-x-2 font-600 text-20 mb-4">
          <p>Available Balance:</p>
          <p className="text-primary">${walletData?.data?.due}</p>
        </div>
        <Button
          disabled={walletData?.data?.due <= 0}
          htmlType="submit"
          className="bg-primary text-white font-600 h-[36px] w-full"
        >
          Make Payment
        </Button>
      </ResForm>
    </div>
  );
};

export default MakePaymentForm;
