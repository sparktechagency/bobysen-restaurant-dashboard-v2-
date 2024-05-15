/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, Upload } from "antd";
import { MouseEvent } from "react";
import { multiUpload } from "../../themes/uploadTheme";

const FileUpload = ({
  setSelectedFile,
  disabled,
  listType = "picture-card",
  imageUrl,
}: any) => {
  const customRequest = ({ file }: { file: File | null }) => {
    setSelectedFile(file);
  };
  const props: any = {
    name: "file",
    disabled: disabled,
    listType: listType,
    imageUrl: imageUrl,
    multiple: false,
    showUploadList: false,
    customRequest: customRequest,
  };
  const handleButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      onClick={(e) => handleButton(e)}
    >
      <PlusOutlined className="text-primary" />
      <div style={{ marginTop: 8 }} className="text-primary">
        Upload
      </div>
    </button>
  );

  return (
    <ConfigProvider theme={multiUpload}>
      <Upload {...props}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              border: "none",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </ConfigProvider>
  );
};

export default FileUpload;
