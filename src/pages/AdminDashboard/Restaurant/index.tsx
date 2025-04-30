/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ResTable from "../../../component/Table";

import RestaurantCard from "../../../component/RestaurantCard/RestaurantCard";
import { RestaurantTableTheme } from "../../../themes";

import { EditOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { CgUnavailable } from "react-icons/cg";
import { MdEventAvailable, MdReviews } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import {
  useGetAllRestaurantForadminQuery,
  useHandleChangeStatusMutation,
} from "../../../redux/features/restaurant/restaurantApi";

const Restaurant = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [handlechangeStatus] = useHandleChangeStatusMutation();
  if (searchTerm) query["searchTerm"] = searchTerm;
  const onSearch: SearchProps["onSearch"] = (value, _e) => setSearchTerm(value);
  const { data: restaurantData, isLoading } =
    useGetAllRestaurantForadminQuery(query);
  const handleChangeStatus = async (id: string, status: string) => {
    const toastId = toast.loading("Updating...");
    try {
      await handlechangeStatus({ id: id, data: { status: status } }).unwrap();
      toast.success("Status changed successfully", {
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
      dataIndex: "owner",
      key: "vendorName",
    },
    {
      title: "Restaurant Name",
      dataIndex: "name",
      key: "restauranName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex gap-x-4">
            <ResConfirm
              description="This action cannot be undone!"
              handleOk={() =>
                handleChangeStatus(
                  data?._id,
                  data?.status === "active" ? "inactive" : "active"
                )
              }
            >
              {data?.status === "active" ? (
                <CgUnavailable className="cursor-pointer" key={index} />
              ) : (
                <MdEventAvailable className="cursor-pointer" key={index} />
              )}
            </ResConfirm>
            <Link to={`/admin/reveiws/${data?._id}`}>
              <MdReviews className="cursor-pointer" />
            </Link>
            <NavLink to={`/admin/edit-restaurant/${data?._id}`}>
              <EditOutlined
                // onClick={() => setshow((prev) => !prev)}
                className="cursor-pointer"
                key={index}
              />
            </NavLink>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <RestaurantCard total={restaurantData?.data?.length} />
      <div className="flex justify-end">
        <Input.Search
          onSearch={onSearch}
          placeholder="search vendor by name or restaurant name"
          className="w-[400px]"
          size="large"
          allowClear
        />
      </div>
      <div className="mt-4">
        <ResTable
          theme={RestaurantTableTheme}
          column={column}
          data={restaurantData?.data}
          pagination={{ total: restaurantData?.meta?.total, pageSize: 10 }}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Restaurant;
