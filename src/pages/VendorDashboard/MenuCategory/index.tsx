/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import ResModal from "../../../component/Modal/Modal";
import AddCategory from "./AddCategory";
import ResTable from "../../../component/Table";
import EditCategory from "./EditCategory";
import { useGetMYmenuCategoriesQuery } from "../../../redux/features/menu/menuApi";
import { useAppDispatch } from "../../../redux/hooks";
import { setCategoryDetails } from "../../../redux/features/menu/menuSlice";
import moment from "moment";

const MenuCategory = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showEditModal, setshowEditModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data: categoryData } = useGetMYmenuCategoriesQuery(undefined);
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
    };
  });
  return (
    <div>
      <ResModal title="ADD CATEGORY" setShowModal={setShow} showModal={show}>
        <AddCategory setShow={setShow} />
      </ResModal>
      <ResModal
        title="EDIT CATEGORY"
        setShowModal={setshowEditModal}
        showModal={showEditModal}
      >
        <EditCategory setshowEditModal={setshowEditModal} />
      </ResModal>
      <div className="flex justify-end">
        <Button
          onClick={() => setShow((prev) => !prev)}
          className="bg-primary text-white h-[40px] font-500"
          icon={<PlusCircleOutlined />}
        >
          Add Category
        </Button>
      </div>
      <div className="mt-4">
        <ResTable
          data={data}
          column={column}
          pagination={{ total: data?.length, pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default MenuCategory;
