/* eslint-disable @typescript-eslint/no-explicit-any */

import { Divider } from "antd";
import showImage from "../../utils/showImage";
const SellingItems = ({ data }: any) => {
  //console.log(data);
  return (
    <div className=" ">
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <img
            src={showImage(data?.image)}
            alt=""
            width={80}
            className="rounded-lg"
          />
          <div>
            <h1>{data?.name}</h1>
            <p className="text-deepGray">
              Available :{data?.Available ? "true" : "false"}
            </p>
          </div>
        </div>
        <h1 className="text-24 font-600">Rs. {data?.price}</h1>
      </div>
      <Divider className="bg-deepGray h-[2px]" />
    </div>
  );
};

export default SellingItems;
