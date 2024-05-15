/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Tag } from "antd";

import { useState } from "react";
import ResModal from "../Modal/Modal";
import MenuDetails from "../MenuDetails/MenuDetails";
import showImage from "../../utils/showImage";
const MenuCard = ({ data }: any) => {
  const [showDetails, setshowDetails] = useState<boolean>(false);
  return (
    <Col className="p-2">
      <ResModal showModal={showDetails} setShowModal={setshowDetails}>
        <MenuDetails data={data} />
      </ResModal>
      <div className="w-[250px] bg-[#D2D9CC] rounded pb-2 ">
        <div
          onClick={() => setshowDetails((prev) => !prev)}
          className="cursor-pointer"
        >
          <img
            src={showImage(data?.image)}
            alt=""
            width={150}
            height={150}
            className="p-2 rounded-lg mx-auto "
          />
        </div>
        <h1 className="text-black font-500 text-24 text-center mb-2">
          {data?.name}
        </h1>
        <div className="flex justify-between px-2">
          <h1 className="text-20 font-600 ">${data?.price}</h1>
          {data?.available ? (
            <Tag className="flex items-center bg-primary text-white font-600 cursor-pointer">
              Available
            </Tag>
          ) : (
            <Tag className="flex items-center bg-red text-white font-600 cursor-pointer">
              Not Available
            </Tag>
          )}
        </div>
      </div>
    </Col>
  );
};

export default MenuCard;
