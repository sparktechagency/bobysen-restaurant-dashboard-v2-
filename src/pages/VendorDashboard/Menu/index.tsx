/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, Input } from "antd";
import MenuCard from "../../../component/MenuCard/MenuCard";
import MenuHeaderCards from "../../../component/MenuHeaderCards/MenuHeaderCards";
import { PlusCircleOutlined } from "@ant-design/icons";

import ResPagination from "../../../component/UI/Pagination";
import { useState } from "react";
import ResModal from "../../../component/Modal/Modal";
import AddMenu from "./AddMenu";
import { useGetAllMenuQuery } from "../../../redux/features/menu/menuApi";
import type { SearchProps } from "antd/es/input/Search";
import NoData from "../../../component/NoData/NoData";
import Loading from "../../../component/UI/Loading";

const Menu = () => {
  const [show, setshow] = useState<boolean>(false);
  const [searchTerm, setSearchValue] = useState<string | null>();
  const [pagination, setpagination] = useState({ page: 1, limit: 12 });
  const query: Record<string, any> = {};
  if (searchTerm) query["searchTerm"] = searchTerm;
  query["page"] = pagination?.page;
  query["limit"] = pagination?.limit;
  const { data: menuData, isLoading } = useGetAllMenuQuery(query);
  const onSearch: SearchProps["onSearch"] = (value, _e) =>
    setSearchValue(value);
  const onChange = (page: number) => {
    setpagination({ page: page, limit: 12 });
  };
  return (
    <div>
      <ResModal showModal={show} setShowModal={setshow} title="ADD MENU">
        <AddMenu setShow={setshow} />
      </ResModal>

      <MenuHeaderCards />
      <div className="flex justify-end gap-x-4 ">
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
