/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tooltip } from "antd";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const VendorChart = ({ data }: any) => {
  return (
    <AreaChart
      width={940}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="40%" stopColor="#80B619" stopOpacity={60} />
          <stop offset="95%" stopColor="#FFFFFF" stopOpacity={20} />
        </linearGradient>
      </defs>
      <CartesianGrid
        strokeDasharray="3 3"
        vertical={false}
        horizontal={false}
      />
      <XAxis dataKey="month" />
      <YAxis dataKey="totalBooking" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="totalBooking"
        stroke="#4C9A29"
        strokeWidth="1"
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
};

export default VendorChart;
