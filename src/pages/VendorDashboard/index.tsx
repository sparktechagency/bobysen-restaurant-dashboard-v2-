/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, DatePicker, Row, Select, Space } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import avg from "../../assets/avg.png";
import NoData from "../../component/NoData/NoData";
import SellingItems from "../../component/SellingItem/SellingItems";
import Loading from "../../component/UI/Loading";
import VendorChart from "../../component/VendorChart/VendorChart";
import VendorDashboardCard from "../../component/VendorDashboardCard";
import { useGetBookingStaticsQuery } from "../../redux/features/booking/bookingApi";
import { useGetAllMenuQuery } from "../../redux/features/menu/menuApi";
import { useGetVendorWiseRestaurantIdQuery } from "../../redux/features/restaurant/restaurantApi";
const VendorDashboard = () => {
  const [restaurantId, setRestaurantId] = useState<String | null>(null);
  const query: Record<string, any> = {};
  if (restaurantId) query["restaurant"] = restaurantId;
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const { data: menuData, isLoading } = useGetAllMenuQuery(query);
  const { data: staticsData } = useGetBookingStaticsQuery({ ...query, year });

  const { data: ResData } = useGetVendorWiseRestaurantIdQuery({});

  const handleChange = (value: string) => {
    setRestaurantId(value);
  };
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} className="flex justify-end">
        <div>
          <Select
            style={{ width: 200, height: 33 }}
            placeholder="Select Restaurant"
            onChange={handleChange}
            options={ResData?.data?.map((data: any) => {
              return { label: data?.name, value: data?._id };
            })}
          />
        </div>
      </Col>
      <Col span={14}>
        <VendorDashboardCard query={query} />
        <div className="bg-white mt-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-black font-600 text-32">Booking Statics</h1>
              <p className="text-18 text-deepGray">
                Here are the booking statistics broken down by month.
              </p>
            </div>
            <Space className="text-black font-500 flex flex-col items-start">
              <p>Select Year</p>
              <DatePicker
                onChange={(date, dateString) => setYear(dateString as string)}
                picker="year"
                defaultValue={dayjs(dayjs(), "YYYY")}
              />
            </Space>
          </div>
          {/* section 2 */}
          <div className="flex gap-x-10 my-6">
            <div>
              <div className="flex gap-x-2 items-center  invisible">
                <img src={avg} alt="" />
                <h1 className="text-32 font-700">250k</h1>
              </div>
            </div>
            {/* <div>
              <div className="flex gap-x-2 items-center ">
                <img src={avg} alt="" />
                <h1 className="text-32 font-700">10k</h1>
              </div>
              <p className="text-deepGray text-18">Today Sales</p>
            </div> */}
          </div>
          <VendorChart data={staticsData?.data} />
        </div>
      </Col>
      <Col span={10}>
        <div className="bg-white px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-24 font-600 ">Menu</h1>
            <NavLink to={`/vendor/menu`}>
              <Button className="bg-primary text-white font-500">
                See All
              </Button>
            </NavLink>
          </div>
          <p className="text-deepGray my-2 text-18">Latest Menu</p>
          <div
            className="overflow-y-auto pe-4"
            style={{ maxHeight: "calc(100vh - 270px)" }}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <Loading />
              </div>
            ) : menuData?.data?.length > 0 ? (
              menuData.data.map((data: any, index: number) => (
                <SellingItems key={index} data={data} />
              ))
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default VendorDashboard;
