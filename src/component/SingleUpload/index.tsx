/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, Upload } from "antd";
import { multiUpload } from "../../themes/uploadTheme";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { UploadListType } from "antd/es/upload/interface";
interface TuploadProps {
  name?: string;
  listType?: UploadListType;
  className?: string;
  showUploadList?: boolean;
  onchange: (info: UploadChangeParam<UploadFile<any>>) => void;
  imageUrl?: string;
  defaultFile?: string;
}
const SingleUpload = ({
  imageUrl,
  onchange,
  defaultFile,
  name = "avatar",
  listType = "picture-card",
  className = "avatar-uploader",
}: TuploadProps) => {
  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      className="w-full"
    >
      <PlusOutlined className="text-primary" />
      <div style={{ marginTop: 8 }} className="text-primary">
        Upload
      </div>
    </button>
  );

  return (
    <ConfigProvider theme={multiUpload}>
      <Upload
        name={name}
        listType={listType}
        className={className}
        showUploadList={false}
        onChange={onchange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : defaultFile ? (
          <img src={defaultFile} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </ConfigProvider>
  );
};

export default SingleUpload;
