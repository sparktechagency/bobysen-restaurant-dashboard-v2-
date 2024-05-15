import { ThemeConfig } from "antd";
export const sidebardThemes: ThemeConfig = {
  components: {
    Menu: {
      itemSelectedBg: "#4C9A29",
      itemSelectedColor: "black",
      itemColor: "black",
      borderRadiusLG: 0,
      itemMarginInline: 0,
    },
    Pagination: {
      colorPrimary: "#edf5ea",
      colorText: "black",
      colorPrimaryBorder: "#4C9A29",
      colorPrimaryHover: "#4C9A29",
      itemActiveBg: "#4C9A29",
      itemActiveBgDisabled: "rgba(255, 255, 255, 0.15)",
    },
    Table: {
      fontSize: 18,
      headerBorderRadius: 0,
      headerBg: "#c8e0bd",
      headerColor: "black",
      cellPaddingBlock: 13,
    },
  },

  token: {
    colorPrimary: "#4c9a29",
    colorInfo: "#4c9a29",
    colorLink: "#4c9a29",
    colorSuccess: "#4c9a29",
  },
};
