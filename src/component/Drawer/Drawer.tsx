import { Button, Drawer, Space } from "antd";

interface DrawerProps {
  title: string;
  size?: "default" | "large";
  placement?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
  open: boolean;
  setOpen: (val: boolean) => void;
}

const Drawers: React.FC<DrawerProps> = ({
  title,
  size = "large",
  placement = "right",
  children,
  open,
  setOpen,
}) => {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      title={title}
      placement={placement}
      size={size}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
};

export default Drawers;
