/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import moment from "moment";
import { useState } from "react";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { useGetMYmenuCategoriesQuery } from "../../../redux/features/menu/menuApi";
import { setCategoryDetails } from "../../../redux/features/menu/menuSlice";
import { useGetVendorWiseRestaurantIdQuery } from "../../../redux/features/restaurant/restaurantApi";
import { useAppDispatch } from "../../../redux/hooks";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

const MenuCategory = () => {
  const [show, setShow] = useState<boolean>(false);
  const [restaurantId, setRestaurantId] = useState<String>();
  const [showEditModal, setshowEditModal] = useState<boolean>(false);
  const { data: ResData } = useGetVendorWiseRestaurantIdQuery({});
  const query: Record<string, any> = {};
  const handleChange = (value: string) => {
    setRestaurantId(value);
  };
  if (restaurantId) query["restaurant"] = restaurantId;
  const dispatch = useAppDispatch();

  const {
    data: categoryData,
    isLoading,
    isFetching,
  } = useGetMYmenuCategoriesQuery(query);

  const column = [
    {
      title: "#SL",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex gap-x-4" key={index}>
            <EditOutlined
              onClick={() => {
                setshowEditModal((prev) => !prev);
                dispatch(setCategoryDetails(data));
              }}
              className="cursor-pointer"
              key={index}
            />
          </div>
        );
      },
    },
  ];
  const data = categoryData?.data?.map((data: any, index: number) => {
    return {
      serial: index,
      createdAt: moment(data?.createdAt).format("YYYY-MM-DD HH:mm: a"),
      title: data?.title,
      image: data?.image,
      _id: data?._id,
    };
  });
  return (
    <div>
      <ResModal
        title="EDIT CATEGORY"
        setShowModal={setshowEditModal}
        showModal={showEditModal}
      >
        <EditCategory setshowEditModal={setshowEditModal} />
      </ResModal>
      <div className="flex justify-end gap-x-4">
        <Select
          style={{ width: 200, height: 40 }}
          placeholder="Select Restaurant"
          onChange={handleChange}
          options={ResData?.data?.map((data: any) => {
            return { label: data?.name, value: data?._id };
          })}
        />

        <Button
          onClick={() => setShow((prev) => !prev)}
          className="bg-primary text-white h-[40px] font-500"
          icon={<PlusCircleOutlined />}
        >
          Add Category
        </Button>

        <ResModal title="ADD CATEGORY" setShowModal={setShow} showModal={show}>
          <AddCategory setShow={setShow} />
        </ResModal>
      </div>
      <div className="mt-4">
        <ResTable
          data={data}
          loading={isLoading || isFetching}
          column={column}
          pagination={{ total: data?.length, pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default MenuCategory;
