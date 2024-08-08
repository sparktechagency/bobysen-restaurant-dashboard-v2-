/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import ResForm from "../../../component/Form/FormProvider";
import ResInput from "../../../component/Form/ResInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { tableValidation } from "../../../schema/table.schema";
import { useAppSelector } from "../../../redux/hooks";
import { useEditTableMutation } from "../../../redux/features/table/tableApi";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { toast } from "sonner";

const EditTable = ({ setShow }: any) => {
  const table = useAppSelector((state) => state.table.table);
  const formatData = { ...table, seats: Number(table?.seats) };
  const [editTable] = useEditTableMutation();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Editing....");
    try {
      await editTable({ body: data, id: table?._id }).unwrap();
      toast.success("Table successfully updated", {
        id: toastId,
        duration: 2000,
      });
      setShow((prev: boolean) => !prev);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  return (
    <ResForm
      defaultValues={formatData}
      onSubmit={onSubmit}
      resolver={zodResolver(tableValidation.EditableSchema)}
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
          EDIT TABLE
        </Button>
      </div>
    </ResForm>
  );
};

export default EditTable;
