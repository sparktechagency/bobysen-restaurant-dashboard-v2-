/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select } from "antd";
import MenuCard from "../../../component/MenuCard/MenuCard";
import MenuHeaderCards from "../../../component/MenuHeaderCards/MenuHeaderCards";

import type { SearchProps } from "antd/es/input/Search";
import { useState } from "react";
import ResModal from "../../../component/Modal/Modal";
import NoData from "../../../component/NoData/NoData";
import Loading from "../../../component/UI/Loading";
import ResPagination from "../../../component/UI/Pagination";
import { useGetAllMenuQuery } from "../../../redux/features/menu/menuApi";
import { useGetVendorWiseRestaurantIdQuery } from "../../../redux/features/restaurant/restaurantApi";
import AddMenu from "./AddMenu";

const Menu = () => {
  const [show, setshow] = useState<boolean>(false);
  const [searchTerm, setSearchValue] = useState<string | null>();
  const [pagination, setpagination] = useState({ page: 1, limit: 12 });
  const [restaurantId, setRestaurantId] = useState<String>();
  const query: Record<string, any> = {};
  if (searchTerm) query["searchTerm"] = searchTerm;
  query["page"] = pagination?.page;
  query["limit"] = pagination?.limit;
  if (restaurantId) query["restaurant"] = restaurantId;
  const { data: menuData, isLoading } = useGetAllMenuQuery(query);

  const onSearch: SearchProps["onSearch"] = (value, _e) =>
    setSearchValue(value);
  const onChange = (page: number) => {
    setpagination({ page: page, limit: 12 });
  };
  const { data: ResData } = useGetVendorWiseRestaurantIdQuery({});
  const handleChange = (value: string) => {
    setRestaurantId(value);
  };

  return (
    <div>
      <ResModal showModal={show} setShowModal={setshow} title="ADD MENU">
        <AddMenu setShow={setshow} />
      </ResModal>

      <MenuHeaderCards restaurant={restaurantId} />
      <div className="flex justify-end gap-x-4 ">
        <Select
          style={{ width: 200, height: 40 }}
          placeholder="Select Restaurant"
          onChange={handleChange}
          options={ResData?.data?.map((data: any) => {
            return { label: data?.name, value: data?._id };
          })}
        />

        <Input.Search
          onSearch={onSearch}
          placeholder="search menu"
          className="w-[400px]"
          size="large"
          allowClear
        />
        <Button
          onClick={() => setshow((prev) => !prev)}
          className="bg-primary text-white h-[40px] font-500"
          icon={<PlusCircleOutlined />}
        >
          Add Menu
        </Button>
      </div>
      <Divider className="bg-primary p-[1px] " />
      <div className="text-20 font-500 flex items-center my-auto">
        <h1 className="">Total Menu:</h1>
        <span>{menuData?.meta?.total}</span>
      </div>
      <div className="flex flex-wrap justify-center mt-2">
        {isLoading ? (
          <Loading />
        ) : menuData?.data?.length > 0 ? (
          menuData.data.map((data: any, index: number) => (
            <MenuCard key={index} data={data} />
          ))
        ) : (
          <NoData />
        )}
      </div>

      <div className="flex justify-end mt-2">
        <ResPagination total={menuData?.meta?.total} onChange={onChange} />
      </div>
    </div>
  );
};

export default Menu;
