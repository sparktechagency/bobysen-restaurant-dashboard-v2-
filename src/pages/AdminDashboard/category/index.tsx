/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Tag, Tooltip } from "antd";
import { useState } from "react";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import { toast } from "sonner";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import {
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../redux/features/category/categoryApi";
import { setCategory } from "../../../redux/features/category/categorySlice";
import { useAppDispatch } from "../../../redux/hooks";
import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";

const Category = () => {
  const [show, setShow] = useState(false);
  const [showmodal, setShowModal] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const { data: Cdata, isFetching } = useGetAllCategoryQuery(query);
  const [updateCategory] = useUpdateCategoryMutation();
  const dispatch = useAppDispatch();

  const handleUpdateCategory = async (id: any, status: boolean) => {
    const toastId = toast.loading("Updating...");
    try {
      await updateCategory({
        id,
        body: { isActive: status },
      }).unwrap();
      toast.success("Category updated successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span className="font-semibold">{name}</span>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Available" : "Unavailable"}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (data: any, index: number) => (
        <div className="flex gap-x-3">
          <Tooltip
            title={data.isActive ? "Make Unavailable" : "Make Available"}
          >
            <ResConfirm
              description={`Are you sure you want to mark this category as ${
                data.isActive ? "Unavailable" : "Available"
              }?`}
              handleOk={() =>
                handleUpdateCategory(data?._id, data.isActive ? false : true)
              }
            >
              {data.isActive ? (
                <CgUnblock
                  style={{ color: "red", fontSize: 20, cursor: "pointer" }}
                />
              ) : (
                <MdBlock
                  style={{ color: "green", fontSize: 20, cursor: "pointer" }}
                />
              )}
            </ResConfirm>
          </Tooltip>
          <Tooltip title="Edit">
            <EditOutlined
              className="cursor-pointer text-yellow-500"
              key={index}
              onClick={() => {
                dispatch(setCategory(data));
                setShowModal(true);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ResModal
        showModal={showmodal}
        setShowModal={setShowModal}
        title="Edit Category"
        width={700}
      >
        <EditCategory setShow={setShowModal} />
      </ResModal>
      <ResModal
        showModal={show}
        setShowModal={setShow}
        title="Create Category"
        width={700}
      >
        <CreateCategory setShow={setShow} />
      </ResModal>

      <div className="flex justify-end gap-x-4 mb-4">
        <Button
          onClick={() => setShow((prev) => !prev)}
          className="bg-primary text-white font-500"
          icon={<PlusCircleOutlined />}
        >
          Add Category
        </Button>
      </div>

      <div>
        <ResTable
          loading={isFetching}
          column={columns}
          data={Cdata?.data}
          pagination={{ pageSize: 10, total: Cdata?.data?.length }}
        />
      </div>
    </div>
  );
};

export default Category;
