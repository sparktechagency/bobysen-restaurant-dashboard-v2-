/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller } from "react-hook-form";

interface InputProps {
  type: string;
  name: string;
  label?: string;
  size?: SizeType;
  placeholder?: string;
  labelColor?: string;
}

const ResInput = ({ type, name, label, size, placeholder }: InputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          {type === "password" ? (
            <Input.Password
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
            />
          ) : (
            <Input
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
            />
          )}
        </Form.Item>
      )}
    />
  );
};

export default ResInput;
