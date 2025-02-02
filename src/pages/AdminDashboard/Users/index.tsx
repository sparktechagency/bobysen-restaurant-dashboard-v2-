/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { useState } from "react";
import ResTable from "../../../component/Table";
import VendorCard from "../../../component/VendorCard/VendorCard";
import { useGetAllUserQuery } from "../../../redux/features/auth/authApi";
import { vendorTableTheme } from "../../../themes";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const query: Record<string, any> = {};
  query["role"] = "user";
  if (searchTerm) query["searchTerm"] = searchTerm;
  const { data: vendorData, isLoading } = useGetAllUserQuery(query);

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
    // {
    //   title: "Action",

    //   key: "action",
    //   render: (data: any, index: number) => {
    //     return (
    //       <div className="flex gap-x-4">
    //         <EditOutlined
    //           onClick={() => {
    //             setShowEditModal((prev) => !prev);
    //             dispatch(setvendorDetails(data));
    //           }}
    //           className="cursor-pointer"
    //           key={index}
    //         />
    //       </div>
    //     );
    //   },
    // },
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
          pagination={{ total: vendorData?.data?.length, pageSize: 10 }}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Users;
