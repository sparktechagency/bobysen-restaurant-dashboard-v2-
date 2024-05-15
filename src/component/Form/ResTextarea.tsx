/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller } from "react-hook-form";
const { TextArea } = Input;
interface InputProps {
  name: string;
  label?: string;
  size?: SizeType;
  maxLength?: number;
  placeholder?: string;
  labelColor?: string;
}

const ResTextArea = ({
  name,
  label,
  size,
  placeholder,
  labelColor = "black",
  maxLength,
}: InputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={<label style={{ color: labelColor }}>{label}</label>}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <TextArea
            className="h-[100px]"
            maxLength={maxLength}
            showCount
            {...field}
            id={name}
            size={size}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    />
  );
};

export default ResTextArea;
