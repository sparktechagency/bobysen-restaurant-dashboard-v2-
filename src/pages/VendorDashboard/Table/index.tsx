/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ResTable from "../../../component/Table";
import TableCards from "../../../component/TableCards/TableCards";

import {
  // DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Select } from "antd";
import { vendorTableTheme } from "../../../themes/tableThemes";
// import ResConfirm from "../../../component/UI/PopConfirm";
import ResModal from "../../../component/Modal/Modal";
import { useGetVendorWiseRestaurantIdQuery } from "../../../redux/features/restaurant/restaurantApi";
import { useGetTablesQuery } from "../../../redux/features/table/tableApi";
import { setTable } from "../../../redux/features/table/tableSlice";
import { useAppDispatch } from "../../../redux/hooks";
import CreateTable from "./CreateTable";
import EditTable from "./EditTable";

const Table = () => {
  const [show, setShow] = useState<boolean>(false);
  const { data: ResData } = useGetVendorWiseRestaurantIdQuery({});
  const [restaurantId, setRestaurantId] = useState<String | null>(null);
  const query: Record<string, any> = {};
  const handleChange = (value: string) => {
    setRestaurantId(value);
  };
  if (restaurantId) query["restaurant"] = restaurantId;
  const { data: tableData, isLoading } = useGetTablesQuery(query);
  console.log(query);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // const handleBookedTable = (id: string, type: string) => {
  //   //console.log(id, type);
  // };
  // const handleDeleteTable = async (id: string) => {
  //   //console.log(id);
  // };

  const dispatch = useAppDispatch();

  const column = [
    {
      title: "Table No",
      dataIndex: "tableNo",
      key: "tableNo",
    },
    {
      title: "Table Name",
      dataIndex: "tableName",
      key: "tableName",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: "seat",
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   render: (data: any) => {
    //     return data.status === "free" ? (
    //       <ResConfirm
    //         title="are you sure?"
    //         description="this action cannot be undone"
    //         handleOk={() => handleBookedTable(data?.id, "booked")}
    //       >
    //         <Tag color="#4C9A29" className="cursor-pointer">
    //           FREE
    //         </Tag>
    //       </ResConfirm>
    //     ) : (
    //       <ResConfirm
    //         title="are you sure?"
    //         description="this action cannot be undone"
    //         handleOk={() => handleBookedTable(data?.id, "free")}
    //       >
    //         <Tag
    //           color="#ff0000
    //         "
    //           className="cursor-pointer"
    //         >
    //           BOOKED
    //         </Tag>
    //       </ResConfirm>
    //     );
    //   },
    // },
    {
      title: "Action",

      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex gap-x-4">
            <EditOutlined
              onClick={() => {
                setShowEditModal((prev) => !prev);
                dispatch(setTable(data));
              }}
              className="cursor-pointer"
              key={index}
            />

            {/* <ResConfirm
              title="are you sure?"
              description="this action cannot be undone"
              handleOk={() => handleDeleteTable(data?.id)}
            >
              <DeleteOutlined className="cursor-pointer" key={index} />
            </ResConfirm> */}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ResModal setShowModal={setShow} showModal={show} title="CREATE TABLE">
        <CreateTable restaurantId={tableData?.data?._id} setShow={setShow} />
      </ResModal>
      <ResModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        title="EDIT TABLE"
      >
        <EditTable setShow={setShowEditModal} />
      </ResModal>
      <TableCards tableData={tableData} />

      {/* {tableData?.data?._id && ( */}
      <div className="flex justify-end mb-4 gap-x-2">
        <div className="flex justify-end">
          <Select
            style={{ width: 200, height: 33 }}
            placeholder="Select Restaurant"
            onChange={handleChange}
            options={ResData?.data?.map((data: any) => {
              return { label: data?.name, value: data?._id };
            })}
          />
        </div>
        <Button
          onClick={() => setShow((prev) => !prev)}
          className="bg-primary text-white font-500"
          icon={<PlusCircleOutlined />}
        >
          Create Table
        </Button>
      </div>
      {/* )} */}
      <div className="mt-6">
        <ResTable
          theme={vendorTableTheme}
          loading={isLoading}
          data={tableData?.data?.tables}
          column={column}
          pagination={{ total: tableData?.data?.length, pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Table;
