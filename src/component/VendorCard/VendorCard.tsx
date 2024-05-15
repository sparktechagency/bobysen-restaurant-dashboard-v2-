/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GoPeople } from "react-icons/go";

const VendorCard = ({ total }: { total: string }) => {
  return (
    <div className="bg-white w-[400px] py-6 px-4 rounded">
      <div className="flex justify-between">
        <div>
          <GoPeople size={80} />
        </div>
        <div>
          <h1 className="text-32 font-600 text-primary text-end">
            {total || 0}
          </h1>
          <h1 className="text-24 font-600 text-gray ">Total Vendors</h1>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
