/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ResTable from "../../component/Table";
import { data } from "../../db";
import { Button, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import ResModal from "../../component/Modal/Modal";
import CreateVendor from "./Vendor/CreateVendor";
import EditVentor from "./Vendor/EditVentor";
import { EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import VendorCard from "../../component/VendorCard/VendorCard";
import { vendorTableTheme } from "../../themes";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";

import ErrorResponse from "../../component/UI/ErrorResponse";
import ResConfirm from "../../component/UI/PopConfirm";
import { useAppDispatch } from "../../redux/hooks";
import { setvendorDetails } from "../../redux/features/auth/authSlice";
import { SearchProps } from "antd/es/input";

const AdminDashboard = () => {
  const [show, setShow] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const query: Record<string, any> = {};
  query["role"] = "vendor";
  if (searchTerm) query["searchTerm"] = searchTerm;
  const { data: vendorData, isLoading } = useGetAllUserQuery(query);
  const [updateUser] = useUpdateUserMutation();
  const handleCreateVendorModal = () => {
    setShow((prev) => !prev);
  };
  const handleChangeStatus = async (id: string, status: string) => {
    const data = { status: status };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    try {
      await updateUser({ id: id, body: formData }).unwrap();
    } catch (err) {
      ErrorResponse(err);
    }
  };
  const column = [
    {
      title: "Vendor Name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "number",
    },
    {
      title: "Status",
      key: "status",
      render: (data: any) => {
        return data.status === "active" ? (
          <ResConfirm handleOk={() => handleChangeStatus(data?._id, "blocked")}>
            <Tag color="#4C9A29" className="cursor-pointer">
              Active
            </Tag>
          </ResConfirm>
        ) : (
          <ResConfirm handleOk={() => handleChangeStatus(data?._id, "active")}>
            <Tag color="red" className="cursor-pointer">
              Blocked
            </Tag>
          </ResConfirm>
        );
      },
    },
    {
      title: "Action",

      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex gap-x-4">
            <EditOutlined
              onClick={() => {
                setShowEditModal((prev) => !prev);
                dispatch(setvendorDetails(data));
              }}
              className="cursor-pointer"
              key={index}
            />
          </div>
        );
      },
    },
  ];
  const onSearch: SearchProps["onSearch"] = (value, _e) => setSearchTerm(value);

  return (
    <div>
      <ResModal title="CREATE VENDOR" showModal={show} setShowModal={setShow}>
        <CreateVendor setShow={setShow} />
      </ResModal>
      <ResModal
        title="EDIT VENDOR"
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      >
        <EditVentor setShowEditModal={setShowEditModal} />
      </ResModal>
      <VendorCard total={vendorData?.meta?.total} />
      <div className="flex justify-end mb-4 items-center gap-x-4">
        <Input.Search
          onSearch={onSearch}
          placeholder="search vendor by email or name"
          className="w-[400px]"
          size="large"
          allowClear
        />
        <Button
          onClick={handleCreateVendorModal}
          className="bg-primary text-white font-500"
          icon={<PlusCircleOutlined />}
        >
          Create Vendor
        </Button>
      </div>
      <div>
        <ResTable
          theme={vendorTableTheme}
          data={vendorData?.data}
          column={column}
          pagination={{ total: data.length, pageSize: 10 }}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
