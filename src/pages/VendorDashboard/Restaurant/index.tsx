/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ResTable from "../../../component/Table";
import { useGetAllRestaurantsQuery } from "../../../redux/features/restaurant/restaurantApi";

const VendorRestaurant = () => {
  const [show, setshow] = useState<boolean>(false);
  const query = {};
  const { data: restaurantData } = useGetAllRestaurantsQuery(query);
  //console.log(restaurantData);
  const navigate = useNavigate();
  const column = [
    {
      title: "Restaurant Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total Tables",
      dataIndex: "tables",
      key: "tables",
    },
    {
      title: "Total Menus",
      dataIndex: "menus",
      key: "menus",
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   render: (data: any) => {
    //     return data.status === "active" ? (
    //       <Tag color="#4C9A29" className="cursor-pointer">
    //         Active
    //       </Tag>
    //     ) : (
    //       <Tag
    //         color="#ff0000
    //           "
    //         className="cursor-pointer"
    //       >
    //         Inactive
    //       </Tag>
    //     );
    //   },
    // },
    {
      title: "Action",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex justify-center">
            <NavLink to={`/vendor/edit-restaurant/${data?._id}`}>
              <EditOutlined
                onClick={() => setshow((prev) => !prev)}
                className="cursor-pointer"
                key={index}
              />
            </NavLink>
          </div>
        );
      },
    },
  ];

  const handleCreateRestaurant = () => {
    navigate("/vendor/create-restaurant");
  };
  return (
    <div>
      <h1 className="text-32 font-600 mb-4 text-primary">Restaurant</h1>
      {restaurantData?.data?.length === 0 && (
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleCreateRestaurant}
            className="bg-primary text-white font-500"
            icon={<PlusCircleOutlined />}
          >
            Create Restaurant
          </Button>
        </div>
      )}
      <ResTable
        column={column}
        data={restaurantData?.data}
        loading={false}
        // pagination={{ total: vendorRestaurantData.length, pageSize: 10 }}
      />
    </div>
  );
};

export default VendorRestaurant;
