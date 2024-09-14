/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import ResConfirm from "../../../component/UI/PopConfirm";
import {
  useDeleteBannerMutation,
  useGetallbannerQuery,
} from "../../../redux/features/banner/bannerApi";
import showImage from "../../../utils/showImage";
import CreateModal from "./CreateModal";

const Banner = () => {
  const { data } = useGetallbannerQuery({});
  const [show, setShow] = useState(false);
  const [deleteBanner] = useDeleteBannerMutation();
  const handleDeleteBanner = async (id: string) => {
    const toastId = toast.loading("Deleting..");
    try {
      await deleteBanner(id);
      toast.success("Banner deleted successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  const columns = [
    {
      title: "#SL",
      dataIndex: "serial",
      // @ts-ignore
      render: (_, __, index) => <p>{index + 1}</p>, // Use lowercase 'p' for the HTML paragraph element
    },
    {
      title: "Banner",
      dataIndex: "image",
      render: (image: string) => (
        <Image width={50} src={showImage(image)} alt="Banner" />
      ), // Correct the tag and provide an 'alt' attribute for the image
    },
    {
      title: "Action",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex justify-center gap-x-2">
            <ResConfirm
              handleOk={() => handleDeleteBanner(data?._id)}
              description="this action cannot be undone!"
            >
              <DeleteOutlined className="cursor-pointer" key={index} />
            </ResConfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <ResModal title="Add banner" showModal={show} setShowModal={setShow}>
        <CreateModal />
      </ResModal>
      <div className="flex justify-end mb-2">
        <Button
          className="bg-primary text-white font-500 "
          onClick={() => setShow((prev) => !prev)}
        >
          Add Banner
        </Button>
      </div>
      <ResTable column={columns} data={data?.data} />
    </div>
  );
};

export default Banner;
