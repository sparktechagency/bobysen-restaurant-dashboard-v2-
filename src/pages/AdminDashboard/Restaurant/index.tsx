/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ResTable from "../../../component/Table";

import RestaurantCard from "../../../component/RestaurantCard/RestaurantCard";
import { RestaurantTableTheme } from "../../../themes";

import { useGetAllRestaurantForadminQuery } from "../../../redux/features/restaurant/restaurantApi";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";

const Restaurant = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  if (searchTerm) query["searchTerm"] = searchTerm;
  const onSearch: SearchProps["onSearch"] = (value, _e) => setSearchTerm(value);
  const { data: restaurantData, isLoading } =
    useGetAllRestaurantForadminQuery(query);
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
