/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { useState } from "react";
import { toast } from "sonner";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import VendorCard from "../../../component/VendorCard/VendorCard";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/auth/authApi";
import { vendorTableTheme } from "../../../themes";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const query: Record<string, any> = {};
  query["role"] = "user";
  if (searchTerm) query["searchTerm"] = searchTerm;
  query["limit"] = 99999;
  const [deleteUser] = useUpdateUserMutation();
  const { data: vendorData, isLoading } = useGetAllUserQuery(query);
  const handledeleteUser = async (id: string) => {
    const toastId = toast.loading("Deleting..");
    try {
      await deleteUser({ id, body: { isDeleted: true } }).unwrap();
      toast.success("User Deleted successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
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
    // {
    //   title: "Status",
    //   key: "status",
    //   render: (data: any) => {
    //     return data.status === "active" ? (
    //       <ResConfirm handleOk={() => handleChangeStatus(data?._id, "blocked")}>
    //         <Tag color="#4C9A29" className="cursor-pointer">
    //           Active
    //         </Tag>
    //       </ResConfirm>
    //     ) : (
    //       <ResConfirm handleOk={() => handleChangeStatus(data?._id, "active")}>
    //         <Tag color="red" className="cursor-pointer">
    //           Blocked
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
          <div className="flex justify-center gap-x-2">
            <ResConfirm
              handleOk={() => handledeleteUser(data?._id)}
              description="this action cannot be undone!"
            >
              <DeleteOutlined className="cursor-pointer" key={index} />
            </ResConfirm>
          </div>
        );
      },
    },
  ];
  const onSearch: SearchProps["onSearch"] = (value, _e) => setSearchTerm(value);

  return (
    <div>
      <VendorCard total={vendorData?.meta?.total} title="Users" />
      <div className="flex justify-end mb-4 items-center gap-x-4">
        <Input.Search
          onSearch={onSearch}
          placeholder="search user by email or name"
          className="w-[400px]"
          size="large"
          allowClear
        />
      </div>
      <div>
        <ResTable
          theme={vendorTableTheme}
          data={vendorData?.data}
          column={column}
          pagination={{ total: vendorData?.meta?.total, pageSize: 10 }}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Users;
