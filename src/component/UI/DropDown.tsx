/* eslint-disable @typescript-eslint/no-explicit-any */

import { ConfigProvider, Dropdown } from "antd";
import { ReactNode } from "react";

interface DropdownProps {
  items: {
    key: number;
    label: string | number;
    value: string | number | undefined;
  }[];
  children: ReactNode;
}
const DropDown = ({ items, children }: DropdownProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            colorBgElevated: "white",
            colorText: "black",
          },
        },
      }}
    >
      <Dropdown menu={{ items }} className="text-white">
        <a onClick={(e) => e.preventDefault()}>{children}</a>
      </Dropdown>
    </ConfigProvider>
  );
};

export default DropDown;
