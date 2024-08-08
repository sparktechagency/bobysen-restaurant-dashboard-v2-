
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ResForm from "../../../component/Form/FormProvider";
import ResInput from "../../../component/Form/ResInput";
import { Button } from "antd";
import { useAddTableMutation } from "../../../redux/features/table/tableApi";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { tableValidation } from "../../../schema/table.schema";

interface TTableProps {
  restaurantId: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateTable = ({ restaurantId, setShow }: TTableProps) => {
  const [addTable] = useAddTableMutation();
  const onSubmit = async (data: any) => {
    data.seats = Number(data?.seats);
    const toastId = toast.loading("Creating...");
    try {
      await addTable({
        ...data,
        restaurant: restaurantId,
      }).unwrap();
      toast.success("Table added successfully", {
        id: toastId,
        duration: 2000,
      });

      setShow((prev: boolean) => !prev);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <ResForm
      onSubmit={onSubmit}
      resolver={zodResolver(tableValidation.createTableSchema)}
    >
      {/* <ResInput
        type="text"
        size="large"
        name="tableName"
        placeholder="Enter Table Name"
        label="Enter Table Name"
      /> */}
      <ResInput
        type="text"
        size="large"
        name="tableNo"
        placeholder="Enter Table No"
        label="Enter Table No"
      />
      <ResInput
        type="number"
        size="large"
        name="seats"
        placeholder="Enter Total Seats"
        label="Enter Total Seats"
      />

      <div className="pt-4">
        <Button
          htmlType="submit"
          className="bg-primary text-white font-600 w-full h-[38px] "
        >
          CREATE TABLE
        </Button>
      </div>
    </ResForm>
  );
};

export default CreateTable;
